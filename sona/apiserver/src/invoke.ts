/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gateway, Wallets } from 'fabric-network';
import * as path from 'path';
import * as fs from 'fs';
import {v4 as uuid} from 'uuid';
import { registerUserOrg1, registerUserOrg2 } from "../utils/utils";
import { buildCCPOrg1, buildCCPOrg2 } from "../utils/AppUtil";



const userid = 'camtu123'

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..','fabric','test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(),'..', 'wallets', userid);
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
        await gateway.connect(ccp, { wallet, identity: userid, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');
        

        // Get the contract from the network.
        const caseContract = network.getContract('sona','CaseContract');
        const patientContract = network.getContract('sona','PatientContract')
        const medicalOperatorContract = network.getContract('sona','OperatorContract');
        const usageRecordContract = network.getContract('sona','UsageRecordContract');
        const medicalContract = network.getContract('sona','MedicalInfoContract');

    
        await medicalContract.submitTransaction('InitLedger');
        await medicalOperatorContract.submitTransaction('InitLedger');

        patientContract.addDiscoveryInterest({name: 'sona', collectionNames: ['PateintIdentifiableData']});

        await patientContract.submitTransaction('InitLedger');
        console.log('init ledger sucessfully');

        registerUserOrg1('camtu123');
        registerUserOrg1('philong123');
        registerUserOrg1('minhleduc0210');        
        registerUserOrg1('Doctor1');
        registerUserOrg1('Doctor2');
        registerUserOrg2('Researcher1');

        console.log('regiser users sucessfully')



        



        



      

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

