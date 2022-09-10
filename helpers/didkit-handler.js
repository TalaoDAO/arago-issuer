const DIDKit = require('@spruceid/didkit-wasm-node');

exports.getDid = async function (privateKey) {
    try {
        return DIDKit.keyToDID("tz", privateKey);
    } catch (error) {
        console.log(error)
    }
    return null;

};

exports.getVersion = async function () {
    try {
        return DIDKit.getVersion();
    } catch (error) {
        console.log(error)
    }
    return null;

};

exports.verifyPresentation = async function(vp) {
    try {
        return await DIDKit.verifyPresentation(vp, {});
    } catch (error) {
        console.log(error)
    }
    return null;
}

exports.getVerificationMethod = async function(privateKey) {
    try {
        const verificationMethod = await DIDKit.keyToVerificationMethod("ethr", privateKey);
        return verificationMethod;
    } catch (error) {
        console.log(error)
    }
    return null;
}

exports.sign = async function (privateKey,verificationMethod, data) {

    try {
        let proof_options={
            proofPurpose: "assertionMethod",
            verificationMethod: verificationMethod, //according to https://github.com/decentralized-identity/EcdsaSecp256k1RecoverySignature2020
        };

        const dataObj = {...data, issuer: DIDKit.keyToDID("ethr", privateKey)};
        //credential: string, proof_options: string, key: string
        const res=await DIDKit.issueCredential(JSON.stringify(dataObj), JSON.stringify(proof_options),privateKey);

        return res;
    } catch (error) {
        console.log(error)
    }

    return null;
};
