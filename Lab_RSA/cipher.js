const crypto = require('crypto');
const fs = require('fs');
const constants = require('constants');

const pubkey = fs.readFileSync('./msg/key', "utf8");
const buff = new Buffer(fs.readFileSync('app.js'));
console.log(buff);
// const msg = crypto.publicDecrypt( pubkey, buff );
const msg = crypto.publicEncrypt({
  key: pubkey,
  padding: constants.RSA_PKCS1_OAEP_PADDING
}, buff );
fs.writeFile('./msg/result', msg, (err) => console.log(err));
console.log(msg.toString("utf8"));
