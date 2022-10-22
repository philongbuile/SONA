/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Patient} from './asset';
import {Case} from './asset';
import {UsageRecord} from './asset';
import {AssetTransferContract} from './assetTransfer'

@Info({title: 'CaseContract', description: 'Smart contract for Medical Case query'})
export class CaseContract extends Contract {

    @Transaction()
    public async InitCaseLedger(ctx: Context): Promise<void> {

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
                Records: [],
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

    // called by Medical Operator
    // CreateCase issues a new medical case of the patient, to the world state with given details.
    @Transaction()
    public async CreateCase(ctx: Context, patient_id: string, operator_name: string,case_id: string, testresult: string,diagnosis: string,treatment: string): Promise<void> {

        const Case = {
            Case_ID:case_id,
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment:treatment
            
        };
        // get patient from the world state
        const patientJSON = await ctx.stub.getState(patient_id);
        // convert Uint8Array to string
        const jsonString = Buffer.from(patientJSON).toString('utf8')
        
        // // convert json to object
        const patientObject = JSON.parse(jsonString);
        const patientContract = new AssetTransferContract();
        const isAuthorized = await patientContract.IsAuthorized(ctx, patient_id, operator_name);

        if (!isAuthorized) {
            throw new Error(`permission denied to query ${patient_id} cases`);
        }
        
        patientObject.Cases.push(Case);

        await this.CreateRecord(ctx,patient_id,case_id,'OperatorCreateCase_URID','create case','doctor',operator_name,new Date().toLocaleString());
        

        return ctx.stub.putState(patient_id, Buffer.from(stringify(sortKeysRecursive(patientObject))));
    


    }

    // Readcase returns all the cases stored patient in the world state with given id.
    // Read patient medical case given patient id
    // called by patient
    @Transaction(false)
    public async ReadCase(ctx: Context, id: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The patient ${id} does not exist`);
        }
        // convert Uint8Array to json
        const jsonString = Buffer.from(assetJSON).toString('utf8')
        
        // // convert json to object
        const patientObject = JSON.parse(jsonString);
        
        // // convert array object to string
        // const result =  patientObject.Cases;
        // await this.CreateRecord(ctx,id,'patientread1','patient reading own case', 'patient',patientObject.FullName,new Date().toLocaleString())
        const casesJSON = JSON.stringify(patientObject.Cases)
        for (const med_case of patientObject.Cases){
            await this.CreateRecord(ctx,id,med_case.Case_ID,'patientRead_URID','read','patient',patientObject.FullName,new Date().toLocaleString());
        }

        //return result.toString();
        return casesJSON.toString();
    }


    @Transaction(false)
    public async OperatorReadCase(ctx: Context, patient_id: string,operator_name: string, operation: string): Promise<string> {
        const assetJSON = await ctx.stub.getState(patient_id); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The patient ${patient_id} does not exist`);
        }
        // convert Uint8Array to json
        const jsonString = Buffer.from(assetJSON).toString('utf8')
        
        // // convert json to object
        const patientObject = JSON.parse(jsonString);
        const patientContract = new AssetTransferContract();
        const isAuthorized = await patientContract.IsAuthorized(ctx, patient_id, operator_name);

        if (!isAuthorized) {
            throw new Error(`permission denied to query ${patient_id} cases`);
        }
        for (const med_case of patientObject.Cases){
            await this.CreateRecord(ctx,patient_id,med_case.Case_ID,'OperatorReadCase_URID','read case','doctor',operator_name,new Date().toLocaleString());
        }

        // // convert array object to string
        // const result =  patientObject.Cases;
        //await this.CreateRecord(ctx,patient_id,'patientread1','patient reading own case', 'patient',patientObject.FullName,new Date().toLocaleString())
        //return result.toString();
        const patientCasesJSON = JSON.stringify(patientObject.Cases);
        return patientCasesJSON.toString();
    }



    // temp function for create Record when query Case
    // create an object record then push it in to the Records array corresponding to the patient
    @Transaction()
    public async CreateRecord(ctx: Context, patient_id: string, case_id: string,record_id: string,operation: string, roles: string ,operator_name: string, time: string): Promise<void>{
        const record ={
            docType: 'UsageRecord',
            Case_ID: case_id,
            Record_ID: record_id,
            Operation: operation,
            Roles: roles,
            OperatorName: operator_name,
            Time : time
        }
        const patientUint8 = await ctx.stub.getState(patient_id);
        const patientJSON =  Buffer.from(patientUint8).toString('utf8');
        // // convert json to object
        const patientObject = JSON.parse(patientJSON);

        patientObject.Records.push(record);
        await ctx.stub.putState(patient_id, Buffer.from(stringify(sortKeysRecursive(patientObject))));
        await ctx.stub.putState(record_id, Buffer.from(stringify(sortKeysRecursive(record))));
        

    }

    // Read Record function called by Patient 
    // return all the records for all times his/her case or information has been used
    @Transaction()
    public async ReadRecord(ctx:Context, patient_id:string) : Promise<string>{
        const patientUint8 = await ctx.stub.getState(patient_id); 
        const patientJSON = Buffer.from(patientUint8).toString('utf8');
        const patientObject= JSON.parse(patientJSON);

        const patientRecordsJSON = JSON.stringify(patientObject.Records);
        return patientRecordsJSON.toString();
    }

    // function used by admin to retrieve all usage record stored in blockchain network 
   

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


//     @Transaction(false)
//     @Returns('boolean')
//     public async IsAuthorized(ctx: Context, patient_id: string, doctor_name: string): Promise<boolean> {

//         const exists = await this.AssetExists(ctx, patient_id);

//         if (!exists) {
//             throw new Error(`The asset ${patient_id} does not exist`);
//         }
//         const assetString = await this.ReadAsset(ctx, patient_id);
//         const asset = JSON.parse(assetString);

//         // check if the doctor exist in the authorized doctor array
//         const doctors = asset.AuthorizedDoctors;

//         const doctor_authorized = doctors.some(name => {
//             if (name === doctor_name) {
//               return true;
//             }
//         });
//         return doctor_authorized;
//     }

//     @Transaction(false)
//     @Returns('boolean')
//     public async PatientQuery(ctx: Context, patient_id: string, doctor_name: string): Promise<string> {

//         const isAuthorized = await this.IsAuthorized(ctx, patient_id, doctor_name);

//         if (!isAuthorized) {
//             throw new Error(`permission denied to query ${patient_id} info`);
//         }

//         const patient = await this.ReadAsset(ctx, patient_id);
//         return patient;    }

}
