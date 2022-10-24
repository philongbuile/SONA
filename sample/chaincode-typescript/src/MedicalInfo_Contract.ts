/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Case, Examination, MedicalInfo} from './asset';

import { CaseContract } from './caseUtils';
import { PatientContract } from './PatientContract';
import { OperatorContract } from './MedicalOperator_Contract';
import { UsageRecordContract } from './UsageRecordContract';


@Info({title: 'MedicalInfo', description: 'Smart contract for trading MedicalInfos'})
export class MedicalInfoContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        
        const medical_infos: MedicalInfo[] = [
            {
                ID: 'medical1',
                Cases: [
                    {
                    Case_ID: 'case1',
                    Examinations: [
                        {
                            TestResult : 'Success',
                            Diagnosis: 'Allergic Rhinitis',
                            Treatment: 'Use medicine'
    
                        }
                ]}]
            },
            {
                ID: 'medical2',
                Cases: 
                [
                    {
                        Case_ID: 'case2',
                        Examinations: [
                        {
                            TestResult: '',
                            Diagnosis: 'diabete type 2',
                            Treatment: 'medicine',

                        },
                        {
                            TestResult: '',
                            Diagnosis: 'diabete type 3',
                            Treatment: 'medicine',
                        }
                        ]
                    },
                    {
                        Case_ID: 'case3',
                        Examinations: [
                        {
                            TestResult: '',
                            Diagnosis: 'cancer stage I',
                            Treatment: 'medicine',

                        },
                        {
                            TestResult: '',
                            Diagnosis: 'cancer stage II',
                            Treatment: 'medicine',
                        }
                        ]
                    }
                ]
            }

            
        ];

        console.log('calling init function of medical info')
        for (const MedicalInfo of medical_infos) {
            MedicalInfo.docType = 'medical_info';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(MedicalInfo.ID, Buffer.from(stringify(sortKeysRecursive(MedicalInfo))));
            console.info(`MedicalInfo ${MedicalInfo.ID} initialized`);
        }
    }

    // CreateMedicalInfo issues a new MedicalInfo to the world state with given details.
    // patient_username: needed to check whether operator has right to create 
    // medical info for that patient.
    @Transaction()
    // need modify : add create record
    public async CreateMedicalInfo(ctx: Context, id: string): Promise<MedicalInfo> {

        // generate uuid for medical record
        // const id = uuid();

        const exists = await this.MedicalInfoExists(ctx, id);
        if (exists) {
            throw new Error(`The MedicalInfo ${id} already exists`);
        }
        const medicalInfo: MedicalInfo  = {
            ID: id,
            Cases: [],
        };

        // add this medical info to patient object
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(medicalInfo))));
        return medicalInfo;

    }

    // ReadMedicalInfo returns the MedicalInfo stored in the world state with given id.
    @Transaction(false)
    private async ReadMedicalInfo(ctx: Context, id: string): Promise<string> {

        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }
        return MedicalInfoJSON.toString();
    }


    
    @Transaction(false)
    public async operatorQueryMedicalInfo(ctx: Context, id: string, operator_username: string,record_id: string, time: string): Promise<string> {

        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }

         // create usage record
         let recordContract = new UsageRecordContract();
         await recordContract.CreateRecord(ctx, record_id,undefined , id, 'read', operator_username,  time);


        return MedicalInfoJSON.toString();
    }
    @Transaction()
    public async patientQueryMedicalInfo(ctx: Context, id: string): Promise<string> {

        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }

        //do not create usage record

        return MedicalInfoJSON.toString();
    }




    private CreateCase(case_id: string,testresult: string, diagnosis: string, treatment: string): Case {
        const new_examination : Examination = {
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment: treatment
        };
        const Case_object : Case = {
            docType:'case',
            Case_ID: case_id,
            Examinations :[new_examination],
        };
        return Case_object;
    }


    // UpdateMedicalInfo updates an existing MedicalInfo in the world state with provided parameters.
    // type of updates: 
    //      add a new case
    @Transaction()
    public async AddCase(ctx: Context,case_id:string ,info_id: string, test_result: string, diagnosis: string, treatment: string, operator_username: string, patient_username: string,record_id: string, time: string): Promise<void> {


        const isAuthorized = new PatientContract().IsAuthorized(ctx, patient_username, operator_username);

        if (!isAuthorized) {
            throw Error('Permission Denied');
        }
        const current_info_Uint8 = await ctx.stub.getState(info_id);
        const current_info_jsonstring = Buffer.from(current_info_Uint8).toString('utf8');
        let  infoObject = JSON.parse(current_info_jsonstring);
        
        let new_case = new CaseContract().CreateCase(case_id, test_result,diagnosis,treatment);
        infoObject.Cases.push(new_case);

        await ctx.stub.putState(info_id, Buffer.from(stringify(sortKeysRecursive(infoObject))));

        // create usage record
        let recordContract = new UsageRecordContract();
        await recordContract.CreateRecord(ctx,record_id ,new_case.Case_ID, info_id, 'write', operator_username,time);
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    }

    @Transaction()
    public async AppendCase(ctx: Context, info_id: string, case_id: string, test_result: string, diagnosis: string, treatment: string,  operator_username: string, patient_username: string,record_id: string, time: string): Promise<void> {

        // check if the operator has right to append to case
        const isAuthorized = new PatientContract().IsAuthorized(ctx, patient_username, operator_username);

        if (!isAuthorized) {
            throw Error('Permission Denied');
        }
        
        // Call contract update case to add the examination to the case
        await new CaseContract().UpdateCase(ctx, info_id,case_id,test_result, diagnosis, treatment);
   

        // create usage record
        let recordContract = new UsageRecordContract();
        await recordContract.CreateRecord(ctx,record_id ,case_id, info_id, 'write', operator_username,time);
         }


    


    // // MedicalInfoExists returns true when MedicalInfo with given ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async MedicalInfoExists(ctx: Context, id: string): Promise<boolean> {
        const MedicalInfoJSON = await ctx.stub.getState(id);
        return MedicalInfoJSON && MedicalInfoJSON.length > 0;
    }

    // GetAllMedicalInfos returns all MedicalInfos found in the world state.
    @Transaction(false)
    @Returns('string')
    public async GetAll(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
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


    @Transaction(false)
    @Returns('string')
    public async QueryByKeyWord(ctx: Context, keywords: string): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.


        // first query all the medical record

        let selector = {
            selector:  {
                docType:  { "$eq": 'medical_info' }
            }
        };

        let iterator = await ctx.stub.getQueryResult(JSON.stringify(selector));
        
        // const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;

            let keywords_array = JSON.parse(keywords);
            // check if the medical info string contains keyword
            let flag = false;
            let ret = keywords_array.filter((keyword) => strValue.includes(keyword));
            if (ret.length == keywords_array.length) flag = true;

            if (flag) {
                try {
                    MedicalInfo = JSON.parse(strValue);
                } catch (err) {
                    console.log(err);
                    MedicalInfo = strValue;
                }
                allResults.push(MedicalInfo);
            }
            
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

}
