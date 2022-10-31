const fetch = require('node-fetch')

function fetchDemo() {
    return fetch('http://localhost:8080/record/getall').then(function(response) {
        return response.json();
    }).then(function(json) {
        return json;
    });
}

fetchDemo().then(function(result) {
    console.log(result);
});