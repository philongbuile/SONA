/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Gateway, GatewayOptions } from 'fabric-network';
import * as path from 'path';
import { buildCCPOrg2,buildCCPOrg1, buildWallet, prettyJSONString } from './utils//AppUtil';
import { buildCAClient, enrollAdmin, registerAndEnrollUser } from './utils/CAUtil';
import { v4 as uuidv4 } from 'uuid';

const channelName = 'mychannel';
const chaincodeName = 'fabcar';
const mspOrg2 = 'Org2MSP';
const walletPath = path.join(__dirname, 'wallet2');
const org2UserId = 'appUser2';

// pre-requisites:
// - fabric-sample two organization test-network setup with two peers, ordering service,
//   and 2 certificate authorities
//         ===> from directory /fabric-samples/test-network
//         ./network.sh up createChannel -ca
// - Use any of the asset-transfer-basic chaincodes deployed on the channel "mychannel"
//   with the chaincode name of "basic". The following deploy command will package,
//   install, approve, and commit the javascript chaincode, all the actions it takes
//   to deploy a chaincode to a channel.
//         ===> from directory /fabric-samples/test-network
//         ./network.sh deployCC -ccn basic -ccp ../sample/chaincode-typescript/ -ccl javascript
// - Be sure that node.js is installed
//         ===> from directory /fabric-samples/asset-transfer-basic/application-typescript
//         node -v
// - npm installed code dependencies
//         ===> from directory /fabric-samples/asset-transfer-basic/application-typescript
//         npm install
// - to run this test application
//         ===> from directory /fabric-samples/asset-transfer-basic/application-typescript
//         npm start

// NOTE: If you see  kind an error like these:
/*
    2020-08-07T20:23:17.590Z - error: [DiscoveryService]: send[mychannel] - Channel:mychannel received discovery error:access denied
    ******** FAILED to run the application: Error: DiscoveryService: mychannel error: access denied

   OR

   Failed to register user : Error: fabric-ca request register failed with errors [[ { code: 20, message: 'Authentication failure' } ]]
   ******** FAILED to run the application: Error: Identity not found in wallet: appUser
*/
// Delete the /fabric-samples/asset-transfer-basic/application-t\\wsl.localhost\Ubuntu\home\philong\sona\sample\application-typescript\orgypescript/wallet directory
// and retry this application.
//
// The certificate authority must have been restarted and the saved certificates for the
// admin and application user are not valid. Deleting the wallet store will force these to be reset
// with the new certificate authority.
//

/**
 *  A test application to show basic queries operations with any of the asset-transfer-basic chaincodes
 *   -- How to submit a transaction
 *   -- How to query and check the results
 *
 * To see the SDK workings, try setting the logging to show on the console before running
 *        export HFC_LOGGING='{"debug":"console"}'
 */
async function main() {
    try {
        // build an in memory object with the network configuration (also known as a connection profile)
        const ccp = buildCCPOrg2();

        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        const caClient = buildCAClient(ccp, 'ca.org2.example.com');

        // setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(walletPath);

        // in a real application this would be done on an administrative flow, and only once
        await enrollAdmin(caClient, wallet, mspOrg2);

        // in a real application this would be done only when a new user was required to be added
        // and would be part of an administrative flow
        await registerAndEnrollUser(caClient, wallet, mspOrg2, org2UserId, 'org2.department1');

        // Create a new gateway instance for interacting with the fabric network.
        // In a real application this would be done as the backend server session is setup for
        // a user that has been verified.
        const gateway = new Gateway();

        const gatewayOpts: GatewayOptions = {
            wallet,
            identity: org2UserId,
            discovery: { enabled: true, asLocalhost: true }, // using asLocalhost as this gateway is using a fabric network deployed locally
        };

        try {
            // setup the gateway instance
            // The user will now be able to create connections to the fabric network and be able to
            // submit transactions and query. All transactions submitted by this gateway will be
            // signed by this user using the credentials stored in the wallet.
            await gateway.connect(ccp, gatewayOpts);

            // Build a network instance based on the channel where the smart contract is deployed
            const network = await gateway.getNetwork(channelName);

            // Get the contract from the network.
            const operator = network.getContract(chaincodeName, 'OperatorContract');
            const medical = network.getContract(chaincodeName, 'MedicalInfoContract');
            const usage = network.getContract(chaincodeName, 'UsageRecordContract');
            const patient = network.getContract(chaincodeName, 'PatientContract');
            const patient_contract = network.getContract(chaincodeName, 'SecuredPatientContract');
            const secured_usage = network.getContract(chaincodeName, 'SecuredUsageRecordContract');


            // Initialize a set of asset data on the channel using the cshaincode 'InitLedger' function.
            // This type of transaction would only be run once by an application the first time it was started after it
            // deployed the first time. Any updates to the chaincode deployed later would likely not need to run
            // an "init" type function.
            // console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
            await operator.submitTransaction('InitLedger');
            await medical.submitTransaction('InitLedger');
            await patient_contract.submitTransaction('InitLedger');
            await patient.submitTransaction('InitLedger');
            let result;

            const new_patient = 'vero';
            const medid = uuidv4();

            // console.log(`Create patient ${new_patient}`);

            // result = await patient_contract.submitTransaction('CreatePatient', 'tu cam', new_patient, medid, '2463','cat street',   '44/3', 'female', 'Doctor1');
            
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            
            // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
            // result = await patient_contract.evaluateTransaction('GetAll');
            // console.log(`*** getall Result: ${prettyJSONString(result.toString())}`);
    

            

            // console.log('\n--> Evaluate Transaction: Authorized Doctor2');
            // result = await patient_contract.submitTransaction('AuthorizeOperator', new_patient, 'Doctor2');
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);


            // console.log('\n--> Evaluate Transaction: Revoke Authorized Doctor1');
            // result = await patient_contract.submitTransaction('RevokeOperator', new_patient, 'Doctor1');
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            // console.log('\n--> Evaluate Transaction: query patient');
            // result = await patient_contract.evaluateTransaction('patientQuery', new_patient);
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);
    

            let record_id = uuidv4();
            let time =  new Date().toLocaleString()

            console.log('\n--> Evaluate Transaction: query medicalinfo');
            result = await medical.evaluateTransaction('operatorQueryMedicalInfo', 'medical1', 'Researcher1', record_id, time);
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            

           

            // console.log('\n--> Evaluate Transaction: secured GetAllAssets, function returns all the current assets on the ledger');
            // result = await patient_contract.evaluateTransaction('GetAll');
            // console.log(`*** getall secured Result: ${prettyJSONString(result.toString())}`);

            // console.log('\n--> Evaluate Transaction: Query MedicalInfos have diabete and cancer');
            // result = await medical.evaluateTransaction('QueryByKeyWord', k1 );
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            // console.log('\n--> Evaluate Transaction: Query MedicalInfos have diabete');
            // result = await medical.evaluateTransaction('QueryByKeyWord', k2 );
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            // console.log('\n--> Evaluate Transaction: Query all usage record of medical1');
            // result = await usage.evaluateTransaction('GetAll');
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);


        } finally {
            // Disconnect from the gateway when the application is closing
            // This will close all connections to the network
            gateway.disconnect();
        }
    } catch (error) {
        console.error(`******** FAILED to run the application: ${error}`);
    }
}

main();
