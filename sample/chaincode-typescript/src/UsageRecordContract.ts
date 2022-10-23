/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import { V4MAPPED } from 'dns';
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import { v4 as uuidv4 } from 'uuid';
import {Patient} from './asset';
import {Case} from './asset';
import {UsageRecord} from './asset';
import {AssetTransferContract} from './assetTransfer'

@Info({title: 'UsageRecordContract', description: 'Smart contract for creating Usage Record'})
export class UsageRecordContract extends Contract {


    // temp function for create Record when query Case in Medical Info
    // create an object record then push it in to the Records array corresponding to the patient
    @Transaction()
    public async CreateRecord(ctx: Context, patient_username: string, case_id: string, medicalinfo_id: string ,operation: string, roles: string ,operator_name: string): Promise<void>{
        const record ={
            docType: 'UsageRecord',
            Case_ID: case_id,
            MedicalInfo_ID: medicalinfo_id,
            Record_ID: uuidv4(),
            Operation: operation,
            Roles: roles,
            OperatorName: operator_name,
            Time : new Date().toLocaleString()
        }
        const patientUint8 = await ctx.stub.getState(patient_username);
        const patientJSON =  Buffer.from(patientUint8).toString('utf8');
        // // convert json to object
        const patientObject = JSON.parse(patientJSON);
        // push record into the records array
        patientObject.Records.push(record);
        // update world state
        return await ctx.stub.putState(patient_username, Buffer.from(stringify(sortKeysRecursive(patientObject))));

    }

    // Read Record function called by Patient 
    // return all the records for all times his/her case or information has been used
    @Transaction()
    public async ReadRecord(ctx:Context, patient_username:string) : Promise<string>{
        const patientUint8 = await ctx.stub.getState(patient_username); 
        const patientJSON = Buffer.from(patientUint8).toString('utf8');
        const patientObject= JSON.parse(patientJSON);

        const patientRecordsJSON = JSON.stringify(patientObject.Records);
        return patientRecordsJSON.toString();
    }


    

}
