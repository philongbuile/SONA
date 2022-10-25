const express = require('express');
const bodyParser = require('body-parser');

import * as utils from '../utils/utils'

const app = express();

app.use(bodyParser.json());


// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = '/home/tu/connection-org1.json';
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const PORT = 8080
app.listen(PORT, () => {
    console.log("App listening on port " + PORT)
})


app.get('/patient/queryall', async (req, res) => {
    try {

        const wallet =  await utils.createWallet()

        // Check to see if we've already enrolled the user.
        if (! await utils.checkUserEnrolled(wallet, 'appUser')) return;


        const gateway =  await utils.getGateway(wallet, 'appUser', ccpPath)
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('fabcar', 'PatientContract');
        const result = await patientContract.evaluateTransaction('GetAll');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
})

app.get('/patient/query/:username', async (req, res) => {
    try {

        const wallet =  await utils.createWallet()

        // Check to see if we've already enrolled the user.
        if (! await utils.checkUserEnrolled(wallet, 'appUser')) return;


        const gateway =  await utils.getGateway(wallet, 'appUser', ccpPath)


        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('fabcar', 'MedicalInfoContract');

        const result = await patientContract.evaluateTransaction('patientQuery', req.params.username);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        res.status(200).json({response: result.toString()});

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
})