const { v4: uuidv4 } = require("uuid"); // for record_id
const { v1: uuidv1 } = require("uuid"); // for case_id
const express = require("express");
// const bodyParser = require('body-parser');
const ejs = require("ejs");
const util = require("util");

const app = express();

// app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");
const ccpPath = path.resolve(
  __dirname,
  "..",
  "..",
  "connection",
  "connection-org1.json"
);
let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
const userID = "camtu123";

const asLocalhost = false;

const PORT = 8080;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});

const temp_walletpath = path.join(process.cwd(), "wallet");

async function getWallet() {
  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);
  return wallet;
}

async function getNetwork(gateway, wallet) {
  // Check to see if we've already enrolled the user.
  const identity = await wallet.get(userID);
  if (!identity) {
    console.log(
      `An identity for the user ${userID} does not exist in the wallet`
    );
    console.log("Run the registerUser.js application before retrying");
    return;
  }

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");
  return network;
}

async function getGateway(wallet) {
  // Create a new gateway for connecting to our peer node.
  const gateway = new Gateway();
  await gateway.connect(ccp, {
    wallet,
    identity: userID,
    discovery: { enabled: true, asLocalhost: asLocalhost },
  });

  return gateway;
}

app.get("/patient/queryall", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract("fabcar", "PatientContract");
    const result = await patientContract.evaluateTransaction("GetAll");
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

app.get("/patient/query/:username", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract("fabcar", "PatientContract");
    const result = await patientContract.evaluateTransaction(
      "patientQuery",
      req.params.username
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    res.send(result);
    // Disconnect from the gateway.

    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract("fabcar", "PatientContract");

    // res.contentType('application/json');

    let patient_username = req.body.patient;
    let doctor_username = req.body.doctor;
    let record_id = req.body.record;
    let date = Date();

    const result = await patientContract.evaluateTransaction(
      "doctorQuery",
      patient_username,
      doctor_username,
      record_id,
      date
    );
    // if(result === 'undefined'){
    //     result = 'UNDEFINED'
    // }

    // const rest = {
    //     'patient': patient_username,
    //     'doctor': doctor_username,
    //     'record': record_id,
    //     'time': date
    // }

    // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    // res.status(200).json({response: result.toString()});
    // res.render('form', {
    //     result: result
    // });
    res.send(result);
    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

// operator query
app.get("/operator/query/:username", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const operatorContract = network.getContract("fabcar", "OperatorContract");

    const result = await operatorContract.evaluateTransaction(
      "QueryOperator",
      req.params.username
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});
// operator init ledger
app.get("/operator/init", async (req, res) => {
  try {
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const operatorContract = network.getContract("fabcar", "OperatorContract");

    await operatorContract.submitTransaction("InitLedger");
    //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({ response: "success" });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});
// create operator
app.get("/operator/create/:username/:role", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const operatorContract = network.getContract("fabcar", "OperatorContract");

    await operatorContract.submitTransaction(
      "CreateOperator",
      req.params.username,
      req.params.role
    );
    //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({ response: "Create operator successfully!" });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});
// usage record endpoint
app.get("/record/getall", async (req, res) => {
  try {
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const usageRecordContract = network.getContract(
      "fabcar",
      "UsageRecordContract"
    );

    const result = await usageRecordContract.submitTransaction("GetAll");
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});
// query records
app.get("/record/query/:medinfo_id", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const usageRecordContract = network.getContract(
      "fabcar",
      "UsageRecordContract"
    );

    const result = await usageRecordContract.submitTransaction(
      "QueryRecords",
      req.params.medinfo_id
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});
/////////////////////////////////////////////////
///////
// Medical info contract
/////////////////////////////////////////////////
// create medical ino
app.get("/medinfo/create/:medicalinfo_id", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const medInfoContract = network.getContract(
      "fabcar",
      "MedicalInfoContract"
    );

    const result = await medInfoContract.submitTransaction(
      "CreateMedicalInfo",
      req.params.medicalinfo_id
    );
    // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({
      response: `Successfully create medical info id ${req.params.medicalinfo_id}`,
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});
app.get("/medinfo/create", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const medInfoContract = network.getContract(
      "fabcar",
      "MedicalInfoContract"
    );

    let medicalinfo_id = uuidv1();
    const result = await medInfoContract.submitTransaction(
      "CreateMedicalInfo",
      medicalinfo_id
    );
    // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({
      response: `Successfully create medical info id ${medicalinfo_id}`,
    });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

// operator query medical information
app.get(
  "/medinfo/operator_query_medicalinfo/:medicalinfo_id/:operator_username",
  async (req, res) => {
    try {
      const wallet = await getWallet();
      const gateway = await getGateway(wallet);

      const network = await getNetwork(gateway, wallet);

      // Get the contract from the network.
      const medInfoContract = network.getContract(
        "fabcar",
        "MedicalInfoContract"
      );

      const result = await medInfoContract.submitTransaction(
        "operatorQueryMedicalInfo",
        req.params.medicalinfo_id,
        req.params.operator_username,
        uuidv4(),
        new Date().toLocaleString()
      );
      console.log(
        `Transaction has been evaluated, result is: ${result.toString()}`
      );
      res.status(200).json({ response: result.toString() });

      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({ error: error });
      process.exit(1);
    }
  }
);
// patientQueryMedicalInfo
app.get(
  "/medinfo/patient_query_medicalinfo/:medicalinfo_id",
  async (req, res) => {
    try {
      const wallet = await getWallet();
      const gateway = await getGateway(wallet);
      const network = await getNetwork(gateway, wallet);

      // Get the contract from the network.
      const medInfoContract = network.getContract(
        "fabcar",
        "MedicalInfoContract"
      );

      const result = await medInfoContract.submitTransaction(
        "patientQueryMedicalInfo",
        req.params.medicalinfo_id
      );
      console.log(
        `Transaction has been evaluated, result is: ${result.toString()}`
      );
      res.status(200).json({ response: result.toString() });

      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({ error: error });
      process.exit(1);
    }
  }
);
// medical info query by keyword
app.get("/medinfo/query_by_keyword/:keyword", async (req, res) => {
  try {
    const wallet = await getWallet();
    const gateway = await getGateway(wallet);

    const network = await getNetwork(gateway, wallet);

    // Get the contract from the network.
    const medInfoContract = network.getContract(
      "fabcar",
      "MedicalInfoContract"
    );

    const result = await medInfoContract.submitTransaction(
      "QueryByKeyWord",
      req.params.keyword
    );
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
    process.exit(1);
  }
});

// Medical Info AddCase
app.get(
  "/medinfo/addcase/:info_id/:test_result/:diagnosis/:treatment/:operator_username/:patient_username",
  async (req, res) => {
    try {
      const wallet = await getWallet();
      const gateway = await getGateway(wallet);

      const network = await getNetwork(gateway, wallet);

      // Get the contract from the network.
      const medInfoContract = network.getContract(
        "fabcar",
        "MedicalInfoContract"
      );
      const case_id = uuidv1();

      await medInfoContract.submitTransaction(
        "AddCase",
        case_id,
        req.params.info_id,
        req.params.test_result,
        req.params.diagnosis,
        req.params.treatment,
        req.params.operator_username,
        req.params.patient_username,
        uuidv4(),
        new Date().toLocaleString()
      );
      console.log(`Transaction has been submitted`);
      res.status(200).json({ response: `Successfully addcase: ${case_id} ` });

      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({ error: error });
      process.exit(1);
    }
  }
);
// Medical info AppendCase
app.get(
  "/medinfo/appendcase/:case_id/:info_id/:test_result/:diagnosis/:treatment/:operator_username/:patient_username",
  async (req, res) => {
    try {
      const wallet = await getWallet();
      const gateway = await getGateway(wallet);

      const network = await getNetwork(gateway, wallet);

      // Get the contract from the network.
      const medInfoContract = network.getContract(
        "fabcar",
        "MedicalInfoContract"
      );
      //const case_id = uuidv1();

      await medInfoContract.submitTransaction(
        "AppendCase",
        req.params.info_id,
        req.params.case_id,
        req.params.test_result,
        req.params.diagnosis,
        req.params.treatment,
        req.params.operator_username,
        req.params.patient_username,
        uuidv4(),
        new Date().toLocaleString()
      );
      console.log(`Transaction has been submitted`);
      res
        .status(200)
        .json({ response: `Successfully append case: ${req.params.case_id} ` });

      // Disconnect from the gateway.
      await gateway.disconnect();
    } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({ error: error });
      process.exit(1);
    }
  }
);
