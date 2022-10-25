const express = require('express');
// const bodyParser = require('body-parser');
const ejs = require('ejs');
const util = require('util')

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json({ type: 'application/json' }))
// app.use(bodyParser.raw());

app.use(express.json({type: 'application/json'})); // Used to parse JSON bodies
app.use(express.urlencoded()); // Parse URL-encoded bodies using query-string library
// or
app.use(express.urlencoded({ extended: false}));

app.set("view engine", "ejs");

const PORT = 8080
app.listen(PORT, () => {
    console.log("App listening on port " + PORT)
})


app.get('/patient/doctor-query', (req, res, next) => {
    let result = 'List of Doctor'
    res.render('form', {
        result: result
    })
})

app.post('/patient/doctor-query', (req, res, next) => {
    try {

        let patient_username = req.body.patient;
        let doctor_username = req.body.doctor;
        let record_id = req.body.record;
        let date = Date();
        
        const result = {
            'req': req.body, 
            'time': date
        }

        res.render('form', {
            result: util.inspect(result,false,null)
        });
        console.log(req.body)
        // await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
    }
})