const uuid = require('uuid');
const moment = require('moment');
const { validationResult } = require('express-validator');
const config = require('config');
const crypto = require('crypto');
const didkit = require('../helpers/didkit-handler');
const client = require('../helpers/redis-client');
const { checkExpiration, findUser, generateAccessToken } = require('../service/auth.service');
const {updateCredential, getVoucherById, storeSignedVoucher, updateIssuanceDate} = require("../service/voucher.service");
const {ARAGO_KEY, ARAGO_OBJ, CREDENTIAL_MANIFEST} = require("../utils");

exports.getQRCode = async (req, res) => {
  try {
    const randomId = uuid.v4()
    const sessionId = generateAccessToken({id: randomId})
    const dateTime = moment();
    const did = await didkit.getDid(config.get('DEFAULT_JWK'));
    const voucher = await getVoucherById(ARAGO_KEY);

    const userData = {
      id: randomId,
      session_id: sessionId,
      date_time: dateTime,
      issuer: did,
    }

    await client.rPush(config.get('REDIS_KEY'), JSON.stringify(userData))

    const url = `${config.get('API_URL')}/api/arago/${randomId}?issuer=${did}`

    const data = {
      url,
      id: randomId,
      session_id: sessionId,
      date_time: dateTime,
      issuer: did,
      voucher
    };

    res.status(200).json({
      message: "QR Code URL",
      success: true,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
}

exports.getChallenge = async (req, res) => {
  try {
    const voucher = await getVoucherById(ARAGO_KEY);

    if (!voucher) {
      return res.status(400).json({message: 'Not found voucher', success: false});
    }

    const userObj = await findUser(req.params.id);
    if (!userObj) {
      return res.status(400).json({message: "Invalid session!", success: false});
    }

    const user = userObj.user;
    const expired = checkExpiration(user);
    if (expired) {
      return res.status(400).json({message: 'Session expired!', success: false});
    }

    const challenge = crypto.randomBytes(8).toString('base64')
    user.challenge = challenge;
    const now = moment();
    user.date_time = now;

    await client.lSet(config.get('REDIS_KEY'), userObj.queueUserIndex, JSON.stringify(user))

    const data = {
      "type": "CredentialOffer",
      "credentialPreview": voucher,
      "expires": now.add(5, 'minutes').toDate(),
      "challenge": challenge,
      "domain": "talao.co",
      "credential_manifest": CREDENTIAL_MANIFEST.arago
    };

    await updateIssuanceDate(ARAGO_KEY, moment().toDate())

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
}

exports.verify = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg, success: false });
  }

  const { subject_id, presentation } = req.body;

  try {
    const userObj = await findUser(req.params.id);

    if (!userObj) {
      return res.status(400).json({ message: 'Invalid session!', success: false });
    }

    const user = userObj.user;
    const userIndex = userObj.queueUserIndex;
    const expired = checkExpiration(user);
    if (expired) {
      return res.status(408).json({ message: 'Session expired!', success: false });
    }

    if (!presentation) {
      return res.status(400).json({ message: 'Arago Pass verification failed', success: false });
    }

    const voucherId = ARAGO_KEY;

    let voucher = await getVoucherById(voucherId);
    if (!voucher) {
      return res.status(400).json({message: 'Not found voucher', success: false});
    }

    const vp = JSON.parse(presentation)

    // validate request
    if (
      vp.proof.challenge !== user.challenge || vp.holder !== subject_id) {
      return res.status(400).json({ message: 'Arago Pass verification failed', success: false });
    }

    await updateCredential(
        voucherId,
        voucher,
        subject_id,
        vp.verifiableCredential?.credentialSubject.associatedAddress,
        vp.verifiableCredential?.issuer,
    );

    const verificationMethod = await didkit.getVerificationMethod(config.get('DEFAULT_JWK'));
    const signedVoucher = await didkit.sign(config.get('DEFAULT_JWK'), verificationMethod, voucher);
    if (signedVoucher) {
      await storeSignedVoucher(signedVoucher)
    }

    user.logged_in = true;
    await client.lSet(config.get('REDIS_KEY'), userIndex, JSON.stringify(user))

    res.status(200).json(signedVoucher);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
};
