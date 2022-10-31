# interacting with the network
# Add ing things to CLI paths
export PATH=${PWD}/../bin:$PATH
export FABRIC_CFG_PATH=$PWD/../config/
# Environment variables for Org1

export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051


#peer chaincode query -C mychannel -n basic -c '{"function":"DoctorReadPatientInfo","Args":["p1001","d1001"]}'
# permissionedReadPatientInfo
peer chaincode query -C mychannel -n basic -c '{"function":"permissionedReadPatientInfo","Args":["p1001","d1001"]}