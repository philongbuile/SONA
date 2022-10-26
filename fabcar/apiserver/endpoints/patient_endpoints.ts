
const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";


const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

// const userID = "camtu123";
const asLocalhost = false;

export async function patientQuery(req, res) {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
    
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
}


export async function queryAll(req, res) {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);

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
}


export async function doctorQuery(req, res) {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);

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
}









