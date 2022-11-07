/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..','test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('philongLocal');
        if (!identity) {
            console.log('An identity for the user "philongLocal" does not exist in the wallet');
            console.log('Run the registerUser.ts application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'philongLocal', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        

        // Get the contract from the network.
        const patientContract = network.getContract('sona','PatientContract')
        const medicalOperatorContract = network.getContract('sona','OperatorContract');
        const usageRecordContract = network.getContract('sona','UsageRecordContract');
        const medicalInfoContract = network.getContract('sona','MedicalInfoContract');

    

         await patientContract.submitTransaction('InitLedger');
         console.log(`Transaction: InitLedger has been submitted`);
         await medicalOperatorContract.submitTransaction('InitLedger');
         console.log(`Transaction: InitOperator has been submitted`);
         let query_result = await patientContract.submitTransaction('patientQuery','philong123');
         console.log(`Transaction evaluated, result of patient query: ${query_result}`);
        query_result = await patientContract.submitTransaction('doctorQuery','philong123','Doctor1',uuidv4(),new Date().toLocaleString());
         console.log(`Transaction evaluated, result of patient query: ${query_result}`);

        
        await medicalInfoContract.submitTransaction('InitLedger');
        console.log('successfully init operators');
        const patientqueryMed_result = await medicalInfoContract.submitTransaction('patientQueryMedicalInfo','medical2');
        console.log(`Result of patientqueryMed_result: ${patientqueryMed_result}`);
        const operatorquery_result = await medicalInfoContract.submitTransaction('operatorQueryMedicalInfo','medical1','Doctor1',uuidv4(),new Date().toLocaleString());
        console.log(`Transaction evaluated, result of query medical info of med1 from operator Doctor 1: ${operatorquery_result}`);

        const result =await usageRecordContract.submitTransaction('QueryRecords','medical1');
        console.log(`Transaction evaluated, result of query record of med1: ${result}`);



      

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
