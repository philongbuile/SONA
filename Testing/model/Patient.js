const CryptoJS = require('crypto-js');
const hash = require('crypto-js/sha256');
const crypto = require('crypto');

class Patient{
    constructor(fullname, information){
        this.ID = crypto.randomUUID(),
        this.fullname = fullname, 
        this.key = hash(this.ID).toString(),
        this.information = this.encryptInfo(information),
        this.authorized = []
    }

    authorizeDoctor(object_){
        if(object_.role == 'Doctor'){
            this.authorized.push(object_);
        }
    }

    hasAuthorized(entity){
        if(this.authorized.includes(entity)){
            return true;
        }
    }

    encryptInfo(information){
        return CryptoJS.AES.encrypt(information, this.key).toString();
    }

    decryptInfo(information){
        var bytes = CryptoJS.AES.decrypt(information, this.key);
        var decInfo = bytes.toString(CryptoJS.enc.Utf8);
        return decInfo;
    }

}
module.exports=Patient;
