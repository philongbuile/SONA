/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import {v4 as uuid} from 'uuid';

const userid = 'camtu123'

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..','connection','connection-org1.json')
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(),'..', 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userid);
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.ts application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userid, discovery: { enabled: true, asLocalhost: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        

        // Get the contract from the network.
        const caseContract = network.getContract('sona','CaseContract');
        const patientContract = network.getContract('sona','PatientContract')
        const medicalOperatorContract = network.getContract('sona','OperatorContract');
        const usageRecordContract = network.getContract('sona','UsageRecordContract');
        const medicalContract = network.getContract('sona','MedicalInfoContract');

    
        await medicalContract.submitTransaction('InitLedger');
        await usageRecordContract.submitTransaction('InitLedger');
        await patientContract.submitTransaction('InitLedger');


        // await patientContract.submitTransaction('RevokeOperator', 'philong123', 'Doctor1', )
        // console.log(`Transaction: InitLedger has been submitted`);
        // await medicalContract.submitTransaction('AddCase', 'case1' , 'medical2', 'new test', 'new diag', 'new treatment', 'Doctor2', 'philong123', 'record1', '11/4/2022');

         

        // await medicalOperatorContract.submitTransaction('InitOperator');
        // console.log(`Transaction: InitOperator has been submitted`);
        // await medicalOperatorContract.submitTransaction('CreateCase','philong123','Doctor1','Success','Flu','Use medicine');
        // console.log(`Transaction: OperatorCreateCase has been submitted`);
        // await usageRecordContract.submitTransaction('ReadRecord','philong123');



      

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
    function uuidv4(): string {
        throw new Error('Function not implemented.');
    }

