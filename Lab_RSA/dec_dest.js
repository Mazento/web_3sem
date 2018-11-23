const crypto = require('crypto');
const fs = require('fs');
const constants = require('constants');

const DIR = './msg_test/'

const pubkey = fs.readFileSync(DIR + 'pvtkey', "utf8");
const buff = new Buffer(fs.readFileSync(DIR + 'text'));
// const msg = crypto.publicDecrypt( pubkey, buff );
const msg = crypto.privateDecrypt({
  key: pubkey,
  padding: constants.RSA_PKCS1_OAEP_PADDING
}, buff );
console.log(msg.toString("utf8"));
