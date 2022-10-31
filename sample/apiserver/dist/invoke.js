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
        const ccpPath = path.resolve(__dirname, '..', '..', '..', 'SONA', 'sample', 'application-typescript', 'org', 'connection-org1.json');
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
        const caseContract = network.getContract('fabcar', 'CaseContract');
        const patientContract = network.getContract('fabcar', 'PatientContract');
        const medicalOperatorContract = network.getContract('fabcar', 'OperatorContract');
        const usageRecordContract = network.getContract('fabcar', 'UsageRecordContract');
        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        // await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        await patientContract.submitTransaction('InitLedger');
        console.log(`Transaction: InitLedger has been submitted`);
        await patientContract.submitTransaction('patientQuery', 'minhleduc0210');
        // await medicalOperatorContract.submitTransaction('InitOperator');
        // console.log(`Transaction: InitOperator has been submitted`);
        // await medicalOperatorContract.submitTransaction('CreateCase','philong123','Doctor1','Success','Flu','Use medicine');
        // console.log(`Transaction: OperatorCreateCase has been submitted`);
        // await usageRecordContract.submitTransaction('ReadRecord','philong123');
        // Disconnect from the gateway.
        await gateway.disconnect();
    }
    catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}
main();
//# sourceMappingURL=invoke.js.map