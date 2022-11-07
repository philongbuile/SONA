const CryptoJS = require('crypto-js')

class Case{
    constructor(id, details, key){
        this.id = id;
        this.details = details;
    }

    // encryptDetails(details, key){
    //     return CryptoJS.AES.encrypt(details, key).toString();
    // }
}

module.exports=Case
