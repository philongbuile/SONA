/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    // async InitLedger(ctx) {
    //     const assets = [
    //         {
    //             ID: 'asset1',
    //             Color: 'blue',
    //             Size: 5,
    //             Owner: 'Bro',
    //             AppraisedValue: 300,
    //         },
    //         {
    //             ID: 'asset2',
    //             Color: 'red',
    //             Size: 5,
    //             Owner: 'Brad',
    //             AppraisedValue: 400,
    //         },
    //         {
    //             ID: 'asset3',
    //             Color: 'green',
    //             Size: 10,
    //             Owner: 'Jin Soo',
    //             AppraisedValue: 500,
    //         },
    //         {
    //             ID: 'asset4',
    //             Color: 'yellow',
    //             Size: 10,
    //             Owner: 'Max',
    //             AppraisedValue: 600,
    //         },
    //         {
    //             ID: 'asset5',
    //             Color: 'black',
    //             Size: 15,
    //             Owner: 'Adriana',
    //             AppraisedValue: 700,
    //         },
    //         {
    //             ID: 'asset6',
    //             Color: 'white',
    //             Size: 15,
    //             Owner: 'Michel',
    //             AppraisedValue: 800,
    //         },
    //     ];

    //     for (const asset of assets) {
    //         asset.docType = 'asset';
    //         // example of how to write to world state deterministically
    //         // use convetion of alphabetic order
    //         // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //         // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
    //         await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
    //     }
    // }


    //----------------------------------------------
    // This is SONA Patient Query function
    async InitPatientInfo(ctx) {
        const patientInfos = [
            
            {
                ID: 'p1000',
                Username: 'longdeptrai0',
                Name: 'Be Lui Li Phong',
                Address: '69 Tran Duy Hung, Ha Noi',
                Telephone: '0912512369',
                DOB: '01/01/1969',
                Gender: 'Male',
                AuthorizedDoctors: ["d1000",""],
                Cases: [],

            },
            {
                ID: 'p1001',
                Username: 'lungthilinh2k1',
                Name: 'Lung Thi Linh ',
                Address: '23 Do Luong, Vung Tau',
                Telephone: '0912123398',
                DOB: '01/01/1969',
                Gender: 'Female',
                AuthorizedDoctors: ["","d1001"],
                Cases: [],

            },
            {
                ID: 'p1002',
                Username: 'tinhnongnhukem96',
                Name: 'Jose Longmunho',
                Address: 'Ngo 6 Nguyen Huu Canh, Ho Chi Minh',
                Telephone: '091123546',
                DOB: '01/01/1969',
                Gender: 'Male',
                AuthorizedDoctors: ["d1000",""],
                Cases: [],

            },
        ];

        for (const patientInfo of patientInfos) {
            patientInfo.docType = 'patientInfo';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(patientInfo.ID, Buffer.from(stringify(sortKeysRecursive(patientInfo))));
        }
    }
    // Init Doctors
    async InitDoctorInfo(ctx) {
        const doctorInfos = [
            
            {
                ID: 'd1000',
                Username: 'doctor1',
                Name: 'Doctor A',
                DOB: '01/01/1969',
                Gender: 'Male',
                Specification: 'Cardiologist'


            },
            {
                ID: 'd1001',
                Username: 'doctor2',
                Name: 'Doctor B',
                DOB: '01/01/1969',
                Gender: 'Male',
                Specification: 'Dermatologist'


            },
            
        ];

        for (const doctorInfo of doctorInfos) {
            doctorInfo.docType = 'doctorInfo';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(doctorInfo.ID, Buffer.from(stringify(sortKeysRecursive(doctorInfo))));
        }
    }

    
    

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, color, size, owner, appraisedValue) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            ID: id,
            Color: color,
            Size: size,
            Owner: owner,
            AppraisedValue: appraisedValue,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }
    //-------------------------------------
    // SONA Creating Patient Info function
    async CreatePatientInfo(ctx, id, username,name,address,telephone,dob,gender,doctor) {
        const exists = await this.PatientInfoExists(ctx, id);
        if (exists) {
            throw new Error(`The Patient ${id} already exists`);
        }

        const patientInfo = {
            ID: id,
            Username: username,
            Name: name,
            Address: address,
            Telephone: telephone,
            DOB: dob,
            Gender: gender,
            AuthorizedDoctors: doctor,
            
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(patientInfo))));
        return JSON.stringify(patientInfo);
        
    }
    // SONA Creating Doctor Info function
    async CreateDoctorInfo(ctx, id, username,name,dob,gender,specification) {
        const exists = await this.DoctorInfoExists(ctx, id);
        if (exists) {
            throw new Error(`The doctor ${id} already exists`);
        }

        const doctorInfo = {
            ID: id,
            Username: username,
            Name: name,
            DOB: dob,
            Gender: gender,
            Specification: specification,
        };
        //we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(doctorInfo))));
        return JSON.stringify(doctorInfo);
        
    }







    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }
    //----------------------------------------------
    // SONA function:
    async ReadPatientInfo(ctx, id) {
        const assetJSON = await ctx.stub.getState(id); // get the Patient Info from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The patientInfo ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    async DoctorReadPatientInfo(ctx, patient_id, doctor_id) {
        const assetJSON = await ctx.stub.getState(patient_id); // get the Patient Info from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The doctor ${patient_id} does not exist`);
        }
        const assetJSON2 = await ctx.stub.getState(doctor_id); // get the Doctor Info from chaincode state
        if (!assetJSON2 || assetJSON.length === 0) {
            throw new Error(`The doctor ${doctor_id} does not exist`);
        }
        const result = await this.IsAuthorized(ctx,patient_id, doctor_id)
        if(!result){
            throw new Error(`The doctor ${id} does not have authority to access to this patient`);
        }

        return assetJSON.toString();
    }
    // async permissionedReadPatientInfo(ctx, patient_id, doctor_id){
    //     const assetJSON = await ctx.stub.getState(patient_id);
    //     result = `Reading from doctor ${doctor_id} . \n`+assetJSON.toString();
    //     return result ;
    // }
    // async permissonlessReadPatientInfo(ctx,patient_id, doctor_id){
    //     throw new Error(`The doctor ${doctor_id} does not have permission to access to this patient, cannot access to patient ${patient_id} info `);
        
    // }
    // async fAuthorize(ctx, patient_id,doctor_id){
    //     return 'Authorization updated';
    // }

    






    // UpdateAsset updates an existing asset in the world state with provided parameters.
    // async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }

    //     // overwriting original asset with new asset
    //     const updatedAsset = {
    //         ID: id,
    //         Color: color,
    //         Size: size,
    //         Owner: owner,
    //         AppraisedValue: appraisedValue,
    //     };
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    // }
    //----------------------------------------------
    // SONA for Update Patient Info function:
    async UpdatePatientInfo(ctx, id, username,name,address,telephone,dob,gender) {
        const exists = await this.PatientInfoExists(ctx, id);
        
        if (!exists) {
            throw new Error(`The patient ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedPatientInfo = {
            ID: id,
            Username: username,
            Name: name,
            Address: address,
            Telephone: telephone,
            DOB: dob,
            Gender: gender
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedPatientInfo))));
    }


    // SONA for Update Authorize Doctor function:
    async AuthorizeDoctor(ctx, patient_id,doctor_id ) {
        const patient_exists = await this.PatientInfoExists(ctx, patient_id);
        
        if (!patient_exists) {
            throw new Error(`The patient ${patient_id} does not exist`);
        }
        const doctor_exists = await this.DoctorInfoExists(ctx, doctor_id);
        if(!doctor_exists) {
            throw new Error(`The doctor ${doctor_id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedPatientInfo= await JSON.parse(ctx.stub.getState(patient_id));
        //updatedPatientInfo.authorizedDoctor = ctx.stub.getState(doctor_id)
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(patient_id, Buffer.from(stringify(sortKeysRecursive(updatedPatientInfo))));
    }







    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }
    //----------------------------------------------
    // SONA function:
    async DeletePatientInfo(ctx, id) {
        const exists = await this.PatientInfoExists(ctx, id);
        if (!exists) {
            throw new Error(`The patient ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }












    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
    //----------------------------------------------
    // SONA function:
    async PatientInfoExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }
    async DoctorInfoExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    async IsAuthorized(ctx, patient_id, doctor_id) {
        const patient_exists = await this.PatientInfoExists(ctx, patient_id);

        if (!patient_exists) {
            throw new Error(`The patient ${patient_id} does not exist`);
        }
        const doctor_exists = await this.DoctorInfoExists(ctx, doctor_id);
        if (!doctor_exists) {
            throw new Error(`The doctor ${doctor_id} does not exist`);
        }
        const assetString = await this.ReadPatientInfo(ctx, patient_id);
        const asset = JSON.parse(assetString);

        // check if the doctor exist in the authorized doctor array
        const doctors = asset.AuthorizedDoctors;

        const doctor_authorized = doctors.some(name => {
            if (name === doctor_name) {
              return true;
            }
        });
        return doctor_authorized;
    }






    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, id, newOwner) {
        const assetString = await this.ReadAsset(ctx, id);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }
    //----------------------------------------------
    // SONA function:
    


    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    //----------------------------------------------
    // SONA function:
    async GetAllPatientInfo(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}


















// ----------------------------------------------------------------------
// Patient Authorize Doctor

module.exports = AssetTransfer;
