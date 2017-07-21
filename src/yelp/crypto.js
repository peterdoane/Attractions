const crypto = require('crypto')
let bytes = crypto.randomBytes(16)

for (var i = 0; i < bytes.byteLength; i++) {
  let binaryRepresentation = bytes[i].toString(2)
  console.log("0".repeat(8 - binaryRepresentation.length) + binaryRepresentation);
}
