/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Wallets, X509Identity } from 'fabric-network';
import * as FabricCAServices from 'fabric-ca-client';
import * as path from 'path';
import * as fs from 'fs';

const userID = 'camtu123';

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..','fabric','test-network','organizations','peerOrganizations','org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities['ca.org1.example.com'].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const userwalletPath = path.join(process.cwd(),'..', 'wallets', userID);
        const user_wallet = await Wallets.newFileSystemWallet(userwalletPath);
        console.log(`Wallet path: ${userwalletPath}`);

        // Check to see if we've already enrolled the user.
        const userIdentity = await user_wallet.get(userID);
        if (userIdentity) {
            console.log(`An identity for the user ${userID} already exists in the wallet`);
            return;
        }


        const adminWalletPath = path.join(process.cwd(), '..', 'wallets', 'admin');
        const admin_wallet = await Wallets.newFileSystemWallet(adminWalletPath);
        console.log(`Wallet path: ${adminWalletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await admin_wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.ts application before retrying');
            return;
        }

        // build a user object for authenticating with the CA
       const provider = user_wallet.getProviderRegistry().getProvider(adminIdentity.type);
       console.log(provider);
       const adminUser = await provider.getUserContext(adminIdentity, 'admin');
       console.log(adminUser);

        // Register the user, enroll the user, and import the new identity into the wallet.
        console.log('registering user...')
        const secret = await ca.register({
            enrollmentID: userID, role: 'client',
            affiliation: ''
        }, adminUser);
        console.log('enrolling user...')
        const enrollment = await ca.enroll({ enrollmentID: userID, enrollmentSecret: secret });
        const x509Identity: X509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await user_wallet.put(userID, x509Identity);
        console.log(`Successfully registered and enrolled admin user ${userID} and imported it into the wallet`);

    } catch (error) {
        console.error(`Failed to register user ${userID}: ${error}`);
        process.exit(1);
    }
}

main();
