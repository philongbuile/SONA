/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
// import { V4MAPPED } from 'dns';
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';

import {UsageRecord, Operator, Case} from './asset';
import {CaseContract} from './caseUtils'

@Info({title: 'MedicalOperatorContract', description: 'Smart contract for Medical Operator'})
export class OperatorContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const operators: Operator[]=[
            {
                Username: 'Doctor1',
                Role: 'doctor'
            },
            {
                Username: 'Researcher1',
                Role: 'researcher'
            }
        ];
        for (const operator of operators) {
            operator.docType = 'operator';
            await ctx.stub.putState(operator.Username, Buffer.from(stringify(sortKeysRecursive(operator))));
            console.info(`Patient ${operator.Username} initialized`);
        }
    }

    @Transaction()
    public async CreateOperator(ctx: Context, username: string, role: string): Promise<void> {


        const operator = {
            docType: 'operator',
            Username: username,
            Role: role
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(username, Buffer.from(stringify(sortKeysRecursive(operator))));
    }


    @Transaction()
    public async QueryOperator(ctx: Context, username: string): Promise<Operator> {
        console.log('QueryOperator::OperatorContract running');
        
        const assetJSON = await ctx.stub.getState(username);
        let isExists =  assetJSON && assetJSON.length > 0;
        
        if (!isExists){
            throw Error('Operator does not exist');
        }
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        
        const operatorStringUInt8 = await ctx.stub.getState(username);
        const operatorString = Buffer.from(operatorStringUInt8).toString('utf8')
       const operatorObject = JSON.parse(operatorString);
       return operatorObject;
    }



    // The function helps doctor create case of a patient
    // Only doctor can create case
    // Authority will be checked in the caseContract.CreateCase()
    // @Transaction()
    // public async CreateCase(ctx: Context, patient_username: string, operator_username: string, testresult: string,diagnosis: string,treatment: string): Promise<void> {
    //     //check if the operator exists
    //     const assetJSON = await ctx.stub.getState(operator_username);
    //     if (!assetJSON || assetJSON.length === 0) {
    //         throw new Error(`The operator ${operator_username} does not exist`);
    //     }
    //     // convert Uint8Array to json
    //     const jsonString = Buffer.from(assetJSON).toString('utf8')
        
    //     // // convert json to object
    //     const operatorObject = JSON.parse(jsonString);
    //     // must check if that Operator is a doctor or not
    //     if(operatorObject.Role.toString().lowerCase() != 'doctor' )
    //         {
    //             throw new Error(`The operator ${operator_username} is not a doctor, hence not allowed to create a case`);
    //         }
    //     const caseContract = new CaseContract();
    //     return await caseContract.CreateCase(ctx,patient_username, operator_username, testresult,diagnosis,treatment);
    // }

    // The function helps doctor to update a case of a patient, provided the case id
    // Authority will be checked in the caseContract.UpdateCase()
    // @Transaction()
    // public async UpdateCase(ctx: Context,  patient_username: string, operator_username: string, case_id: string, testresult: string,diagnosis: string,treatment: string): Promise<void> {
    //     //check if the operator exists
    //     const assetJSON = await ctx.stub.getState(operator_username);
    //     if (!assetJSON || assetJSON.length === 0) {
    //         throw new Error(`The operator ${operator_username} does not exist`);
    //     }
    //     // convert Uint8Array to json
    //     const jsonString = Buffer.from(assetJSON).toString('utf8')
        
    //     // // convert json to object
    //     const operatorObject = JSON.parse(jsonString);
    //     if(operatorObject.Role.toString().lowerCase() != 'doctor' )
    //     {
    //         throw new Error(`The operator ${operator_username} is not a doctor, hence not allowed to update a case`);
    //     }
        
    //     const caseContract = new CaseContract();
    //     return await caseContract.UpdateCase(ctx,patient_username, operator_username,case_id ,testresult,diagnosis,treatment);
    // }

    // The function helps  doctor to read a case of patient, provided case id
     // Authority will be checked in the caseContract.ReadCase()
    //  @Transaction()
    //  public async ReadCase(ctx: Context,  patient_username: string, operator_username: string, case_id: string): Promise<string> {
    //     //check if the operator exists
    //     const assetJSON = await ctx.stub.getState(operator_username);
    //     if (!assetJSON || assetJSON.length === 0) {
    //         throw new Error(`The operator ${operator_username} does not exist`);
    //     }
    //     // convert Uint8Array to json
    //     const jsonString = Buffer.from(assetJSON).toString('utf8')
        
    //     // // convert json to object
    //     const operatorObject = JSON.parse(jsonString);
        
        
    //     const caseContract = new CaseContract();
    //      return await caseContract.ReadCase(ctx,case_id,patient_username, operator_username,operatorObject.Role);
    //  } 


    



    


    

}
