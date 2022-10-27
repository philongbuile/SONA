
const utils = require("../utils/utils.ts");
const queryOperatorRoute = "/operator/query/:username";
const createOperatorRoute = "/operator/create/:username/:role";

const chaincodename ='sona';
const { Wallets, Gateway } = require("fabric-network");
const fs = require("fs");
const path = require("path");
const { time } = require("console");

const {registerUser} = require('../utils/registerUser');

// const userID = "camtu123";
const asLocalhost = false;

export async function queryOperator(req, res): Promise<void> {
    try {
        const wallet = await utils.getWallet();
        const gateway = await utils.getGateway(wallet, asLocalhost);
    
        const network = await utils.getNetwork(gateway, wallet);
    
        // Get the contract from the network.
        const operatorContract = await network.getContract(chaincodename, "OperatorContract");
    
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

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ error: error });
  }
}
// export async function createOperator(req, res) {
//   try {
//     const wallet = await utils.getWallet();
//         const gateway = await utils.getGateway(wallet, asLocalhost);
  
//         const network = await utils.getNetwork(gateway, wallet);
//     // Get the contract from the network.
//     const operatorContract = network.getContract(chaincodename, "OperatorContract");

//     console.log(req.params.username);
//     await operatorContract.submitTransaction(
//       "CreateOperator",
//       req.params.username,
//       req.params.role
//     );

//     // register an identity for new user
//     await registerUser(req.params.username);


//     //console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
//     res.status(200).json(`Create operator ${req.params.username} successfully!`);

//     // Disconnect from the gateway.
//     await gateway.disconnect();
//   } catch (error) {
//     console.error(`Failed to evaluate transaction: ${error}`);
//     res.status(500).json({ error: error });
//   }
// }