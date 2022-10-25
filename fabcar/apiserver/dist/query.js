"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fabric_network_1 = require("fabric-network");
const path = require("path");
const fs = require("fs");
async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await fabric_network_1.Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);
        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.ts application before retrying');
            return;
        }
        // Create a new gateway for connecting to our peer node.
        const gateway = new fabric_network_1.Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        // Get the contract from the network.
        //const contract = network.getContract('fabcar');
        // const caseContract = network.getContract('fabcar', 'CaseContract');
        const patientContract = network.getContract('fabcar', 'PatientContract');
        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        // const result = await caseContract.evaluateTransaction('ReadCase', '2');
        // console.log(`Transaction has been evaluated, cases of Patient 2 are : ${result}`);
        // const result1 = await caseContract.evaluateTransaction('ReadCase','1');
        // console.log(`Transaction has been evaluated, cases of patient 1  are: ${result1}`);
        // const result3 = await caseContract.evaluateTransaction('ReadCase','2');
        // console.log(`Transaction has been evaluated, result is: ${result3}`);
        const result2 = await patientContract.evaluateTransaction('GetAll');
        console.log(`Transaction has been evaluated, cases of Patient 2 are : ${result2}`);
        // 
    }
    catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=query.js.map