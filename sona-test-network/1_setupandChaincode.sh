# create channel
./network.sh up createChannel
# deploy chaincode 
./network.sh deployCC -ccn basic -ccp ../sample/chaincode-javascript -ccl javascript
