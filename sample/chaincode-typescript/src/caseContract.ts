/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Case, UsageRecord, Patient, Examination} from './asset';
import { MedicalInfoContract } from './MedicalInfo_Contract';
import {PatientContract} from './PatientContract';

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
            // ctx.stub.getQueryResult()
        }


    }

    // called by Medical Operator
    // CreateCase issues a new medical case of the patient, to the Medical Info with given details.
    // return a Case object
    @Transaction()
    public async CreateCase(ctx: Context,case_id: string ,testresult: string, diagnosis: string, treatment: string): Promise<Case> {
        

        
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
        await ctx.stub.putState(case_id, Buffer.from(stringify(sortKeysRecursive(Case_object))));
        return Case_object;
    }


    // used by MedicalInfoContract()
    // Usage: put an Examnination to the corresponding case of corresponding Medical Info
    @Transaction()
    public async UpdateCase(ctx: Context, medicalinfo_id: string,case_id: string, testresult: string,diagnosis: string,treatment: string): Promise<void> {
        
        
        const jsonString = await new MedicalInfoContract().patientQueryMedicalInfo(ctx,medicalinfo_id);
        // // convert json string to object
        const medicalinfoObject = JSON.parse(jsonString);

        // check if this case already exists
        let i =0;
        let exists =0;
        while(i<medicalinfoObject.Cases.length) {
            if(medicalinfoObject.Cases[i].Case_ID == case_id){
                exists =1;
            }
            if(exists==0 && medicalinfoObject.Cases.length==1){
                throw new Error(`The medical info is not initialized yet ${jsonString} `);
            }
            i++;
        }
        if (exists==0) {
                throw new Error(`The case ${case_id} does not exist`);
            }


        const Examination_object : Examination = {
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment: treatment
        };


        // find the index of current case id
        const index =  medicalinfoObject.Cases.findIndex((element) => element.Case_ID == case_id);
       // push the Examination to that Case
        medicalinfoObject.Cases[index].Examinations.push(Examination_object);
        // change world state
        await ctx.stub.putState(medicalinfo_id,Buffer.from(stringify(sortKeysRecursive(medicalinfoObject))))  
    }


    





}
