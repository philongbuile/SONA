/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
import {Context, Contract, Info, Returns, Transaction} from 'fabric-contract-api';
import stringify from 'json-stringify-deterministic';
import sortKeysRecursive from 'sort-keys-recursive';
import {Case, MedicalInfo} from './asset';
import {v4 as uuid} from 'uuid';


@Info({title: 'MedicalInfoTransfer', description: 'Smart contract for trading MedicalInfos'})
export class MedicalInfoTransferContract extends Contract {

    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        
        const medical_infos: MedicalInfo[] = [];
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
    @Transaction()
    public async CreateMedicalInfo(ctx: Context,cases: Case[]): Promise<void> {


        // generate uuid for medical record
        const id = uuid();

        const exists = await this.MedicalInfoExists(ctx, id);
        if (exists) {
            throw new Error(`The MedicalInfo ${id} already exists`);
        }
        const MedicalInfo = {
            ID: id,
            Cases: cases
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(MedicalInfo))));
    }

    // ReadMedicalInfo returns the MedicalInfo stored in the world state with given id.
    @Transaction(false)
    public async ReadMedicalInfo(ctx: Context, id: string): Promise<string> {
        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }
        return MedicalInfoJSON.toString();
    }

    // UpdateMedicalInfo updates an existing MedicalInfo in the world state with provided parameters.
    // type of updates: 
    //      add a new case
    @Transaction()
    public async UpdateMedicalInfo(ctx: Context, id: string, new_case: Case): Promise<void> {

        // get the current cases array
        // add new case to it
        const current_cases = JSON.parse(await this.ReadMedicalInfo(ctx, id));

        const new_cases = current_cases.push(new_case);


        // overwriting original MedicalInfo with new MedicalInfo
        const updatedMedicalInfo = {
            docType: 'medical_info',
            ID: id,
            Cases: new_cases
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedMedicalInfo))));
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
