const fetch = require('node-fetch')

function fetchDemo() {
    return fetch('http://localhost:8080/medinfo/patient_query_medicalinfo/medical2').then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}

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