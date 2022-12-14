const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const chai = require('chai');


const { Context } = require('fabric-contract-api');
const { ChaincodeStub } = require('fabric-shim');

import {CaseContract} from '../caseContract';
import {PatientContract} from '../PatientContract'
import {MedicalInfoContract} from '../MedicalInfo_Contract'
import {v4 as uuid} from 'uuid';
import {UsageRecordContract} from '../UsageRecordContract'
import { OperatorContract } from '../MedicalOperator_Contract';
import { MedicalInfo } from '../asset';
let assert = sinon.assert;
chai.use(sinonChai);

describe('Asset Transfer Basic Tests', () => {
    let transactionContext, chaincodeStub, asset, patient, cases, records;
    beforeEach(() => {
        transactionContext = new Context();

        chaincodeStub = sinon.createStubInstance(ChaincodeStub);
        transactionContext.setChaincodeStub(chaincodeStub);

        chaincodeStub.putState.callsFake((key, value) => {
            if (!chaincodeStub.states) {
                chaincodeStub.states = {};
            }
            chaincodeStub.states[key] = value;
        });

        chaincodeStub.getState.callsFake(async (key) => {
            let ret;
            if (chaincodeStub.states) {
                ret = chaincodeStub.states[key];
            }
            return Promise.resolve(ret);
        });

        chaincodeStub.deleteState.callsFake(async (key) => {
            if (chaincodeStub.states) {
                delete chaincodeStub.states[key];
            }
            return Promise.resolve(key);
        });

        chaincodeStub.getStateByRange.callsFake(async () => {
            function* internalGetStateByRange() {
                if (chaincodeStub.states) {
                    // Shallow copy
                    const copied = Object.assign({}, chaincodeStub.states);

                    for (let key in copied) {
                        yield {value: copied[key]};
                    }
                }
            }

            return Promise.resolve(internalGetStateByRange());
        });
        cases =[
            {
                ID : '2',
                TestResult : 'Success',
                Diagnosis: 'Allergic Rhinitis',
                Treatment: 'Use medicine'
            },
        ]
        records=[
            {
                docType: 'UsageRecord',
                Patient_ID: '2',
                Record_ID: '1',
                Operation: 'diagnosise',
                Role: 'doctor', 
                OperatorName: 'Doctor1',
                Time: new Date().toLocaleString()
            }
        ]

        asset = {
            ID: '1',
            FullName: 'Cam Tu',
            Username: 'camtu123',
            Phone: '0095', 
            Address: '43/2 abc street',
            DoB: '11/2',
            Gender: 'female',
            Cases: [],
            AuthorizedDoctors: ['Doctor1', 'Doctor2'],
        }
        patient ={
            ID: '2', 
            FullName: 'Bui Le Phi Long',
            Username: 'philong123',
            Phone: '0969120322',
            Address: '12 xyz Street',
            DoB: '12/03/2001',
            Gender: 'male',
            Cases: [cases[0]],
            AuthorizedDoctors:['Doctor1'],
            Records: [records[0]]
        }
        
    });

    // describe('Test InitLedger', () => {
    //     it('should return error on InitLedger', async () => {
    //         chaincodeStub.putState.rejects('failed inserting key');
    //         let assetTransfer = new AssetTransferContract();
    //         try {
    //             await assetTransfer.InitLedger(transactionContext);
    //             assert.fail('InitLedger should have failed');
    //         } catch (err) {
    //             expect(err.name).toEqual('failed inserting key');
    //         }
    //     });

    //     it('should return success on InitLedger', async () => {
    //         let assetTransfer = new AssetTransferContract();
    //         await assetTransfer.InitLedger(transactionContext);
    //         let ret = JSON.parse((await chaincodeStub.getState('1')).toString());
    //         expect(ret).toEqual(Object.assign({docType: 'patient'}, asset));
    //     });
    // });

    describe('Test MedInfo', () => {


        it('should return success on MedInfo', async () => {
            const medinfoContract = new MedicalInfoContract();
            const medID = uuid();
            let result = await medinfoContract.CreateMedicalInfo(transactionContext,[],medID)
            let ret = JSON.parse((await chaincodeStub.getState(medID)).toString());
            expect('gay').toEqual(result);
        });
    });

    // describe('Test ReadRecord', () => {


    //     it('should return success on ReadRecord', async () => {
    //         const medinfoContract = new MedicalInfoContract();
    //         const medID = uuid();
    //         await medinfoContract.CreateMedicalInfo(transactionContext,[],medID)
    //         await medinfoContract.CreateMedicalInfo(transactionContext,[],'random')
            
    //         const recordContract = new UsageRecordContract();
    //        //let result = await recordContract.GetAll(transactionContext)
            
            
    //         let ret = JSON.parse((await chaincodeStub.getState(medID)).toString());
    //         expect(result).toEqual('result');
    //     });
    // });

    describe('Test PatientQuery', () => {


        it('should return success on PatientQuery', async () => {
            const patientContract = new PatientContract();
            //await patientContract.InitLedger(transactionContext);
            await patientContract.CreatePatient(transactionContext,'Long Bui','longbui123','medid_1','09123123','Water Mountain','12/03/2001','male','Doctor Long','Doctor1');
            
            let result = await patientContract.GetAll(transactionContext);
            // const recordContract = new UsageRecordContract();
            // let result = await recordContract.GetAll(transactionContext)
            
            
            //let ret = JSON.parse((await chaincodeStub.getState(medID)).toString());
            expect(result).toEqual('result');
        });
    });

    describe('Test UpdateCase', () => {


        it('should return success', async () => {
            const doctor1 = new OperatorContract().InitLedger(transactionContext);

            const patientContract = new PatientContract();

            const medical1 = await new MedicalInfoContract().CreateMedicalInfo(transactionContext, 'patient1000');
            //await patientContract.CreatePatient(transactionContext,'Long Bui','longbui123',medical1.ID,'09123123','Water Mountain','12/03/2001','male',['Doctor1'],'Doctor1');
            //const result = await patientContract.patientQuery(transactionContext,'longbui123');
            
            //await new CaseContract().CreateCase(transactionContext,'case1','NOT OK','Xao loz','Cut Me m Di')

            await new MedicalInfoContract().AddCase(transactionContext,'case1',medical1.ID,'OK','Flu','Use medicine','Doctor1','longbui123','record1',new Date().toLocaleString());
            
            await new MedicalInfoContract().AppendCase(transactionContext,medical1.ID,'case1','Not OK','Xao loz','Hide away from meetings','Doctor1','longbui123','record2',new Date().toLocaleString());
            //await new MedicalInfoContract().InitLedger(transactionContext);

            const result = await new MedicalInfoContract().patientQueryMedicalInfo(transactionContext,medical1.ID);
            //let ret = JSON.parse((await chaincodeStub.getState(medID)).toString());
            expect(result.toString()).toEqual('result');
        });
    });






    // describe('Test UpdateAsset', () => {
    //     it('should return error on UpdateAsset', async () => {
    //         let assetTransfer = new AssetTransferContract();
    //         await assetTransfer.CreateAsset(transactionContext,  asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         try {
    //             await assetTransfer.UpdateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //             assert.fail('UpdateAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset 1 does not exist');
    //         }
    //     });

    //     it('should return success on UpdateAsset', async () => {
    //         let assetTransfer = new AssetTransferContract();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         await assetTransfer.UpdateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //         let ret = JSON.parse(await chaincodeStub.getState(asset.ID));
    //         let expected = {
    //             ID: '1',
    //             FullName: 'Peter',
    //             Username: 'peter12',
    //             Phone: '0032',
    //             Address: '23/44 sssf',
    //             DoB: '11/7',
    //             Gender: 'female',
    //             Cases:  ['1'],
    //             AuthorizedDoctors: ['doctor1']
    //         };
    //         expect(ret).toEqual(expected);
    //     });
    // });

    


    
    

    // Test Create Record
    




    // describe('Test DeleteAsset', () => {
    //     it('should return error on DeleteAsset', async () => {
    //         let assetTransfer = new AssetTransferContract();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         try {
    //             await assetTransfer.DeleteAsset(transactionContext, 'asset2');
    //             assert.fail('DeleteAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on DeleteAsset', async () => {
    //         let assetTransfer = new AssetTransferContract();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         await assetTransfer.DeleteAsset(transactionContext, asset.ID);
    //         let ret = await chaincodeStub.getState(asset.ID);
    //         expect(ret).toEqual(undefined);
    //     });
    // });

    // describe('Test TransferAsset', () => {
    //     it('should return error on TransferAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         try {
    //             await assetTransfer.TransferAsset(transactionContext, 'asset2', 'Me');
    //             assert.fail('DeleteAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on TransferAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         await assetTransfer.TransferAsset(transactionContext, asset.ID, 'Me');
    //         let ret = JSON.parse((await chaincodeStub.getState(asset.ID)).toString());
    //         expect(ret).toEqual(Object.assign({}, asset, {Owner: 'Me'}));
    //     });
    // });

    // describe('Test GetAllAssets', () => {
    //     it('should return success on GetAllAssets', async () => {
    //         let assetTransfer = new AssetTransferContract();

    //         await assetTransfer.CreateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //         await assetTransfer.CreateAsset(transactionContext, '2', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
         

    //         let ret = await assetTransfer.GetAllAssets(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).toEqual(4);

    //         let expected = [
    //             {Record: {ID: 'asset1', Color: 'blue', Size: 5, Owner: 'Robert', AppraisedValue: 100}},
    //             {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
              
    //         ];

    //         expect(ret).toEqual(expected);
    //     });

    //     it('should return success on GetAllAssets for non JSON value', async () => {
    //         let assetTransfer = new AssetTransferContract();

    //         chaincodeStub.putState.onFirstCall().callsFake((key, value) => {
    //             if (!chaincodeStub.states) {
    //                 chaincodeStub.states = {};
    //             }
    //             chaincodeStub.states[key] = 'non-json-value';
    //         });

    //         await assetTransfer.CreateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //         // await assetTransfer.CreateAsset(transactionContext, 'asset2', 'orange', 10, 'Paul', 200);
    //         // await assetTransfer.CreateAsset(transactionContext, 'asset3', 'red', 15, 'Troy', 300);
    //         // await assetTransfer.CreateAsset(transactionContext, 'asset4', 'pink', 20, 'Van', 400);

    //         let ret = await assetTransfer.GetAllAssets(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).toEqual(1);

    //         let expected = [
    //             {Record: 'non-json-value'},
    //             {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
    //             {Record: {ID: 'asset3', Color: 'red', Size: 15, Owner: 'Troy', AppraisedValue: 300}},
    //             {Record: {ID: 'asset4', Color: 'pink', Size: 20, Owner: 'Van', AppraisedValue: 400}}
    //         ];

    //         expect(ret).toEqual(expected);
    //     });
    // });


});
