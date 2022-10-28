
const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";

<<<<<<< HEAD

=======
const chaincodename ='sona';
>>>>>>> main
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

<<<<<<< HEAD
=======
const {registerUser} = require('../utils/registerUser');

>>>>>>> main
// const userID = "camtu123";
const asLocalhost = false;

export async function queryOperator(req, res): Promise<void> {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
    
        const network = await utils.getNetwork(gateway, wallet);
    
        // Get the contract from the network.
<<<<<<< HEAD
        const operatorContract = await network.getContract("sona", "OperatorContract");
=======
        const operatorContract = await network.getContract(chaincodename, "OperatorContract");
>>>>>>> main
    
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
<<<<<<< HEAD
    const operatorContract = network.getContract("sona", "OperatorContract");

    await operatorContract.submitTransaction(
      "CreateOperator",
      req.params.username,
      req.params.role
    );
    //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json({ response: "Create operator successfully!" });
=======
    const operatorContract = network.getContract(chaincodename, "OperatorContract");

    console.log(req.body.username);
    await operatorContract.submitTransaction(
      "CreateOperator",
      req.body.username,
      req.body.role
    );

    // register an identity for new user
    await registerUser(req.body.username);


    //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
    res.status(200).json(`Create operator ${req.body.username} successfully!`);
>>>>>>> main

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
  }
}