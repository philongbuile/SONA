const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


// Setting for Hyperledger Fabric
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', '..','SONA', 'test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
