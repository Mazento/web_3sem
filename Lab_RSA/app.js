// Воробьев А.И.

const crypto = require('crypto');
const fs = require('fs');

console.log(crypto.publicDecrypt(
  fs.readFileSync('./msg/key'),
  fs.readFileSync('./msg/secret')
));
