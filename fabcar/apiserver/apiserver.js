const express = require('express');
const ejs = require('ejs');
const util = require('util')

const app = express();

app.use(express.json({type: 'application/json'}));
app.use(express.urlencoded({ extended: true}));

app.set("view engine", "ejs");

// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const { time } = require('console');
const { application } = require('express');
const ccpPath = path.resolve(__dirname, '..', '..', '..','SONA', 'test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

const PORT = 8080
app.listen(PORT, () => {
    console.log("App listening on port " + PORT)
})

//////////////////////
// PATIENT CONTRACT
/////////////////////

app.get('/patient/queryall', async (req, res) => {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('sona', 'PatientContract');

        // await patientContract.submitTransaction('InitLedger');

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
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('sona', 'PatientContract');

        await patientContract.submitTransaction('InitLedger');

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

//doctorQuery
app.get('/patient/:patient_username/:doctor_username/:record_id', async (req, res, next) => {
    try {

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('sona', 'PatientContract');
        const medicalOperatorContract = network.getContract('sona', 'OperatorContract')
        const usageRecordContract = network.getContract('sona', 'UsageRecordContract');
        
        await patientContract.submitTransaction('InitLedger');
        await medicalOperatorContract.submitTransaction('InitLedger');
        await usageRecordContract.submitTransaction('InitLedger');

        let date = Date()

        const result = await patientContract.evaluateTransaction('doctorQuery', req.params.patient_username
                                                                                , req.params.doctor_username
                                                                                , req.params.record_id
                                                                                , date);


        console.log(result)
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

// app.get('/patient/doctor-query', async (req, res, next) => {
//     let result = 'result'
//     let type = ' '
//     res.render('form', {
//         result:result,
//         type: type
//     })
// })

// app.post('/patient/doctor-query', async (req, res, next) => {
//     try {

//         let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//         // Create a new file system based wallet for managing identities.
//         const walletPath = path.join(process.cwd(), 'wallet');
//         const wallet = await Wallets.newFileSystemWallet(walletPath);
//         console.log(`Wallet path: ${walletPath}`);

//         // Check to see if we've already enrolled the user.
//         const identity = await wallet.get('appUser');
//         if (!identity) {
//             console.log('An identity for the user "appUser" does not exist in the wallet');
//             console.log('Run the registerUser.js application before retrying');
//             return;
//         }

//         // Create a new gateway for connecting to our peer node.
//         const gateway = new Gateway();
//         await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//         // Get the network (channel) our contract is deployed to.
//         const network = await gateway.getNetwork('mychannel');

//         // Get the contract from the network.
//         const patientContract = network.getContract('sona', 'PatientContract');
//         const medicalOperatorContract = network.getContract('sona', 'OperatorContract')
//         const usageRecordContract = network.getContract('sona', 'UsageRecordContract');

//         let patient_username = req.body.patient;
//         let doctor_username = req.body.doctor;
//         let record_id = req.body.record;
//         let date = Date();
        
//         await patientContract.submitTransaction('InitLedger');
//         await medicalOperatorContract.submitTransaction('InitLedger');
//         await usageRecordContract.submitTransaction('InitLedger');


//         console.log(patient_username)
//         console.log(doctor_username)
//         console.log(record_id)

//         const result = await patientContract.evaluateTransaction('doctorQuery', patient_username
//                                                                                 , doctor_username
//                                                                                 , record_id
//                                                                                 , date);


//         console.log(result)
//         let stringResult = JSON.stringify(result)
//         console.log(`Transaction has been evaluated, result is: ${stringResult}`);
//         result = JSON.parse(result)
//         res.status(200).json({response: result});
//         let type = typeof(result)
//         // res.render('form', {
//         //     type: type,
//         //     result: result
//         // });
//         // res.send(result)
//         // Disconnect from the gateway.
//         await gateway.disconnect();

//     } catch (error) {
//         console.error(`Failed to evaluate transaction: ${error}`);
//         res.status(500).json({error: error});
//         process.exit(1);
//     }
// })

app.get('/patient-authorize/doctor/:patient/:operator', async (req, res) => {
    try {

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('sona', 'PatientContract');
        const medicalOperatorContract = network.getContract('sona', 'OperatorContract')
        const usageRecordContract = network.getContract('sona', 'UsageRecordContract');
        
        await patientContract.submitTransaction('InitLedger');
        await medicalOperatorContract.submitTransaction('InitLedger');
        await usageRecordContract.submitTransaction('InitLedger');


        const result = await patientContract.evaluateTransaction('AuthorizeOperator', req.params.patient, req.params.operator);


        console.log(req.params)
        // console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // res.status(200).json({response: result.toString()});

        res.send(result)

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
})

app.get('/patient/create/:fullname/:username/:medical_info/:address/:phone/:dob/:gender/:authorize_doctor', async (req, res) => {
    try {

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('sona', 'PatientContract');

        await patientContract.submitTransaction('InitLedger');

        let date = Date()

        const result = await patientContract.evaluateTransaction('CreatePatient', req.params.fullname
                                                                                , req.params.username
                                                                                , req.params.medical_info
                                                                                , req.params.address
                                                                                , req.params.phone
                                                                                , req.params.dob
                                                                                , req.params.gender
                                                                                , req.params.authorize_doctor);

        console.log(result)
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

app.get('/patient-revoke/:patient/:doctor', async (req, res) => {
    try {

        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const patientContract = network.getContract('sona', 'PatientContract');

        await patientContract.submitTransaction('InitLedger');

        const result = await patientContract.evaluateTransaction('RevokeOperator', req.params.patient
                                                                                , req.params.doctor);

        console.log(result)
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

