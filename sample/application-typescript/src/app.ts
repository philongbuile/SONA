/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Gateway, GatewayOptions } from 'fabric-network';
import * as path from 'path';
import { buildCCPOrg1, buildWallet, prettyJSONString } from './utils//AppUtil';
import { buildCAClient, enrollAdmin, registerAndEnrollUser } from './utils/CAUtil';

const channelName = 'mychannel';
const chaincodeName = 'fabcar';
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser';

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
//         ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-typescript/ -ccl javascript
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
// Delete the /fabric-samples/asset-transfer-basic/application-typescript/wallet directory
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
        const ccp = buildCCPOrg1();

        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        const caClient = buildCAClient(ccp, 'ca.org1.example.com');

        // setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(walletPath);

        // in a real application this would be done on an administrative flow, and only once
        await enrollAdmin(caClient, wallet, mspOrg1);

        // in a real application this would be done only when a new user was required to be added
        // and would be part of an administrative flow
        await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

        // Create a new gateway instance for interacting with the fabric network.
        // In a real application this would be done as the backend server session is setup for
        // a user that has been verified.
        const gateway = new Gateway();

        const gatewayOpts: GatewayOptions = {
            wallet,
            identity: org1UserId,
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

            // Initialize a set of asset data on the channel using the cshaincode 'InitLedger' function.
            // This type of transaction would only be run once by an application the first time it was started after it
            // deployed the first time. Any updates to the chaincode deployed later would likely not need to run
            // an "init" type function.
            console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
            await operator.submitTransaction('InitLedger');
            await medical.submitTransaction('InitLedger');
            await usage.submitTransaction('InitLedger');

            console.log('*** Result: committed');

            const k1 = JSON.stringify(['diabete', 'cancer']);
            const k2 = JSON.stringify(['diabete']);
            const doctors = JSON.stringify(['Doctor1']);

            let result;


            // console.log('\n--> Evaluate Transaction: Create patient 32562 ');
            // result = await patient.submitTransaction('CreatePatient', 'tu cam', 'tucam525', 'medid362', '2463','cat street', '44/3', 'female', 'Doctor1');
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            

    

            

            console.log('\n--> Evaluate Transaction: Authorized Doctor2 for username tucam525');
            result = await patient.submitTransaction('AuthorizeOperator', 'tucam525', 'Doctor1');
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            console.log('\n--> Evaluate Transaction: Authorized Doctor2 for username tucam525');
            result = await patient.evaluateTransaction('patientQuery', 'tucam525');
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);


            console.log('\n--> Evaluate Transaction: Revoke Authorized Doctor2 for username tucam525');
            result = await patient.submitTransaction('RevokeOperator', 'tucam525', 'Doctor1');
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);

            console.log('\n--> Evaluate Transaction: Authorized Doctor2 for username tucam525');
            result = await patient.evaluateTransaction('patientQuery', 'tucam525');
            console.log(`*** Result: ${prettyJSONString(result.toString())}`);




            

           

            // console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
            // result = await medical.evaluateTransaction('GetAll');
            // console.log(`*** Result: ${prettyJSONString(result.toString())}`);

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
