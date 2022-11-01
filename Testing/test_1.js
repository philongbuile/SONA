const fetch = require('node-fetch')

function fetchDemo() {
<<<<<<< HEAD
    return fetch('http://localhost:8080/record/getall').then(function(response) {
=======
    return fetch('http://localhost:8080/medinfo/patient_query_medicalinfo/medical2').then(function(response) {
>>>>>>> origin
        return response.json();
    }).then(function(json) {
        return json;
    });
}

<<<<<<< HEAD
fetchDemo().then(function(result) {
    console.log(result);
});
=======
// let patient = []; 
fetchDemo().then(function(result) {
    // console.log(result.response.FullName);
    // result.Cases.map(case => {
    //     console.log(case)
    // })
    console.log(result.Cases.CaseID)
});

// const patient = fetchDemo()
// console.log('Outside: ' + patient)
>>>>>>> origin
