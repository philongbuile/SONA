/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Case,Examination} from './asset';
import { MedicalInfoContract } from './MedicalInfo_Contract';


export class CaseContract {

    // called by Medical Operator
    // CreateCase issues a new medical case of the patient, to the Medical Info with given details.
    // return a Case object
    public CreateCase(case_id: string ,testresult: string, diagnosis: string, treatment: string): Case {
        
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


    // used by MedicalInfoContract()
    // Usage: put an Examnination to the corresponding case of corresponding Medical Info
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
