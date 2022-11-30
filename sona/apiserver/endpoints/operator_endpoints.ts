import { buildCCPOrg1, buildCCPOrg2 } from "../utils/AppUtil";
import { registerUserOrg1 } from "../utils/utils";

const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";

const chaincodename ='sona';
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

const userID = "camtu123";
const asLocalhost = true;
const ccp1 = buildCCPOrg1();


export async function queryOperator(req, res): Promise<void> {
    try {
        const wallet = await utils.getWallet(userID);
        const gateway = await utils.getGateway(wallet,userID, ccp1);
        const network = await utils.getNetwork(gateway, wallet, userID);
    
        // Get the contract from the network.
        const operatorContract = await network.getContract(chaincodename, "OperatorContract");
    
        const result = await operatorContract.evaluateTransaction(
          "QueryOperator",
          req.params.username
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

export async function createOperator(req, res) {

 
  try {
        const wallet = await utils.getWallet(userID);
        const gateway = await utils.getGateway(wallet,userID, ccp1);
        const network = await utils.getNetwork(gateway, wallet, userID);
    // Get the contract from the network.
    const operatorContract = network.getContract(chaincodename, "OperatorContract");

    console.log(req.body.username);
    await operatorContract.submitTransaction(
      "CreateOperator",
      req.body.username,
      req.body.role
    );

    const new_userID = req.body.username;
    registerUserOrg1(new_userID);
    

    //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json(`Create operator ${req.body.username} successfully!`);

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
      const operatorContract = network.getContract(chaincodename, "OperatorContract");


      const result = await operatorContract.evaluateTransaction("GetAllDoctors");


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
