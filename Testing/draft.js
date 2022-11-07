const crypto = require('crypto')
const CryptoJS = require('crypto-js')


// let salt = crypto.randomBytes(32)
// let enc = CryptoJS.AES.encrypt('Hello World', salt).toString()
// console.log(JSON.parse(salt))
// console.log(enc)

// ============================================================================

let personA = {
    'name': 'A',
    'age': 38
}

let personB = {
    'name': 'B',
    'age': 38
}

var personList = [personA, personB]


var encPersonA = CryptoJS.AES.encrypt(JSON.stringify(personA), '123').toString()
console.log(encPersonA)

var bytes = CryptoJS.AES.decrypt(encPersonA, '123')
var og = bytes.toString(CryptoJS.enc.Utf8)
var decPersonA = JSON.parse(og)

console.log(typeof(decPersonA))