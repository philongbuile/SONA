const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.json());
// app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..','SONA','sample', 'application-typescript','org', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const PORT = 8080
app.listen(PORT, () => {
    console.log("App listening on port " + PORT)
})


app.get('/patient/queryall', async (req, res) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('userOne');
        if (!identity) {
            console.log('An identity for the user "userOne" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'userOne', discovery: { enabled: true, asLocalhost: true } });

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

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('userOne');
        if (!identity) {
            console.log('An identity for the user "userOne" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'userOne', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('fabcar', 'PatientContract');

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

app.post('/patient/doctor-query', async (req, res) => {
    try {

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('userOne');
        if (!identity) {
            console.log('An identity for the user "userOne" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'userOne', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('fabcar', 'PatientContract');

        let patient_username = req.body.username
        let doctor_username = req.body.doctor_username
        let record_id = req.body.record_id
        let date = Date()
        
        const result = await patientContract.evaluateTransaction('patientQuery', req.body.patient_username
                                                                                , req.body.doctor_username
                                                                                , req.body.record_id
                                                                                , date);

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // res.status(200).json({response: result.toString()});
        res.render('form', {
            result:result
        });

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
})