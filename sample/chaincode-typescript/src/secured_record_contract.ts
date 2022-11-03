/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()

import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

import {Patient, Case, UsageRecord, Operator} from './asset';
import { OperatorContract } from './MedicalOperator_Contract';

// import {AssetTransferContract} from './assetTransfer'

@Info({title: 'UsageRecordContract', description: 'Smart contract for creating Usage Record'})
export class SecuredUsageRecordContract extends Contract {

    col_name = 'UsageRecordData';

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {


        console.log('calling init function of patient contract')
        const records: UsageRecord[] = [];
        for (const record of records) {
            record.docType = 'UsageRecord';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putPrivateData(this.col_name, record.Record_ID, Buffer.from(stringify(sortKeysRecursive(record))));
            console.info(`record ${record.Record_ID} initialized`);
        }
    }



    // temp function for create Record when query Case in Medical Info
    // create an object record then push it in to the Records array corresponding to the patient
    @Transaction()
    public async CreateRecord(ctx: Context,record_id: string ,case_id: string, medicalinfo_id: string ,operation: string,operator_username: string, time: string): Promise<void>{
        
        

        let operatorContract = new OperatorContract();
        const operator = await operatorContract.QueryOperator(ctx,operator_username)

        const record ={
            docType: 'secured_usageRecord',
            Case_ID: case_id,
            MedicalInfo_ID: medicalinfo_id,
            Record_ID: record_id,
            Operation: operation,
            Roles: operator.Role,
            OperatorName: operator.Username,
            Time : time
        }
        // const patientUint8 = await ctx.stub.getState(patient_username);
        // const patientJSON =  Buffer.from(patientUint8).toString('utf8');
        // // // convert json to object
        // const patientObject = JSON.parse(patientJSON);
        // // push record into the records array
        // patientObject.Records.push(record);
        // // update world state
        return await ctx.stub.putPrivateData(this.col_name, record.Record_ID, Buffer.from(stringify(sortKeysRecursive(record))));

    }

    // Read Record function called by Patient 
    // return all the records for all times his/her case or information has been used
    // @Transaction()
    // public async ReadRecord(ctx:Context, patient_id: string) : Promise<string>{
    //     const patientUint8 = await ctx.stub.getState(patient_id); 
    //     const patientJSON = Buffer.from(patientUint8).toString('utf8');
    //     const patientObject= JSON.parse(patientJSON);

    //     const patientRecordsJSON = JSON.stringify(patientObject.Records);
    //     return patientRecordsJSON.toString();
    // }

    @Transaction(false)
    @Returns('string')
    public async GetAll(ctx: Context): Promise<string> {


        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        let selector = {
            selector:  {
                //MedicalInfo_ID:  { "$eq": "medical1" },
                docType: {"$eq":'secured_usageRecord'}
            }
        };

        let response = await ctx.stub.getPrivateDataQueryResult(this.col_name, JSON.stringify(selector));
        console.info(JSON.stringify(selector));
        // let iterator = await chaincodeStub.getStateByRange('','');
        let iterator = response.iterator;

        let result = await iterator.next();

        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;
            try {
                MedicalInfo = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                MedicalInfo = strValue;
            }
            allResults.push(MedicalInfo);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    @Transaction()
    public async QueryRecords(ctx:Context, medical_info_id: string) : Promise<string>{
        // query all the usage records of the medical_info specified
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        let selector = {
            selector:  {
                MedicalInfo_ID:  { "$eq": medical_info_id },
                docType: {"$eq":'secured_usageRecord'}
            }
        };

        let response = await ctx.stub.getPrivateDataQueryResult(this.col_name, JSON.stringify(selector));
        // let iterator = await chaincodeStub.getStateByRange('','');
    
        let iterator = response.iterator;

        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;
            try {
                MedicalInfo = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                MedicalInfo = strValue;
            }
            allResults.push(MedicalInfo);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);

        return '';
    }

}
