
const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";


const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

// const userID = "camtu123";
const asLocalhost = false;

export async function queryOperator(req, res): Promise<void> {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
    
        const network = await utils.getNetwork(gateway, wallet);
    
        // Get the contract from the network.
        const operatorContract = await network.getContract("fabcar", "OperatorContract");
    
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
      }

}

export async function createOperator(req, res) {
  try {
    const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
  
        const network = await utils.getNetwork(gateway, wallet);
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
  }
}