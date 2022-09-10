const moment = require('moment');
const uuid = require('uuid');
const axios = require('axios');
const config = require("config");

const updateCredential = async (id, voucher, subjectId, correlation, issuer, birthDate, addressCountry) => {
  const now = moment();

  const duration = voucher.credentialSubject.offers ? voucher.credentialSubject.offers.duration : voucher.credentialSubject.duration

  const data = {
    blockchainTezos: correlation,
    expirationDate: now.add(duration, 'days').toDate(),
    issuanceDate: moment().toDate(),
    voucherId: `urn:uuid:${uuid.v4()}`,
    subjectId: subjectId,
    issuer,
    birthDate,
    addressCountry
  };

  const res = await axios.put(
      `${config.get('VOUCHER_API_URL')}/api/vouchers/${id}`,
      data,
      {
        headers: {
          'accept': 'application/json',
          'key': 'SECRET_KEY'
        }
      }
  );

  if(res && res.data.success) {
    return await getVoucherById(id);
  }

  return null;
};

const updateIssuanceDate = async (id, issuanceDate) => {
    const data = {
        issuanceDate: issuanceDate,
    };

    const res = await axios.put(
        `${config.get('VOUCHER_API_URL')}/api/vouchers/${id}`,
        data,
        {
            headers: {
                'accept': 'application/json',
                'key': 'SECRET_KEY'
            }
        }
    );

    return res;
};

const getVoucherById = async (id) => {
  const res = await axios.get(
      `${config.get('VOUCHER_API_URL')}/api/vouchers/${id}`,
      {
        headers: {
          'accept': 'application/json',
          'key': 'SECRET_KEY'
        }
      }
  );

  if(res && res.data.voucher) {
    return res.data.voucher.voucher;
  }

  return null
}

const storeSignedVoucher = async (voucher) => {
  await saveSignedVoucher(voucher);
}

const saveSignedVoucher = async (signed_voucher) => {
  return axios.post(
      `${config.get('VOUCHER_API_URL')}/api/vouchers/credentials`,
      { signed_voucher },
      {
        headers: {
          'accept': 'application/json',
          'key': 'SECRET_KEY'
        }
      }
  );
}


module.exports = {
  updateCredential,
  getVoucherById,
  storeSignedVoucher,
  updateIssuanceDate
}
