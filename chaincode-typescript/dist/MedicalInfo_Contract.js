"use strict";
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
exports.MedicalInfoContract = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
const caseUtils_1 = require("./caseUtils");
const PatientContract_1 = require("./PatientContract");
const UsageRecordContract_1 = require("./UsageRecordContract");
let MedicalInfoContract = class MedicalInfoContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        const medical_infos = [
            {
                ID: 'medical1',
                Cases: [
                    {
                        Case_ID: 'case1',
                        Examinations: [
                            {
                                TestResult: 'Success',
                                Diagnosis: 'Allergic Rhinitis',
                                Treatment: 'Use medicine'
                            }
                        ]
                    }
                ]
            },
            {
                ID: 'medical2',
                Cases: [
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
        console.log('calling init function of medical info');
        for (const MedicalInfo of medical_infos) {
            MedicalInfo.docType = 'medical_info';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(MedicalInfo.ID, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(MedicalInfo))));
            console.info(`MedicalInfo ${MedicalInfo.ID} initialized`);
        }
    }
    // CreateMedicalInfo issues a new MedicalInfo to the world state with given details.
    // patient_username: needed to check whether operator has right to create 
    // medical info for that patient.
    async CreateMedicalInfo(ctx, id) {
        // generate uuid for medical record
        // const id = uuid();
        const exists = await this.MedicalInfoExists(ctx, id);
        if (exists) {
            throw new Error(`The MedicalInfo ${id} already exists`);
        }
        const medicalInfo = {
            ID: id,
            Cases: [],
            docType: 'medical_info',
        };
        // add this medical info to patient object
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(medicalInfo))));
        return medicalInfo;
    }
    // ReadMedicalInfo returns the MedicalInfo stored in the world state with given id.
    async ReadMedicalInfo(ctx, id) {
        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }
        return MedicalInfoJSON.toString();
    }
    async operatorQueryMedicalInfo(ctx, id, operator_username, record_id, time) {
        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }
        // create usage record
        let recordContract = new UsageRecordContract_1.UsageRecordContract();
        await recordContract.CreateRecord(ctx, record_id, undefined, id, 'read', operator_username, time);
        return MedicalInfoJSON.toString();
    }
    async patientQueryMedicalInfo(ctx, id) {
        const MedicalInfoJSON = await ctx.stub.getState(id); // get the MedicalInfo from chaincode state
        if (!MedicalInfoJSON || MedicalInfoJSON.length === 0) {
            throw new Error(`The MedicalInfo ${id} does not exist`);
        }
        //do not create usage record
        return MedicalInfoJSON.toString();
    }
    CreateCase(case_id, testresult, diagnosis, treatment) {
        const new_examination = {
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment: treatment
        };
        const Case_object = {
            docType: 'case',
            Case_ID: case_id,
            Examinations: [new_examination],
        };
        return Case_object;
    }
    // UpdateMedicalInfo updates an existing MedicalInfo in the world state with provided parameters.
    // type of updates: 
    //      add a new case
    async AddCase(ctx, case_id, info_id, test_result, diagnosis, treatment, operator_username, patient_username, record_id, time) {
        const isAuthorized = await new PatientContract_1.PatientContract().IsAuthorized(ctx, patient_username, operator_username);
        if (!isAuthorized) {
            throw Error('Permission Denied');
        }
        const current_info_Uint8 = await ctx.stub.getState(info_id);
        const current_info_jsonstring = Buffer.from(current_info_Uint8).toString('utf8');
        let infoObject = JSON.parse(current_info_jsonstring);
        let new_case = new caseUtils_1.CaseContract().CreateCase(case_id, test_result, diagnosis, treatment);
        infoObject.Cases.push(new_case);
        await ctx.stub.putState(info_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(infoObject))));
        // create usage record
        let recordContract = new UsageRecordContract_1.UsageRecordContract();
        await recordContract.CreateRecord(ctx, record_id, new_case.Case_ID, info_id, 'write', operator_username, time);
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    }
    async AppendCase(ctx, info_id, case_id, test_result, diagnosis, treatment, operator_username, patient_username, record_id, time) {
        // check if the operator has right to append to case
        const isAuthorized = await new PatientContract_1.PatientContract().IsAuthorized(ctx, patient_username, operator_username);
        if (!isAuthorized) {
            throw Error('Permission Denied');
        }
        // Call contract update case to add the examination to the case
        await new caseUtils_1.CaseContract().UpdateCase(ctx, info_id, case_id, test_result, diagnosis, treatment);
        // create usage record
        let recordContract = new UsageRecordContract_1.UsageRecordContract();
        await recordContract.CreateRecord(ctx, record_id, case_id, info_id, 'write', operator_username, time);
    }
    // // MedicalInfoExists returns true when MedicalInfo with given ID exists in world state.
    async MedicalInfoExists(ctx, id) {
        const MedicalInfoJSON = await ctx.stub.getState(id);
        return MedicalInfoJSON && MedicalInfoJSON.length > 0;
    }
    // GetAllMedicalInfos returns all MedicalInfos found in the world state.
    async GetAll(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
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
    async QueryByKeyWord(ctx, keywords) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all MedicalInfos in the chaincode namespace.
        // first query all the medical record
        let selector = {
            selector: {
                docType: { "$eq": 'medical_info' }
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
            if (ret.length == keywords_array.length)
                flag = true;
            if (flag) {
                try {
                    MedicalInfo = JSON.parse(strValue);
                }
                catch (err) {
                    console.log(err);
                    MedicalInfo = strValue;
                }
                allResults.push(MedicalInfo);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)()
    // need modify : add create record
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "CreateMedicalInfo", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "ReadMedicalInfo", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "operatorQueryMedicalInfo", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "patientQueryMedicalInfo", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "AddCase", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "AppendCase", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "MedicalInfoExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "GetAll", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], MedicalInfoContract.prototype, "QueryByKeyWord", null);
MedicalInfoContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'MedicalInfo', description: 'Smart contract for trading MedicalInfos' })
], MedicalInfoContract);
exports.MedicalInfoContract = MedicalInfoContract;
//# sourceMappingURL=MedicalInfo_Contract.js.map