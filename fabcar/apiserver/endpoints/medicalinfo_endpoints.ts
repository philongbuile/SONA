const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";


const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const chaincodename = 'sona';
const { time } = require("console");
const { v4: uuidv4 } = require("uuid"); // for record_id
const { v1: uuidv1 } = require("uuid"); // for case_id

// const userID = "camtu123";
const asLocalhost = false;


export async function queryMedicalInfo(req, res){
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
  
        // Get the contract from the network.
        const medInfoContract = network.getContract(
          chaincodename,
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
        
      }
}


export async function patientQuery(req, res) {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
        // Get the contract from the network.
        const medInfoContract = network.getContract(
          chaincodename,
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
        
      }
}


export async function queryByKeywords(req, res){
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
        // Get the contract from the network.
        const medInfoContract = network.getContract(
          chaincodename,
          "MedicalInfoContract"
        );

        
        console.log(req.body.keywords);

        const result = await medInfoContract.submitTransaction(
          "QueryByKeyWord",
          JSON.stringify(req.body.keywords)
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
        
      }
}


export async function addCase(req, res){
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
        // Get the contract from the network.
        const medInfoContract = network.getContract(
          chaincodename,
          "MedicalInfoContract"
        );
        const case_id = uuidv1();
  
        await medInfoContract.submitTransaction(
          "AddCase",
          case_id,
          req.body.info_id,
          req.body.test_result,
          req.body.diagnosis,
          req.body.treatment,
          req.body.operator_username,
          req.body.patient_username,
          uuidv4(),
          new Date().toLocaleString()
        );
        console.log(`Transaction has been submitted`);
        res.status(200).json(`Successfully addcase: ${case_id}`);
  
        // Disconnect from the gateway.
        await gateway.disconnect();
      } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error });
      }
}


export async function appendCase(req, res){
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
        const network = await utils.getNetwork(gateway, wallet);
        // Get the contract from the network.
        const medInfoContract = network.getContract(
          chaincodename,
          "MedicalInfoContract"
        );
        //const case_id = uuidv1();
  
        await medInfoContract.submitTransaction(
          "AppendCase",
          req.body.info_id,
          req.body.case_id,
          req.body.test_result,
          req.body.diagnosis,
          req.body.treatment,
          req.body.operator_username,
          req.body.patient_username,
          uuidv4(),
          new Date().toLocaleString()
        );
        console.log(`Transaction has been submitted`);
        res
          .status(200)
          .json({ response: `Successfully append case: ${req.body.case_id} ` });
  
        // Disconnect from the gateway.
        await gateway.disconnect();
      } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error });
        
      }
}
