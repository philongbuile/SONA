/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Patient} from './asset';
import {Case} from './asset';

@Info({title: 'AssetTransfer', description: 'Smart contract for trading assets'})
export class AssetTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {

        const cases: Case[] = [
            {
                Case_ID : '2',
                TestResult : 'Success',
                Diagnosis: 'Allergic Rhinitis',
                Treatment: 'Use medicine'
            },
            
        ];

        for (const med_case of cases) {
            med_case.docType = 'medical case';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(med_case.Case_ID, Buffer.from(stringify(sortKeysRecursive(med_case))));
            console.info(`Medical Case of Patient ${med_case.Case_ID} is initialized`);
        }

        const patients: Patient[] = [
            {
                ID: '1',
                FullName: 'Cam Tu',
                Username: 'camtu123',
                Phone: '0095', 
                Address: '43/2 abc street',
                DoB: '11/2',
                Gender: 'female',
                Cases: [],
                AuthorizedDoctors: ['Doctor1', 'Doctor2'],
                Records: [],
            },
            {
                ID: '2', 
                FullName: 'Bui Le Phi Long',
                Username: 'philong123',
                Phone: '0969120322',
                Address: '12 xyz Street',
                DoB: '12/03/2001',
                Gender: 'male',
                Cases: [cases[0]],
                AuthorizedDoctors:['Doctor1'],
                Records:[],
            }
        ];

        for (const patient of patients) {
            patient.docType = 'patient';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(patient.ID, Buffer.from(stringify(sortKeysRecursive(patient))));
            console.info(`Patient ${patient.ID} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreateAsset(ctx: Context, id: string, fullname: string, username: string, phone: string, address: string, dob: string, gender: string, cases: Case[], authorized_doctors: string[]): Promise<void> {
        const exists = await this.AssetExists(ctx,id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const patient = {
            ID: id,
            FullName: fullname,
            Username: username,
            Phone: phone,
            Address: address,
            DoB: dob,
            Gender: gender,
            Cases: cases,
            AuthorizedDoctors: authorized_doctors
            
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(patient))));
        // return JSON.stringify(patient);

    }

    // ReadAsset returns the asset stored in the world state with given id.
    // Read patient record given patient name
    @Transaction(false)
    public async ReadAsset(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return assetJSON.toString();
    }

    // // UpdateAsset updates an existing asset in the world state with provided parameters.
    // @Transaction()
    // public async UpdateAsset(ctx: Context, id: string, fullname: string, username: string, phone: string, address: string, dob: string, gender: string, cases: string[], authorized_doctors: string[]): Promise<void> {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }

    //     // overwriting original asset with new asset
    //     const updatedAsset = {
    //         ID: id,
    //         FullName: fullname,
    //         Username: username,
    //         Phone: phone,
    //         Address: address,
    //         DoB: dob,
    //         Gender: gender,
    //         Cases: cases,
    //         AuthorizedDoctors: authorized_doctors
    //     };
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    // }

    // // DeleteAsset deletes an given asset from the world state.
    // @Transaction()
    // public async DeleteAsset(ctx: Context, id: string): Promise<void> {
    //     const exists = await this.AssetExists(ctx, id);
    //     if (!exists) {
    //         throw new Error(`The asset ${id} does not exist`);
    //     }
    //     return ctx.stub.deleteState(id);
    // }

    // AssetExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async AssetExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state, and returns the old owner.
    // @Transaction()
    // public async TransferAsset(ctx: Context, id: string, newOwner: string): Promise<string> {
    //     const assetString = await this.ReadAsset(ctx, id);
    //     const asset = JSON.parse(assetString);
    //     const oldOwner = asset.Owner;
    //     asset.Owner = newOwner;
    //     // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    //     await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
    //     return oldOwner;
    // }

    // GetAllAssets returns all assets found in the world state.
    // @Transaction(false)
    // @Returns('string')
    // public async GetAllAssets(ctx: Context): Promise<string> {
    //     const allResults = [];
    //     // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    //     const iterator = await ctx.stub.getStateByRange('', '');
    //     let result = await iterator.next();
    //     while (!result.done) {
    //         const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //         let record;
    //         try {
    //             record = JSON.parse(strValue);
    //         } catch (err) {
    //             console.log(err);
    //             record = strValue;
    //         }
    //         allResults.push(record);
    //         result = await iterator.next();
    //     }
    //     return JSON.stringify(allResults);
    // }


    @Transaction(false)
    @Returns('boolean')
    public async IsAuthorized(ctx: Context, patient_id: string, doctor_name: string): Promise<boolean> {

        const exists = await this.AssetExists(ctx, patient_id);

        if (!exists) {
            throw new Error(`The asset ${patient_id} does not exist`);
        }
        const assetString = await this.ReadAsset(ctx, patient_id);
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

    @Transaction(false)
    @Returns('boolean')
    public async PatientQuery(ctx: Context, patient_id: string, doctor_name: string): Promise<string> {

        const isAuthorized = await this.IsAuthorized(ctx, patient_id, doctor_name);

        if (!isAuthorized) {
            throw new Error(`permission denied to query ${patient_id} info`);
        }

        const patient = await this.ReadAsset(ctx, patient_id);
        return patient;    }
}
