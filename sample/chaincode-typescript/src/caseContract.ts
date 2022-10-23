/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Case, UsageRecord, Patient, Examination} from './asset';
import {PatientContract} from './PatientContract';
import { v4  as uuidv4} from 'uuid';
import {UsageRecordContract} from './UsageRecordContract'

@Info({title: 'CaseContract', description: 'Smart contract for Medical Case query'})
export class CaseContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {

        const cases: Case[] = [
            {
                Case_ID: 'case1',
                Examinations: [
                    {
                        TestResult : 'Success',
                        Diagnosis: 'Allergic Rhinitis',
                        Treatment: 'Use medicine'

                    }
                ]
            },
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
                ],
            },
            {
                Case_ID: 'case3',
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
                ],
            },
           
        ];


        for (const med_case of cases) {
            med_case.docType = 'case';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(med_case.Case_ID, Buffer.from(stringify(sortKeysRecursive(med_case))));
            console.info(`Medical Case of Patient ${med_case.Case_ID} is initialized`);
        }


    }

    // called by Medical Operator
    // CreateCase issues a new medical case of the patient, to the Medical Info with given details.
    // return a Case object
    @Transaction()
    public async CreateCase(ctx: Context, testresult: string, diagnosis: string, treatment: string): Promise<Case> {
        

        // // get patient from the world state
        // const patientJSON = await ctx.stub.getState(patient_username);
        // // convert Uint8Array to string
        // // const jsonString = Buffer.from(patientJSON).toString('utf8');
        // // // // convert json to object
        // // const patientObject = JSON.parse(jsonString);
        // const patientContract = new PatientContract();
        // const isAuthorized = await patientContract.IsAuthorized(ctx, patient_username, operator_username);

        // if (!isAuthorized) {
        //     throw new Error(`permission denied to create case for ${patient_username} cases`);
        // }
        // if authorized
        const new_examination : Examination = {
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment: treatment
        };
        const case_id = uuidv4();
        const Case_object : Case = {
            docType:'case',
            Case_ID: case_id,
            Examinations :[new_examination],
        };

        // patientObject.MedicalInfo.Cases.add(Case_object);
        

        // put this on the World state for patient and medical info
        
        // for patient
        // await ctx.stub.putState(patient_username, Buffer.from(stringify(sortKeysRecursive(patientObject))));
        // // for medical info
        // await ctx.stub.putState(patientObject.MedicalInfo.ID,Buffer.from(stringify(sortKeysRecursive(patientObject.MedicalInfo))))

        // const usageRecordContract = new UsageRecordContract();
        // await usageRecordContract.CreateRecord(ctx,patient_username,case_id,patientObject.MedicalInfo.ID,'Create Case','doctor',operator_username);

        // const id = uuid();
        // const new_case = {
        //     Case_ID: id,
        //     Examinations: [examination]     
        // };
        ctx.stub.putState(case_id, Buffer.from(stringify(sortKeysRecursive(Case_object))));
        return Case_object;
    }

    // Readcase returns string of a Case stored in MedicalInfo of one patient
    // Read patient medical case given patient id
    // @Transaction(false)
    // public async ReadCase(ctx: Context, case_id: string, patient_username: string, operator_username: string,operator_role: string): Promise<string> {
    //     const assetJSON = await ctx.stub.getState(patient_username); // get the asset from chaincode state
    //     if (!assetJSON || assetJSON.length === 0) {
    //         throw new Error(`The patient ${patient_username} does not exist`);
    //     }
    //     // convert Uint8Array to json
    //     const jsonString = Buffer.from(assetJSON).toString('utf8')
        
    //     // // convert json to object
    //     const patientObject = JSON.parse(jsonString);
    //     const medicalinfoObject=  patientObject.MedicalInfo;
        
    //     const usageRecordContract = new UsageRecordContract();
    //     await usageRecordContract.CreateRecord(ctx,patient_username,case_id,medicalinfoObject.ID,'read case ',operator_role,operator_username);
        
    //     // // convert array object to JSON  string
    //     const casesJSON = medicalinfoObject.Case.find(c => c.Case_ID == case_id);
    //     return casesJSON.toString();
    // }

    @Transaction()
    public async UpdateCase(ctx: Context, case_id: string, testresult: string,diagnosis: string,treatment: string): Promise<void> {
        
        // check if this case already exists
        const exists = await this.CaseExists(ctx, case_id);
        if (!exists) {
            throw new Error(`The case ${case_id} does not exist`);
        }

        // // get patient from the world state
        // const patientJSON = await ctx.stub.getState(patient_username);
        // // convert Uint8Array to string
        // const jsonString = Buffer.from(patientJSON).toString('utf8');
        // // // convert json to object
        // const patientObject = JSON.parse(jsonString);
        // const patientContract = new PatientContract();
        // const isAuthorized = await patientContract.IsAuthorized(ctx, patient_username, operator_username);

        // if (!isAuthorized) {
        //     throw new Error(`permission denied to update  for ${patient_username} cases`);
        // }
        // // if authorized
        const Examination_object : Examination = {
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment: treatment
        };

        // get current case
        const assetJSON = await ctx.stub.getState(case_id); // get the asset from chaincode state
        const current_case = await ctx.stub.getState(case_id).toString();
        const current_case_obj = JSON.parse(current_case);
        current_case_obj.push(Examination_object);

        await ctx.stub.putState(current_case_obj.Case_ID,Buffer.from(stringify(sortKeysRecursive(current_case_obj))))

        // const jsonString = Buffer.from(assetJSON).toString('utf8')
        

        // patientObject.MedicalInfo.Cases.Examination.add(Examination_object);
        
        // let MedicalInfo_Object = patientObject.MedicalInfo;
        // // put this on the World state for patient and medical info
        
        // // for patient
        // await ctx.stub.putState(patient_username, Buffer.from(stringify(sortKeysRecursive(patientObject))));
        // // for medical info
        // await ctx.stub.putState(patientObject.MedicalInfo.ID,Buffer.from(stringify(sortKeysRecursive(patientObject.MedicalInfo))))
        // const usagerecordContract = new UsageRecordContract();
        // await usagerecordContract.CreateRecord(ctx,patient_username,case_id,MedicalInfo_Object.ID,'update case','doctor',operator_username);
    }


    


    

    // CaseExists returns true when Case with given Case_ID exists in world state.
    @Transaction(false)
    @Returns('boolean')
    public async CaseExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }


}
