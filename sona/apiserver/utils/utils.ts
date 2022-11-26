
import { Wallets, Wallet, Gateway, Network } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';
import { buildCCPOrg1,buildCCPOrg2, buildWallet } from './AppUtil';
import { buildCAClient, enrollAdmin, registerAndEnrollUser } from './CAUtil';

console.log(__dirname);
const asLocalhost = true;
const mspOrg1 = 'Org1MSP';
const mspOrg2 = 'Org2MSP';


export async function getWallet(userID: string): Promise<Wallet> {
    // Create a new file system based wallet for managing identities.
    console.log(`get wallet with userID: ${userID}`);

    const walletPath = path.join(process.cwd(), 'wallets', userID);
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path in getWallet: ${walletPath}`);

    return wallet;
}
    


// ccp is path to the connection-org.json file
export async function getGateway(wallet: Wallet, userID : string, ccp: Record<string, any>): Promise<Gateway>{

   // Create a new gateway for connecting to our peer node.
   console.log(`get identity of user  in getGateway${userID}`)
   const gateway = new Gateway();
   await gateway.connect(ccp, { wallet, identity: userID, discovery: { enabled: true, asLocalhost:  asLocalhost} });

   console.log('get gateway')

   return gateway;
}

 
export async function getNetwork(gateway: Gateway, wallet: Wallet, userID: string): Promise<Network> {
  console.log(`get identity of user in ${userID}`)

  const identity = await wallet.get(userID);
  if (!identity) {
    console.log(
      `An identity for the user ${userID} does not exist in the wallet`
    );
    console.log("Run the registerUser.js application before retrying");
    throw Error(`identity ${userID} does not exists`);
  }

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork("mychannel");
  return network;
}


export async function registerUserOrg1(userID: string): Promise<void> {
  const ccp = buildCCPOrg1();

        const mspOrg1 = 'Org1MSP';
        const walletPath = path.join(process.cwd(), '..', 'wallets', userID);

        console.log(walletPath);
        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        const caClient = buildCAClient(ccp, 'ca.org1.example.com');

        // setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(walletPath);

        // in a real application this would be done on an administrative flow, and only once
        await enrollAdmin(caClient, wallet, mspOrg1);

        // in a real application this would be done only when a new user was required to be added
        // and would be part of an administrative flow
        await registerAndEnrollUser(caClient, wallet, mspOrg1, userID, '');

}


export async function registerUserOrg2(userID: string): Promise<void> {
  const ccp = buildCCPOrg2();

  const walletPath = path.join(process.cwd(),'..', 'wallets', userID);

        // build an instance of the fabric ca services client based on
        // the information in the network configuration
        const caClient = buildCAClient(ccp, 'ca.org2.example.com');

        // setup the wallet to hold the credentials of the application user
        const wallet = await buildWallet(walletPath);

        // in a real application this would be done on an administrative flow, and only once
        await enrollAdmin(caClient, wallet, mspOrg2);

        // in a real application this would be done only when a new user was required to be added
        // and would be part of an administrative flow
        await registerAndEnrollUser(caClient, wallet, mspOrg2, userID, '');

}





