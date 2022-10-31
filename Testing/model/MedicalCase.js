const CryptoJS = require('crypto-js');

const Operator = require('./Operator')
const Patient = require('./Patient')
const Case = require('./Case')

class MedicalCase{
    constructor(id, person){
        this.id = id, 
        this.person = person,
        this.case = []
    }

    addCase(case_){
        this.case.push(case_)
    }

    displayTo(entity){
        let valid = this.person.authorized.includes(entity);
        if(valid == true){
            this.person.information = this.person.decryptInfo(this.person.information)
            console.log(this)
            this.person.information = this.person.encryptInfo(this.person.information)
        }else{
            console.log(this)
        }
    }
}

module.exports=MedicalCase
