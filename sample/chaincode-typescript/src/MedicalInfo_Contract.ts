/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Case, Examination, MedicalInfo} from './asset';
import {v4 as uuid} from 'uuid';
import { CaseContract } from './caseContract';
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
                Cases: [
                    {
                        Case_ID: 'case2',
                    Examinations: [
                    {
                        TestResult: '',
                        Diagnosis: '',
                        Treatment: '',

                    },
                    {
                        TestResult: '',
                        Diagnosis: '',
                        Treatment: '',

                    }
                ]}]
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
    public async CreateMedicalInfo(ctx: Context,cases: Case[]): Promise<MedicalInfo> {

        // generate uuid for medical record
        const id = uuid();

        const exists = await this.MedicalInfoExists(ctx, id);
        if (exists) {
            throw new Error(`The MedicalInfo ${id} already exists`);
        }
        const medicalInfo: MedicalInfo  = {
            ID: id,
            Cases: cases
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
    private async QueryMedicalInfo(ctx: Context, id: string, operator_username: string): Promise<string> {

        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }

         // create usage record
         let recordContract = new UsageRecordContract();
         await recordContract.CreateRecord(ctx, undefined , id, 'read', operator_username);

        return MedicalInfoJSON.toString();
    }


    // UpdateMedicalInfo updates an existing MedicalInfo in the world state with provided parameters.
    // type of updates: 
    //      add a new case
    @Transaction()
    public async AddCase(ctx: Context, id: string, test_result: string, diagnosis: string, treatment: string, operator_username: string, patient_username: string): Promise<void> {


        const isAuthorized = new PatientContract().IsAuthorized(ctx, patient_username, operator_username);

        if (!isAuthorized) {
            throw Error('Permission Denied');
        }
        // get the current cases array
        // add new case to it
        const current_info = JSON.parse(await this.ReadMedicalInfo(ctx, id));

        const caseContract = new CaseContract();
        const new_case = await caseContract.CreateCase(ctx, test_result, diagnosis, treatment);
        const new_info = current_info.Cases.push(new_case);


        // // overwriting original MedicalInfo with new MedicalInfo

        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(new_info))));

        // create usage record
        let recordContract = new UsageRecordContract();
        await recordContract.CreateRecord(ctx, new_case.Case_ID, id, 'write', operator_username);

        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    }

    @Transaction()
    public async AppendCase(ctx: Context, info_id: string, case_id: string, test_result: string, diagnosis: string, treatment: string,  operator_username: string, patient_username: string): Promise<void> {

        // check if the operator has right to append to case
        const isAuthorized = new PatientContract().IsAuthorized(ctx, patient_username, operator_username);

        if (!isAuthorized) {
            throw Error('Permission Denied');
        }


        // use CaseContract to call function updateCase
        const caseContract = new CaseContract();
        const new_case = await caseContract.UpdateCase(ctx,case_id, test_result, diagnosis, treatment);

        // create usage record
        let recordContract = new UsageRecordContract();
        await recordContract.CreateRecord(ctx, case_id, info_id, 'write', operator_username);

    }


    // MedicalInfoExists returns true when MedicalInfo with given ID exists in world state.
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
    public async QueryByKeyWord(ctx: Context, keywords: string[]): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;

            // check if the medical info string contains keyword
            const keyword = keywords.join();
            const keywordExists = strValue.toLowerCase().includes(keyword.toLowerCase());

            if (keywordExists) {
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
