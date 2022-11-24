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
import { MedicalInfoContract } from './MedicalInfo_Contract';
import { UsageRecordContract } from './UsageRecordContract';

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
                Username: 'Doctor2',
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

    @Transaction(false)
    public async QueryMedicalInfo(ctx: Context, id: string, operator_username: string,record_id: string, time: string): Promise<string> {
        const medinfo = await new MedicalInfoContract().QueryMedicalInfo(ctx, id);

         // create usage record
         let recordContract = new UsageRecordContract();
         await recordContract.CreateRecord(ctx, record_id,undefined , id, 'read', operator_username,  time);
        return medinfo;
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


    @Returns('string')
    public async GetAllDoctors(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        let selector = {
            selector:  {
                docType:  { "$eq": 'operators' },
                role: {"$eq": 'doctor'}
            }
        };

        let iterator = await ctx.stub.getQueryResult(JSON.stringify(selector));

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
}
