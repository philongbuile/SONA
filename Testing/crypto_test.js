const CryptoJS = require("crypto-js");
const hash = require('crypto-js/sha256')
const crypto = require('crypto')


const Patient = require('./model/Patient')
const Case = require('./model/Case')
const MedicalCase = require('./model/MedicalCase')
const Operator = require('./model/Operator')


let doctor = new Operator('Bac si', 'Doctor');
let researcher = new Operator('Nha nghien cuu', 'Researcher');

let patient = new Patient('Le Duc Minh', 'VGU Student, brown skin, dark hair'); 

let case_1= new Case(1, 'Diobetes', patient.key);
let case_2 = new Case(2, 'Bipolar Disorder', patient.key);

let medCase = new MedicalCase(1, patient)

console.log('===============================================')
medCase.addCase(case_1)
medCase.addCase(case_2)
console.log(medCase)

patient.authorizeDoctor(doctor)
patient.authorizeDoctor(researcher)

console.log('===============================================')
console.log('Read by authorized Doctor:')
doctor.read(medCase)


console.log('===============================================')
console.log('Read by Researcher')
researcher.read(medCase)

console.log('===============================================')
console.log(medCase)

console.log('===============================================')
console.log('Read by authorized Doctor:')
doctor.read(medCase)
