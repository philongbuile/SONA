"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsageRecordContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
const MedicalOperator_Contract_1 = require("./MedicalOperator_Contract");
// import {AssetTransferContract} from './assetTransfer'
let UsageRecordContract = class UsageRecordContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        console.log('calling init function of patient contract');
        // first creat the medicalInfo for that patient 
        // then add it to the patient info
        const records = [
            {
                Case_ID: 'case1',
                MedicalInfo_ID: 'medical1',
                Record_ID: 'record1',
                Operation: 'read',
                Roles: 'doctor',
                OperatorName: 'Doctor1',
                Time: '22/03/2010'
            },
            {
                Case_ID: 'case2',
                MedicalInfo_ID: 'medical2',
                Record_ID: 'record2',
                Operation: 'read',
                Roles: 'doctor',
                OperatorName: 'Doctor1',
                Time: '22/03/2010'
            },
            {
                Case_ID: 'case2',
                MedicalInfo_ID: 'medical1',
                Record_ID: 'record',
                Operation: 'read',
                Roles: 'doctor',
                OperatorName: 'Doctor1',
                Time: '22/03/2010'
            }
        ];
        for (const record of records) {
            record.docType = 'UsageRecord';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(record.Record_ID, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(record))));
            console.info(`record ${record.Record_ID} initialized`);
        }
    }
    // temp function for create Record when query Case in Medical Info
    // create an object record then push it in to the Records array corresponding to the patient
    async CreateRecord(ctx, record_id, case_id, medicalinfo_id, operation, operator_username, time) {
        console.log('CreateRecord::UsageRecord running ');
        let operatorContract = new MedicalOperator_Contract_1.OperatorContract();
        const operator = await operatorContract.QueryOperator(ctx, operator_username);
        const record = {
            docType: 'UsageRecord',
            Case_ID: case_id,
            MedicalInfo_ID: medicalinfo_id,
            Record_ID: record_id,
            Operation: operation,
            Roles: operator.Role,
            OperatorName: operator.Username,
            Time: time
        };
        // const patientUint8 = await ctx.stub.getState(patient_username);
        // const patientJSON =  Buffer.from(patientUint8).toString('utf8');
        // // // convert json to object
        // const patientObject = JSON.parse(patientJSON);
        // // push record into the records array
        // patientObject.Records.push(record);
        // // update world state
        return await ctx.stub.putState(record.Record_ID, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(record))));
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
    async GetAll(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        let selector = {
            selector: {
                //MedicalInfo_ID:  { "$eq": "medical1" },
                docType: { "$eq": 'UsageRecord' }
            }
        };
        let iterator = await ctx.stub.getQueryResult(JSON.stringify(selector));
        console.info(JSON.stringify(selector));
        // let iterator = await chaincodeStub.getStateByRange('','');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;
            try {
                MedicalInfo = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                MedicalInfo = strValue;
            }
            allResults.push(MedicalInfo);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    async QueryRecords(ctx, medical_info_id) {
        // query all the usage records of the medical_info specified
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        let selector = {
            selector: {
                MedicalInfo_ID: { "$eq": medical_info_id },
                docType: { "$eq": 'UsageRecord' }
            }
        };
        let iterator = await ctx.stub.getQueryResult(JSON.stringify(selector));
        // let iterator = await chaincodeStub.getStateByRange('','');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let MedicalInfo;
            try {
                MedicalInfo = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                MedicalInfo = strValue;
            }
            allResults.push(MedicalInfo);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
        return '';
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], UsageRecordContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UsageRecordContract.prototype, "CreateRecord", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], UsageRecordContract.prototype, "GetAll", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UsageRecordContract.prototype, "QueryRecords", null);
UsageRecordContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'UsageRecordContract', description: 'Smart contract for creating Usage Record' })
], UsageRecordContract);
exports.UsageRecordContract = UsageRecordContract;
//# sourceMappingURL=UsageRecordContract.js.map