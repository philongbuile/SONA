import { buildCCPOrg1, buildCCPOrg2 } from "../utils/AppUtil";
import { registerUserOrg1 } from "../utils/utils";

const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";
const { v4: uuidv4 } = require("uuid"); // for record_id
const { v1: uuidv1 } = require("uuid"); // for case_id

const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

const chaincodename='sona';
const asLocalhost = true;
const ccp1 = buildCCPOrg1();
const ccp2 = buildCCPOrg2();
const userID = 'camtu123';


export async function patientQuery(req, res) {
    try {
      const wallet = await utils.getWallet(userID);
      const gateway = await utils.getGateway(wallet,userID, ccp1);
      const network = await utils.getNetwork(gateway, wallet, userID);
        // Get the contract from the network.
        const patientContract = network.getContract(chaincodename, "PatientContract");
        const result = await patientContract.evaluateTransaction(
          "patientQuery",
          req.params.username
        );
        patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});

        console.log(
          `Transaction has been evaluated, result is: ${result.toString()}`
        );
        res.status(200).json({ response: JSON.parse(result.toString("utf8")) });
    
        // res.send(result);
        // Disconnect from the gateway.
    
        await gateway.disconnect();
      } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error });
      }
}


export async function queryAll(req, res) {
    try {
      const wallet = await utils.getWallet(userID);
      const gateway = await utils.getGateway(wallet,userID, ccp1);
      const network = await utils.getNetwork(gateway, wallet, userID);

        // Get the contract from the network.
        const patientContract = network.getContract(chaincodename, "PatientContract");

        patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});

        const result = await patientContract.evaluateTransaction("GetAll");


        console.log(
          `Transaction has been evaluated, result is: ${result.toString()}`
        );
        res.status(200).json({ response: JSON.parse(result.toString("utf8")) });
    
        // Disconnect from the gateway.
        await gateway.disconnect();
      } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error });
      }
}


export async function doctorQuery(req, res) {
  try {
    const userID = req.params.doctor_username;
    console.log(`${userID} in api`);
    const wallet = await utils.getWallet(userID);
      const gateway = await utils.getGateway(wallet,userID, ccp1);
      const network = await utils.getNetwork(gateway, wallet, userID);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, "PatientContract");
    patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});

    // const medicalOperatorContract = network.getContract('fabcar', 'OperatorContract')
    // const usageRecordContract = network.getContract('fabcar', 'UsageRecordContract');

    // await patientContract.submitTransaction('InitLedger');
    // await medicalOperatorContract.submitTransaction('InitLedger');
    // await usageRecordContract.submitTransaction('InitLedger');

    let date = Date().toLocaleString();
    let record_id = uuidv4();

    const result = await patientContract.submitTransaction(
      "doctorQuery",
      req.params.patient_username,
      req.params.doctor_username,
      record_id,
      date
    );

    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: JSON.parse(result.toString("utf8")) });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });

  }
}


export async function createPatient(req ,res) {
  try {

    const wallet = await utils.getWallet(userID);
    const gateway = await utils.getGateway(wallet,userID, ccp1);
    const network = await utils.getNetwork(gateway, wallet, userID);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, 'PatientContract');

    let medicalinfo_id = uuidv1();
    // await patientContract.submitTransaction('InitLedger');
    patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});



    const result = await patientContract.submitTransaction('CreatePatient', req.body.fullname
                                                                            , req.body.username
                                                                            , medicalinfo_id
                                                                            , req.body.address
                                                                            , req.body.phone
                                                                            , req.body.dob
                                                                            , req.body.gender
                                                                            , req.body.authorize_doctor);

  // register an identity for new user
  const new_userID = req.body.username;
    registerUserOrg1(new_userID);
    
    res.status(200).json(`${req.params.fullname}`);



    // Disconnect from the gateway.
    await gateway.disconnect();

} catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({error: error});

  }
}

export async function authorizeDoctor(req , res){
  try {
    const wallet = await utils.getWallet(userID);
      const gateway = await utils.getGateway(wallet,userID, ccp1);
      const network = await utils.getNetwork(gateway, wallet, userID);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, "PatientContract");

    patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});


    const result = await patientContract.submitTransaction(
      "AuthorizeOperator",
      req.params.patient_username,
      req.params.operator_username
    );

    console.log(req.params);
    // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res
      .status(200)
      .json({
        response: `Authorize successfully operator: ${req.params.operator_username}`,
      });
    //res.send(result)

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });

  }
}


export async function revokeOperator(req, res) {
  try {
    const wallet = await utils.getWallet(userID);
      const gateway = await utils.getGateway(wallet,userID, ccp1);
      const network = await utils.getNetwork(gateway, wallet, userID);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, "PatientContract");

    patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});


    const result = await patientContract.submitTransaction(
      "RevokeOperator",
      req.params.patient_username,
      req.params.operator_username
    );

    // console.log(result)
    // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res
      .status(200)
      .json({
        response: `Revoke successfully operator: ${req.params.operator_username}`,
      });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });

  }
}




