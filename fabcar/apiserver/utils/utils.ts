
import { Wallets, Wallet, Gateway } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';



export async function createWallet(): Promise<Wallet> {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    return wallet;
}
    

export async function checkUserEnrolled(wallet: Wallet, appUser: string): Promise<boolean> {
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(appUser);
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return false;
    }

    return true;
}


// ccp is path to the connection-org.json file
export async function getGateway(wallet: Wallet, appUser: string, ccpPath: string): Promise<Gateway>{

   // Create a new gateway for connecting to our peer node.

   let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
   const gateway = new Gateway();
   await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

   return gateway;
}

 



