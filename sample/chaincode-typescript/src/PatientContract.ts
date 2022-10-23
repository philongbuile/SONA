/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Patient, MedicalInfo} from './asset';
import {Case} from './asset';
import { MedicalInfoContract } from './MedicalInfo_Contract';

@Info({title: 'AssetTransfer', description: 'Smart contract for trading assets'})
export class PatientContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {


        console.log('calling init function of patient contract')
        // first creat the medicalInfo for that patient 
        // then add it to the patient info
        let medical1 = new MedicalInfo();
        medical1.ID = '1';
        let medical2 = new MedicalInfo();;
        medical2.ID = '2';

        // const medical1 = await new MedicalInfoContract().CreateMedicalInfo(ctx, [] );
        // const medical1_id = medical1.ID;
        // const medical2 = await new MedicalInfoContract().CreateMedicalInfo(ctx, [] );
        // const medical2_id = medical2.ID;



        const patients: Patient[] = [
            {
                FullName: 'Cam Tu',
                Username: 'camtu123',
                Phone: '0095', 
                Address: '43/2 abc street',
                DoB: '11/2',
                Gender: 'female',
                MedicalInfo: medical1,
                AuthorizedDoctors: ['Doctor1', 'Doctor2'],
                Records: [],
            },
            {
                FullName: 'Bui Le Phi Long',
                Username: 'philong123',
                Phone: '0969120322',
                Address: '12 xyz Street',
                DoB: '12/03/2001',
                Gender: 'male',
                MedicalInfo: medical2,
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
            await ctx.stub.putState(patient.Username, Buffer.from(stringify(sortKeysRecursive(patient))));
            console.info(`Patient ${patient.Username} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    @Transaction()
    public async CreateAsset(ctx: Context,fullname: string, username: string, phone: string, address: string, dob: string, gender: string, medical_info: MedicalInfo, authorized_doctors: string[]): Promise<void> {
        const exists = await this.AssetExists(ctx,username);
        if (exists) {
            throw new Error(`The asset ${username} already exists`);
        }

        const patient = {
            FullName: fullname,
            Username: username,
            Phone: phone,
            Address: address,
            DoB: dob,
            Gender: gender,
            MedicalInfo: medical_info,
            AuthorizedDoctors: authorized_doctors
            
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(username, Buffer.from(stringify(sortKeysRecursive(patient))));
        // return JSON.stringify(patient);

    }

    // ReadAsset returns the asset stored in the world state with given id.
    // Read patient record given patient name
    @Transaction(false)
    public async ReadPatient(ctx: Context, username: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(username); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${username} does not exist`);
        }
        return assetJSON.toString();
    }

    // can use this function for patient to update 
    // their profile infomation
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
    public async AssetExists(ctx: Context, username: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(username);
        return assetJSON && assetJSON.length > 0;
    }


    @Transaction(false)
    @Returns('boolean')
    public async IsAuthorized(ctx: Context, patient_username: string, doctor_username: string): Promise<boolean> {

        const exists = await this.AssetExists(ctx, patient_username);

        if (!exists) {
            throw new Error(`The asset ${patient_username} does not exist`);
        }
        const assetString = await this.ReadPatient(ctx, patient_username);
        const asset = JSON.parse(assetString);

        // check if the doctor exist in the authorized doctor array
        const doctors = asset.AuthorizedDoctors;

        const doctor_authorized = doctors.some(name => {
            if (name === doctor_username) {
              return true;
            }
        });
        return doctor_authorized;
    }

    @Transaction(false)
    @Returns('boolean')
    public async PatientQuery(ctx: Context, patient_username: string, doctor_username: string): Promise<string> {

        const isAuthorized = await this.IsAuthorized(ctx, patient_username, doctor_username);

        if (!isAuthorized) {
            throw new Error(`permission denied to query ${patient_username} info`);
        }

        const patient = await this.ReadPatient(ctx, patient_username);

        // create usage record
        return patient;    }
}
