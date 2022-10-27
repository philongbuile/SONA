
import { Wallets, Wallet, Gateway, Network } from 'fabric-network';
import * as fs from 'fs';
import * as path from 'path';

console.log(__dirname);
const ccpPath = path.resolve(
  __dirname,
  "..",
  "..",
  "..",
  "connection",
  "connection-org1.json"
);
let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

const userID = "appUser";
const asLocalhost = false;

export async function getWallet(): Promise<Wallet> {
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    return wallet;
}
    

export async function checkUserEnrolled(wallet: Wallet): Promise<boolean> {
    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(userID);
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return false;
    }

    return true;
}


// ccp is path to the connection-org.json file
export async function getGateway(wallet: Wallet, asLocalhost): Promise<Gateway>{

   // Create a new gateway for connecting to our peer node.
   const gateway = new Gateway();
   await gateway.connect(ccp, { wallet, identity: userID, discovery: { enabled: true, asLocalhost:  asLocalhost} });

   return gateway;
}

 
export async function getNetwork(gateway: Gateway, wallet: Wallet): Promise<Network> {
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
