
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
// const userID = "camtu123";
const asLocalhost = false;

export async function patientQuery(req, res) {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
    
        // Get the contract from the network.
        const patientContract = network.getContract(chaincodename, "PatientContract");
        const result = await patientContract.evaluateTransaction(
          "patientQuery",
          req.params.username
        );
        console.log(
          `Transaction has been evaluated, result is: ${result.toString()}`
        );
        res.status(200).json({ response: result.toString() });
    
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
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);

        // Get the contract from the network.
        const patientContract = network.getContract(chaincodename, "PatientContract");
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
      }
}


export async function doctorQuery(req, res) {
  try {
    const wallet = await utils.getWallet();
    const gateway = await utils.getGateway(wallet, asLocalhost);
    const network = await utils.getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, "PatientContract");
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

    console.log(result);
    console.log(
      `Transaction has been evaluated, result is: ${result.toString()}`
    );
    res.status(200).json({ response: result.toString() });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });

  }
}


export async function createPatient(req ,res) {
  try {

    const wallet = await utils.getWallet();
    const gateway = await utils.getGateway(wallet, asLocalhost);
    const network = await utils.getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract('fabcar', 'PatientContract');
    let medicalinfo_id = uuidv1();
    // await patientContract.submitTransaction('InitLedger');

    const result = await patientContract.submitTransaction('CreatePatient', req.params.fullname
                                                                            , req.params.username
                                                                            , medicalinfo_id
                                                                            , req.params.address
                                                                            , req.params.phone
                                                                            , req.params.dob
                                                                            , req.params.gender
                                                                            , req.params.authorize_doctor);

    // console.log(result)
    // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
     res.status(200).json({response: `Successfully create Patient: ${req.params.fullname}`});

    // Disconnect from the gateway.
    await gateway.disconnect();

} catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({error: error});


}
}

export async function authorizeDoctor(req , res){
  try {
    const wallet = await utils.getWallet();
    const gateway = await utils.getGateway(wallet, asLocalhost);
    const network = await utils.getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, "PatientContract");

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
    const wallet = await utils.getWallet();
    const gateway = await utils.getGateway(wallet, asLocalhost);
    const network = await utils.getNetwork(gateway, wallet);

    // Get the contract from the network.
    const patientContract = network.getContract(chaincodename, "PatientContract");

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




