
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

const initVector = crypto.randomBytes(16);
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';


const encrypt = (text) => {
    var mykey = crypto.createCipheriv(algorithm, secretKey, initVector);
    var mystr = mykey.update(text, 'utf-8', 'hex');
    return mystr += mykey.final('hex');

};

const decrypt = (text) => {
    var mykey = crypto.createDecipheriv(algorithm, secretKey);
    var mystr = mykey.update(text, 'hex', 'utf-8');
    return mystr += mykey.final('utf8');

};

module.exports = {
    encrypt,
    decrypt
};