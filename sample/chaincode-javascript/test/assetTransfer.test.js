/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
*/

'use strict';
const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

const { Context } = require('fabric-contract-api');
const { ChaincodeStub } = require('fabric-shim');

const AssetTransfer = require('../lib/assetTransfer.js');

let assert = sinon.assert;
chai.use(sinonChai);

describe('Asset Transfer Basic Tests', () => {
    let transactionContext, chaincodeStub, asset,patientInfo,doctorInfo;
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

        asset = {
            ID: 'asset1',
            Color: 'blue',
            Size: 5,
            Owner: 'Tomoko',
            AppraisedValue: 300,
        };
        patientInfo={
            ID: 'p1000',
            Username: 'longdeptrai0',
            Name: 'Be Lui Li Phong',
            Address: '69 Tran Duy Hung, Ha Noi',
            Telephone: '0912512369',
            DOB: '01/01/1969',
            Gender: 'Male',
        }
        doctorInfo={
            ID: 'd1000',
            Username: 'doctor1',
            Name: 'Doctor A',
            DOB: '01/01/1969',
            Gender: 'Male',
            Specification: 'Cardiologist'

        }
    });

    // describe('Test InitLedger', () => {
    //     it('should return error on InitLedger', async () => {
    //         chaincodeStub.putState.rejects('failed inserting key');
    //         let assetTransfer = new AssetTransfer();
    //         try {
    //             await assetTransfer.InitLedger(transactionContext);
    //             assert.fail('InitLedger should have failed');
    //         } catch (err) {
    //             expect(err.name).to.equal('failed inserting key');
    //         }
    //     });

    //     it('should return success on InitLedger', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.InitLedger(transactionContext);
    //         let ret = JSON.parse((await chaincodeStub.getState('asset1')).toString());
    //         expect(ret).to.eql(Object.assign({docType: 'asset'}, asset));
    //     });
    // });

    //-------------------------------------
    // SONA Test InitPatientInfo function
    describe('Test InitPatientInfo', () => {
        it('should return error on InitPatientInfo', async () => {
            chaincodeStub.putState.rejects('failed inserting key');
            let assetTransfer = new AssetTransfer();
            try {
                await assetTransfer.InitPatientInfo(transactionContext);
                assert.fail('InitPatientInfo should have failed');
            } catch (err) {
                expect(err.name).to.equal('failed inserting key');
            }
        });

        it('should return success on InitPatientInfo', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.InitPatientInfo(transactionContext);
            let ret = JSON.parse((await chaincodeStub.getState('p1000')).toString());
            expect(ret).to.eql(Object.assign({docType: 'patientInfo'}, patientInfo));
        });
    });
    // SONA Test InitDoctorInfo function
    describe('Test InitDoctorInfo', () => {
        it('should return error on InitDoctorInfo', async () => {
            chaincodeStub.putState.rejects('failed inserting key');
            let assetTransfer = new AssetTransfer();
            try {
                await assetTransfer.InitDoctorInfo(transactionContext);
                assert.fail('InitDoctorInfo should have failed');
            } catch (err) {
                expect(err.name).to.equal('failed inserting key');
            }
        });

        it('should return success on InitDoctorInfo', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.InitDoctorInfo(transactionContext);
            let ret = JSON.parse((await chaincodeStub.getState('d1000')).toString());
            expect(ret).to.eql(Object.assign({docType: 'doctorInfo'}, doctorInfo));
        });
    });
    

    // describe('Test CreateAsset', () => {
    //     it('should return error on CreateAsset', async () => {
    //         chaincodeStub.putState.rejects('failed inserting key');

    //         let assetTransfer = new AssetTransfer();
    //         try {
    //             await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);
    //             assert.fail('CreateAsset should have failed');
    //         } catch(err) {
    //             expect(err.name).to.equal('failed inserting key');
    //         }
    //     });

    //     it('should return success on CreateAsset', async () => {
    //         let assetTransfer = new AssetTransfer();

    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         let ret = JSON.parse((await chaincodeStub.getState(asset.ID)).toString());
    //         expect(ret).to.eql(asset);
    //     });
    // });

    //-------------------------------------
    // SONA to test Creating Patient Info function
    describe('Test CreatePatientInfo', () => {
        it('should return error on CreatePatientInfo', async () => {
            chaincodeStub.putState.rejects('failed inserting key');

            let assetTransfer = new AssetTransfer();
            try {
                await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);
                assert.fail('CreatePatientInfo should have failed');
            } catch(err) {
                expect(err.name).to.equal('failed inserting key');
            }
        });

        it('should return success on CreatePatientInfo', async () => {
            let assetTransfer = new AssetTransfer();

            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);

            let ret = JSON.parse((await chaincodeStub.getState(patientInfo.ID)).toString());
            expect(ret).to.eql(patientInfo);
        });
    });
    // SONA to test Creating Doctor Info function
    describe('Test CreateDoctorInfo', () => {
        it('should return error on CreateDoctorInfo', async () => {
            chaincodeStub.putState.rejects('failed inserting key');

            let assetTransfer = new AssetTransfer();
            try {
                await assetTransfer.CreateDoctorInfo(transactionContext, doctorInfo.ID, doctorInfo.Username, doctorInfo.Name, doctorInfo.DOB,doctorInfo.Gender,doctorInfo.Specification);
                assert.fail('CreateDoctorInfo should have failed');
            } catch(err) {
                expect(err.name).to.equal('failed inserting key');
            }
        });

        it('should return success on CreateDoctorInfo', async () => {
            let assetTransfer = new AssetTransfer();

            await assetTransfer.CreateDoctorInfo(transactionContext, doctorInfo.ID, doctorInfo.Username, doctorInfo.Name, doctorInfo.DOB,doctorInfo.Gender,doctorInfo.Specification);
                
            let ret = JSON.parse((await chaincodeStub.getState(doctorInfo.ID)).toString());
            expect(ret).to.eql(doctorInfo);
        });
    });
    

    // describe('Test ReadAsset', () => {
    //     it('should return error on ReadAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         try {
    //             await assetTransfer.ReadAsset(transactionContext, 'asset2');
    //             assert.fail('ReadAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).to.equal('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on ReadAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         let ret = JSON.parse(await chaincodeStub.getState(asset.ID));
    //         expect(ret).to.eql(asset);
    //     });
    // });

    //-------------------------------------
    // SONA function
    describe('Test ReadPatientInfo', () => {
        it('should return error on ReadAsset', async () => {
            let assetTransfer = new AssetTransfer();
            //await assetTransfer.CreateAsset(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone);
            await assetTransfer.InitPatientInfo(transactionContext);
            try {
                await assetTransfer.ReadPatientInfo(transactionContext, 'p202020');
                assert.fail('ReadPatientInfo should have failed');
            } catch (err) {
                expect(err.message).to.equal('The patientInfo p202020 does not exist');
            }
        });

        it('should return success on ReadAsset', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone,patientInfo.DOB, patientInfo.Gender);
            //await assetTransfer.InitPatientInfo(transactionContext)
            let ret = JSON.parse(await chaincodeStub.getState(patientInfo.ID));
            expect(ret).to.eql(patientInfo);
        });
    });
    

    // describe('Test UpdateAsset', () => {
    //     it('should return error on UpdateAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         try {
    //             await assetTransfer.UpdateAsset(transactionContext, 'asset2', 'orange', 10, 'Me', 500);
    //             assert.fail('UpdateAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).to.equal('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on UpdateAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         await assetTransfer.UpdateAsset(transactionContext, 'asset1', 'orange', 10, 'Me', 500);
    //         let ret = JSON.parse(await chaincodeStub.getState(asset.ID));
    //         let expected = {
    //             ID: 'asset1',
    //             Color: 'orange',
    //             Size: 10,
    //             Owner: 'Me',
    //             AppraisedValue: 500
    //         };
    //         expect(ret).to.eql(expected);
    //     });
    // });

    //--------------------------------------
    // SONA Test Update Patient Info  function
    describe('Test UpdatePatientInfo', () => {
        it('should return error on UpdatePatientInfo', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);

            try {
                await assetTransfer.UpdatePatientInfo(transactionContext, 'p2020',patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender );
                assert.fail('UpdatePatientInfo should have failed');
            } catch (err) {
                expect(err.message).to.equal('The patient p2020 does not exist');
            }
        });

        it('should return success on UpdatePatientInfo', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);


            await assetTransfer.UpdatePatientInfo(transactionContext, 'p1000','longdeptraimoidoiten', 'New Name', patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender );
            let ret = JSON.parse(await chaincodeStub.getState(patientInfo.ID));
            let expected = {
                ID: 'p1000',
                Username: 'longdeptraimoidoiten',
                Name: 'New Name',
                Address: '69 Tran Duy Hung, Ha Noi',
                Telephone: '0912512369',
                DOB: '01/01/1969',
                Gender: 'Male',
            };
            expect(ret).to.eql(expected);
        });
    });






    // Test Update Authorized Doctor
    // describe('Test AuthorizeDoctor', () => {
    //     it('should return error on AuthorizeDoctor', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);
    //         await assetTransfer.CreateDoctorInfo(transactionContext, doctorInfo.ID, doctorInfo.Username, doctorInfo.Name, doctorInfo.DOB,doctorInfo.Gender,doctorInfo.Specification);
                

    //         try {
    //             await assetTransfer.AuthorizeDoctor(transactionContext, 'p2020', doctorInfo.ID);
    //             assert.fail('AuthorizeDoctor should have failed');
    //         } catch (err) {
    //             expect(err.message).to.equal('The patient p2020 does not exist');
    //         }
    //         try {
    //             await assetTransfer.AuthorizeDoctor(transactionContext, patientInfo.ID, 'd2020');
    //             assert.fail('AuthorizeDoctor should have failed');
    //         } catch (err) {
    //             expect(err.message).to.equal('The doctor d2020 does not exist');
    //         }
            
    //     });

    //     it('should return success on AuthorizeDoctor', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);
    //         await assetTransfer.CreateDoctorInfo(transactionContext, doctorInfo.ID, doctorInfo.Username, doctorInfo.Name, doctorInfo.DOB,doctorInfo.Gender,doctorInfo.Specification);
             

    //         await assetTransfer.AuthorizeDoctor(transactionContext, 'p1000', 'd1000');
    //         let ret = JSON.parse(await chaincodeStub.getState(patientInfo.ID));
    //         let expected = {
    //             ID: 'p1000',
    //             Username: 'longdeptraimoidoiten',
    //             Name: 'New Name',
    //             Address: '69 Tran Duy Hung, Ha Noi',
    //             Telephone: '0912512369',
    //             DOB: '01/01/1969',
    //             Gender: 'Male',
    //         };
    //         expect(ret).to.eql(expected);
    //     });
    // });
    describe('Test DoctorReadPatientInfo', () => {
        it('should return success on ReadAsset', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone,patientInfo.DOB, patientInfo.Gender);
            await assetTransfer.CreateDoctorInfo(transactionContext,doctorInfo.ID, doctorInfo.Username, doctorInfo.Name,doctorInfo.DOB, doctorInfo.Gender,doctorInfo.Specification)
            //await assetTransfer.InitPatientInfo(transactionContext)
            let ret = await assetTransfer.DoctorReadPatientInfo(transactionContext, 'p1000','d1000');
            expect(ret).to.eql(patientInfo);
        });
    });






    

    describe('Test DeleteAsset', () => {
        it('should return error on DeleteAsset', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

            try {
                await assetTransfer.DeleteAsset(transactionContext, 'asset2');
                assert.fail('DeleteAsset should have failed');
            } catch (err) {
                expect(err.message).to.equal('The asset asset2 does not exist');
            }
        });

        it('should return success on DeleteAsset', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

            await assetTransfer.DeleteAsset(transactionContext, asset.ID);
            let ret = await chaincodeStub.getState(asset.ID);
            expect(ret).to.equal(undefined);
        });
    });

    describe('Test DeletePatientInfo', () => {
        it('should return error on DeletePatientInfo', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);


            try {
                await assetTransfer.DeletePatientInfo(transactionContext, 'p2');
                assert.fail('DeleteAsset should have failed');
            } catch (err) {
                expect(err.message).to.equal('The patient p2 does not exist');
            }
        });

        it('should return success on DeleteAsset', async () => {
            let assetTransfer = new AssetTransfer();
            await assetTransfer.CreatePatientInfo(transactionContext, patientInfo.ID, patientInfo.Username, patientInfo.Name, patientInfo.Address, patientInfo.Telephone, patientInfo.DOB, patientInfo.Gender);


            await assetTransfer.DeletePatientInfo(transactionContext, patientInfo.ID);
            let ret = await chaincodeStub.getState(patientInfo.ID);
            expect(ret).to.equal(undefined);
        });
    });

    // describe('Test TransferAsset', () => {
    //     it('should return error on TransferAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         try {
    //             await assetTransfer.TransferAsset(transactionContext, 'asset2', 'Me');
    //             assert.fail('DeleteAsset should have failed');
    //         } catch (err) {
    //             expect(err.message).to.equal('The asset asset2 does not exist');
    //         }
    //     });

    //     it('should return success on TransferAsset', async () => {
    //         let assetTransfer = new AssetTransfer();
    //         await assetTransfer.CreateAsset(transactionContext, asset.ID, asset.Color, asset.Size, asset.Owner, asset.AppraisedValue);

    //         await assetTransfer.TransferAsset(transactionContext, asset.ID, 'Me');
    //         let ret = JSON.parse((await chaincodeStub.getState(asset.ID)).toString());
    //         expect(ret).to.eql(Object.assign({}, asset, {Owner: 'Me'}));
    //     });
    // });

    // describe('Test GetAllAssets', () => {
    //     it('should return success on GetAllAssets', async () => {
    //         let assetTransfer = new AssetTransfer();

    //         await assetTransfer.CreateAsset(transactionContext, 'asset1', 'blue', 5, 'Robert', 100);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset2', 'orange', 10, 'Paul', 200);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset3', 'red', 15, 'Troy', 300);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset4', 'pink', 20, 'Van', 400);

    //         let ret = await assetTransfer.GetAllAssets(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).to.equal(4);

    //         let expected = [
    //             {Record: {ID: 'asset1', Color: 'blue', Size: 5, Owner: 'Robert', AppraisedValue: 100}},
    //             {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
    //             {Record: {ID: 'asset3', Color: 'red', Size: 15, Owner: 'Troy', AppraisedValue: 300}},
    //             {Record: {ID: 'asset4', Color: 'pink', Size: 20, Owner: 'Van', AppraisedValue: 400}}
    //         ];

    //         expect(ret).to.eql(expected);
    //     });

    //     it('should return success on GetAllAssets for non JSON value', async () => {
    //         let assetTransfer = new AssetTransfer();

    //         chaincodeStub.putState.onFirstCall().callsFake((key, value) => {
    //             if (!chaincodeStub.states) {
    //                 chaincodeStub.states = {};
    //             }
    //             chaincodeStub.states[key] = 'non-json-value';
    //         });

    //         await assetTransfer.CreateAsset(transactionContext, 'asset1', 'blue', 5, 'Robert', 100);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset2', 'orange', 10, 'Paul', 200);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset3', 'red', 15, 'Troy', 300);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset4', 'pink', 20, 'Van', 400);

    //         let ret = await assetTransfer.GetAllAssets(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).to.equal(4);

    //         let expected = [
    //             {Record: 'non-json-value'},
    //             {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
    //             {Record: {ID: 'asset3', Color: 'red', Size: 15, Owner: 'Troy', AppraisedValue: 300}},
    //             {Record: {ID: 'asset4', Color: 'pink', Size: 20, Owner: 'Van', AppraisedValue: 400}}
    //         ];

    //         expect(ret).to.eql(expected);
    //     });
    // });

    //-------------------------------------
    // SONA function
    // describe('Test GetAllPaitientInfo', () => {
    //     it('should return success on GetAllPaitientInfo', async () => {
    //         let assetTransfer = new AssetTransfer();

    //         // await assetTransfer.CreateAsset(transactionContext, 'asset1', 'blue', 5, 'Robert', 100);
    //         // await assetTransfer.CreateAsset(transactionContext, 'asset2', 'orange', 10, 'Paul', 200);
    //         // await assetTransfer.CreateAsset(transactionContext, 'asset3', 'red', 15, 'Troy', 300);
    //         // await assetTransfer.CreateAsset(transactionContext, 'asset4', 'pink', 20, 'Van', 400);

    //         await assetTransfer.InitPatientInfo(transactionContext);
    //         let ret = await assetTransfer.GetAllPatientInfo(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).to.equal(3);

    //         let expected = [
    //             // {Record: {ID: 'asset1', Color: 'blue', Size: 5, Owner: 'Robert', AppraisedValue: 100}},
    //             // {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
    //             // {Record: {ID: 'asset3', Color: 'red', Size: 15, Owner: 'Troy', AppraisedValue: 300}},
    //             // {Record: {ID: 'asset4', Color: 'pink', Size: 20, Owner: 'Van', AppraisedValue: 400}}
    //             {Record: {ID: 'p1000',Username: 'longdeptrai0',Name: 'Be Lui Li Phong',Address: '69 Tran Duy Hung, Ha Noi',Telephone: '0912512369',DOB: '01/01/1969',
    //             Gender: 'Male',}},
    //             {Record: {ID: 'p1000',Username: 'longdeptrai0',Name: 'Be Lui Li Phong',Address: '69 Tran Duy Hung, Ha Noi',Telephone: '0912512369',DOB: '01/01/1969',
    //             Gender: 'Male',}},
    //         ];

    //         expect(ret).to.eql(expected);
    //     });

    //     it('should return success on GetAllAssets for non JSON value', async () => {
    //         let assetTransfer = new AssetTransfer();

    //         chaincodeStub.putState.onFirstCall().callsFake((key, value) => {
    //             if (!chaincodeStub.states) {
    //                 chaincodeStub.states = {};
    //             }
    //             chaincodeStub.states[key] = 'non-json-value';
    //         });

    //         await assetTransfer.CreateAsset(transactionContext, 'asset1', 'blue', 5, 'Robert', 100);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset2', 'orange', 10, 'Paul', 200);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset3', 'red', 15, 'Troy', 300);
    //         await assetTransfer.CreateAsset(transactionContext, 'asset4', 'pink', 20, 'Van', 400);

    //         let ret = await assetTransfer.GetAllAssets(transactionContext);
    //         ret = JSON.parse(ret);
    //         expect(ret.length).to.equal(4);

    //         let expected = [
    //             {Record: 'non-json-value'},
    //             {Record: {ID: 'asset2', Color: 'orange', Size: 10, Owner: 'Paul', AppraisedValue: 200}},
    //             {Record: {ID: 'asset3', Color: 'red', Size: 15, Owner: 'Troy', AppraisedValue: 300}},
    //             {Record: {ID: 'asset4', Color: 'pink', Size: 20, Owner: 'Van', AppraisedValue: 400}}
    //         ];

    //         expect(ret).to.eql(expected);
    //     });
    // });
});
