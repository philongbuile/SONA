# create channel
./network.sh up createChannel
# deploy chaincode 
./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript
