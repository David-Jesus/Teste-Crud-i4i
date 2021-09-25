
const crypto = require('crypto');
const { deprecate } = require('util');
const initVector = crypto.randomBytes(16);

const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);

const encrypt = (text) => {
    var mykey = crypto.createCipheriv(algorithm, secretKey, initVector);
    var mystr = mykey.update(text, 'utf8', 'hex');
    return mystr += mykey.final('hex');

};

const decrypt = (text) => {
    var mykey = crypto.createDecipheriv(algorithm, secretKey, initVector);
    var mystr = mykey.update(text, 'hex', 'utf8')
    return mystr += mykey.final('utf8');

};

module.exports = {
    encrypt,
    decrypt
};