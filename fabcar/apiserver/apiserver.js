const { v4: uuidv4 } = require("uuid"); // for record_id
const { v1: uuidv1 } = require("uuid"); // for case_id
const express = require("express");
// const expressSession = require('express-session')
const bodyParser = require('body-parser');

const ejs = require("ejs");
const util = require("util");
const cors = require("cors");
const mongoose = require('mongoose')
const app = express();
const bcrypt = require('bcrypt')
const User = require('./model/User')

app.use(bodyParser.json());

// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());


mongoose.connect('mongodb://localhost:27017/blockchain').then(
  () => {console.log('Successfully connect to MONGODB')},
  err => console.log(err)
)

const PORT = 8080;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

const operator = require("./endpoints/operator_endpoints.ts");
const patient = require("./endpoints/patient_endpoints.ts");
const record = require("./endpoints/usage_record_endpoints.ts");
const medical = require("./endpoints/medicalinfo_endpoints.ts");
const utils = require("./utils/utils.ts");
const wallet = require("./utils/registerUser.ts");
// const wallet = require("./utils/registerUser.ts")

/**
 * FOR USER LOGIN
 */

app.post('/login', (req, res, next) => {
  let result = req
  const {username, password} = req.body
  // let result = JSON.parse(req.body)
  // const username = result.userName 
  // const password = result.password
  console.log(req.body)
  User.findOne({username: username, password: password}, (error, user) => {
    if(!user){
      return res.json({ error: "User Not found" })
    }
    if(res.status(201)){
      return res.json({status: "OK", data: bcrypt.hash(username+password+ Date(), 10)})
    }
  })
})


////////////////////////////////////////////////////////////
////////// register the user to the network
////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////
////////// Patient endpoints
////////////////////////////////////////////////////////////
// create patient

app.post("/patient/create/", async (req, res) => {
  await patient.createPatient(req, res);
});
// app.get("/patient/create/:fullname", async (req, res) => {
//      await patient.createPatient(req, res);
// });

app.get("/patient/queryall", async (req, res) => {
  await patient.queryAll(req, res);
});

app.get("/patient/query/:username", async (req, res) => {
  await patient.patientQuery(req, res);
});

//doctorQuery
app.get(
  "/patient/doctorQuery/:patient_username/:doctor_username",
  async (req, res, next) => {
    await patient.doctorQuery(req, res);
  }
);
// patient authorize doctor
app.get(
  "/patient/authorize_doctor/:patient_username/:operator_username",
  async (req, res) => {
    patient.authorizeDoctor(req, res);
  }
);
// patient revoke doctor
app.get(
  "/patient/revoke_doctor/:patient_username/:operator_username",
  async (req, res) => {
    patient.revokeOperator(req, res);
  }
);

///////////////////////////////////////////////////
//////////// Operator endpoints
///////////////////////////////////////////////////

// operator query

app.get("/operator/query/:username", async (req, res) => {
  await operator.queryOperator(req, res);
});

// create operator
// app.get("/operator/create/:username/:role", async (req, res) => {
//   await operator.createOperator(req, res);
// });

app.post("/operator/create/", async (req, res) => {
  await operator.createOperator(req, res);
});

// usage record endpoint
app.get("/record/getall", async (req, res) => {
  await record.queryAll(req, res);
});
// query records
app.get("/record/query/:medinfo_id", async (req, res) => {
  await record.queryMedIdUsage(req, res);
});

// operator query medical information
app.get(
  "/medinfo/operator_query_medicalinfo/:medicalinfo_id/:operator_username",
  async (req, res) => {
    await medical.queryMedicalInfo(req, res);
  }
);
// patientQueryMedicalInfo
app.get(
  "/medinfo/patient_query_medicalinfo/:medicalinfo_id",
  async (req, res) => {
    await medical.patientQuery(req, res);
  }
);
// medical info query by keyword
app.get("/medinfo/query_by_keyword/:keywords", async (req, res) => {
  await medical.queryByKeywords(req, res);
});

//:info_id/:test_result/:diagnosis/:treatment/:operator_username/:patient_username
app.post("/medinfo/addcase/", async (req, res) => {
  await medical.addCase(req, res);
});
// Medical info AppendCase

// :case_id/:info_id/:test_result/:diagnosis/:treatment/:operator_username/:patient_username
app.post("/medinfo/appendcase/", async (req, res) => {
  await medical.appendCase(req, res);
});
