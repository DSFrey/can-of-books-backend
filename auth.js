const jwt = require('jsonwebtoken');
const JwksRsa = require('jwks-rsa');

const client = JwksRsa({ jwksUri: process.env.JWKS_URI });

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(request, callback) {
  try {
    const token = request.headers.authorization;
    jwt.verify(token, getKey, {}, callback);
  } catch (error) {
    callback('nope.avi');
  }
}

module.exports = verifyUser;
