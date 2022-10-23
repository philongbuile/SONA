const sinonChai = require('sinon-chai');
const sinon = require('sinon');
const chai = require('chai');


const { Context } = require('fabric-contract-api');
const { ChaincodeStub } = require('fabric-shim');
import {PatientContract} from '../src/PatientContract';
let assert = sinon.assert;
chai.use(sinonChai);

describe('Asset Transfer Basic Tests', () => {
    let transactionContext, chaincodeStub, asset, patient, cases;
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

        asset = {
            ID: '1',
            FullName: 'Cam Tu',
            Username: 'camtu123',
            Phone: '0095', 
            Address: '43/2 abc street',
            DoB: '11/2',
            Gender: 'female',
            Cases: [],
            AuthorizedDoctors: ['Doctor1', 'Doctor2']
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
            AuthorizedDoctors:['Doctor1']
        }
    });

    describe('Test InitLedger', () => {
        it('should return error on InitLedger', async () => {
            chaincodeStub.putState.rejects('failed inserting key');
            let Patient = new PatientContract();
            try {
                await Patient.InitLedger(transactionContext);
                assert.fail('InitLedger should have failed');
            } catch (err) {
                expect(err.name).toEqual('failed inserting key');
            }
        });

        it('should return success on InitLedger', async () => {
            let Patient = new PatientContract();
            await Patient.InitLedger(transactionContext);
            let ret = JSON.parse((await chaincodeStub.getState('1')).toString());
            expect(ret).toEqual(Object.assign({docType: 'patient'}, asset));
        });
    });

    describe('Test CreateAsset', () => {
        it('should return error on CreateAsset', async () => {
            chaincodeStub.putState.rejects('failed inserting key');

            let Patient = new PatientContract();
            try {
                await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);
                assert.fail('CreateAsset should have failed');
            } catch(err) {
                expect(err.name).toEqual('failed inserting key');
            }
        });

        it('should return success on CreateAsset', async () => {
            let Patient = new PatientContract();

            await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

            let ret = JSON.parse((await chaincodeStub.getState(asset.ID)).toString());
            expect(ret).toEqual(asset);
        });
    });



    // describe('Test UpdateAsset', () => {
    //     it('should return error on UpdateAsset', async () => {
    //         let Patient = new PatientContract();
    //         await Patient.CreateAsset(transactionContext,  asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         try {
    //             await Patient.UpdateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //             assert.fail('UpdateAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset 1 does not exist');
    //         }
    //     });

    //     it('should return success on UpdateAsset', async () => {
    //         let Patient = new PatientContract();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         await Patient.UpdateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
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

    // describe('Test ReadAsset', () => {
    //     it('should return error on ReadAsset', async () => {
    //         let Patient = new PatientContract();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         try {
    //             await Patient.ReadAsset(transactionContext, 'asset2');
    //             assert.fail('ReadAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on ReadAsset', async () => {
    //         let Patient = new PatientContract();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         let ret = JSON.parse(await chaincodeStub.getState(asset.ID));
    //         expect(ret).toEqual(asset);
    //     });
    // });

    // describe('Test DeleteAsset', () => {
    //     it('should return error on DeleteAsset', async () => {
    //         let Patient = new PatientContract();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         try {
    //             await Patient.DeleteAsset(transactionContext, 'asset2');
    //             assert.fail('DeleteAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on DeleteAsset', async () => {
    //         let Patient = new PatientContract();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);

    //         await Patient.DeleteAsset(transactionContext, asset.ID);
    //         let ret = await chaincodeStub.getState(asset.ID);
    //         expect(ret).toEqual(undefined);
    //     });
    // });

    // describe('Test TransferAsset', () => {
    //     it('should return error on TransferAsset', async () => {
    //         let Patient = new Patient();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         try {
    //             await Patient.TransferAsset(transactionContext, 'asset2', 'Me');
    //             assert.fail('DeleteAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).toEqual('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on TransferAsset', async () => {
    //         let Patient = new Patient();
    //         await Patient.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         await Patient.TransferAsset(transactionContext, asset.ID, 'Me');
    //         let ret = JSON.parse((await chaincodeStub.getState(asset.ID)).toString());
    //         expect(ret).toEqual(Object.assign({}, asset, {Owner: 'Me'}));
    //     });
    // });

    // describe('Test GetAllAssets', () => {
    //     it('should return success on GetAllAssets', async () => {
    //         let Patient = new PatientContract();

    //         await Patient.CreateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //         await Patient.CreateAsset(transactionContext, '2', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
         

    //         let ret = await Patient.GetAllAssets(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).toEqual(4);

    //         let expected = [
    //             {Record: {ID: 'asset1', Color: 'blue', Size: 5, Owner: 'Robert', AppraisedValue: 100}},
    //             {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
              
    //         ];

    //         expect(ret).toEqual(expected);
    //     });

    //     it('should return success on GetAllAssets for non JSON value', async () => {
    //         let Patient = new PatientContract();

    //         chaincodeStub.putState.onFirstCall().callsFake((key, value) => {
    //             if (!chaincodeStub.states) {
    //                 chaincodeStub.states = {};
    //             }
    //             chaincodeStub.states[key] = 'non-json-value';
    //         });

    //         await Patient.CreateAsset(transactionContext, '1', 'Peter', 'peter123', '0032', '23/44 sssf', '11/7', 'female', ['1'], ['doctor1']);
    //         // await Patient.CreateAsset(transactionContext, 'asset2', 'orange', 10, 'Paul', 200);
    //         // await Patient.CreateAsset(transactionContext, 'asset3', 'red', 15, 'Troy', 300);
    //         // await Patient.CreateAsset(transactionContext, 'asset4', 'pink', 20, 'Van', 400);

    //         let ret = await Patient.GetAllAssets(transactionContext);
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


    describe('Test query patient data', () => {
        it('should return error on query from unauthorized doctor', async () => {

            let Patient = new PatientContract();
            await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);
            try {
                await Patient.PatientQuery(transactionContext, asset.ID, 'doctor3');
                assert.fail('query should be permission denied');
            } catch (err) {
                expect(err.message).toEqual(`permission denied to query ${asset.ID} info`);
            }
        });

        it('should query sucessful from authorized doctor', async () => {
            let Patient = new PatientContract();
            await Patient.CreateAsset(transactionContext, asset.ID, asset.FullName, asset.Username, asset.Phone, asset.Address, asset.DoB, asset.Gender, asset.Cases, asset.AuthorizedDoctors);
            let ret =  await Patient.PatientQuery(transactionContext, asset.ID, 'Doctor1');
            expect(JSON.parse(ret)).toEqual(asset);
});
    });
});
