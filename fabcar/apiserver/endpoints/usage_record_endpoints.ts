
const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";

const chaincodename='sona'
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

const userID = "camtu123";
const asLocalhost = false;


export async function queryAll(req, res) {
    try {
      const wallet = await utils.getWallet();
      const gateway = await utils.getGateway(wallet, asLocalhost,userID );
      const network = await utils.getNetwork(gateway, wallet, userID);
    
        // Get the contract from the network.
        const usageRecordContract = network.getContract(
          chaincodename,
          "UsageRecordContract"
        );
    
        const result = await usageRecordContract.submitTransaction("GetAll");
        console.log(
          `Transaction has been evaluated, result is: ${result.toString()}`
        );
        res.status(200).json({ response: JSON.parse(result.toString("utf8")) });
    
        // Disconnect from the gateway.
        await gateway.disconnect();
      } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({ error: error });
        process.exit(1);
      }
}


export async function queryMedIdUsage(req, res){
    try {
      const wallet = await utils.getWallet();
      const gateway = await utils.getGateway(wallet, asLocalhost,userID );
      const network = await utils.getNetwork(gateway, wallet, userID);
    
        // Get the contract from the network.
        const usageRecordContract = network.getContract(
          chaincodename,
          "UsageRecordContract"
        );
    
        const result = await usageRecordContract.submitTransaction(
          "QueryRecords",
          req.params.medinfo_id
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
        process.exit(1);
      }
}

