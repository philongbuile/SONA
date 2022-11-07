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
exports.PatientContract = void 0;
/*
 * SPDX-License-Identifier: Apache-2.0
 */
// Deterministic JSON.stringify()
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
const MedicalInfo_Contract_1 = require("./MedicalInfo_Contract");
const UsageRecordContract_1 = require("./UsageRecordContract");
let PatientContract = class PatientContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        console.log('calling init function of patient contract');
        // first creat the medicalInfo for that patient 
        // then add it to the patient info
        // const medical1 = await new MedicalInfoContract().CreateMedicalInfo(ctx , 'patient1000');
        // const medical2 = await new MedicalInfoContract().CreateMedicalInfo(ctx, 'patient1001');
        const patients = [
            {
                FullName: 'Cam Tu',
                Username: 'camtu123',
                Phone: '0095',
                Address: '43/2 abc street',
                DoB: '11/2',
                Gender: 'female',
                MedicalInfo_ID: 'medical1',
                AuthorizedDoctors: ['Doctor1', 'Doctor2'],
            },
            {
                FullName: 'Bui Le Phi Long',
                Username: 'philong123',
                Phone: '0969120322',
                Address: '12 xyz Street',
                DoB: '12/03/2001',
                Gender: 'male',
                MedicalInfo_ID: 'medical2',
                AuthorizedDoctors: ['Doctor1'],
            },
            {
                FullName: 'Le Duc Minh',
                Username: 'minhleduc0210',
                Phone: '0706208723',
                Address: '2018 2019 OG Street',
                DoB: '02/10/2001',
                Gender: 'male',
                MedicalInfo_ID: 'medical2',
                AuthorizedDoctors: ['Doctor1'],
            }
        ];
        for (const patient of patients) {
            patient.docType = 'patient';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(patient.Username, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(patient))));
            console.info(`Patient ${patient.Username} initialized`);
        }
    }
    // CreateAsset issues a new asset to the world state with given details.
    async CreatePatient(ctx, fullname, username, medinfo_id, phone, address, dob, gender, operator_username) {
        const exists = await this.AssetExists(ctx, username);
        if (exists) {
            throw new Error(`The asset ${username} already exists`);
        }
        // create medicalinfo for this patient
        await new MedicalInfo_Contract_1.MedicalInfoContract().CreateMedicalInfo(ctx, medinfo_id);
        const patient = {
            docType: 'patient',
            FullName: fullname,
            Username: username,
            Phone: phone,
            Address: address,
            DoB: dob,
            Gender: gender,
            MedicalInfo: medinfo_id,
            AuthorizedDoctors: [operator_username]
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(username, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(patient))));
        // return JSON.stringify(patient);
    }
    // ReadAsset returns the asset stored in the world state with given id.
    // Read patient record given patient name
    async ReadPatient(ctx, username) {
        const assetJSON = await ctx.stub.getState(username); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${username} does not exist`);
        }
        return assetJSON.toString();
    }
    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, username) {
        console.log('AssetExists::PatientContract running');
        const assetJSON = await ctx.stub.getState(username);
        return assetJSON && assetJSON.length > 0;
    }
    async IsAuthorized(ctx, patient_username, doctor_username) {
        console.log('isAuthorized::PatientContract running');
        const exists = await this.AssetExists(ctx, doctor_username);
        if (!exists) {
            throw new Error(`The asset ${doctor_username} does not exist`);
        }
        const assetString = await this.ReadPatient(ctx, patient_username);
        const asset = JSON.parse(assetString);
        // check if the doctor exist in the authorized doctor array
        const doctors = asset.AuthorizedDoctors;
        const doctor_authorized = doctors.some(name => {
            if (name === doctor_username) {
                return true;
            }
        });
        return doctor_authorized;
    }
    // doctor call this funciton
    // return a patient from world state provided patient_username and doctor_username
    async doctorQuery(ctx, patient_username, doctor_username, record_id, time) {
        console.log('doctorQuery::PatientContract running');
        const isAuthorized = await this.IsAuthorized(ctx, patient_username, doctor_username);
        if (!isAuthorized) {
            throw new Error(`permission denied to query ${patient_username} info`);
        }
        const patient = await this.patientQuery(ctx, patient_username);
        const patient_obj = JSON.parse(patient);
        // create usage record
        let recordContract = new UsageRecordContract_1.UsageRecordContract();
        await recordContract.CreateRecord(ctx, record_id, undefined, patient_obj.MedicalInfo_ID, 'read patient\'s data', doctor_username, time);
        return patient_obj;
    }
    async patientQuery(ctx, username) {
        const assetJSON = await ctx.stub.getState(username); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${username} does not exist`);
        }
        return assetJSON.toString();
    }
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
    async AuthorizeOperator(ctx, patient_username, operator_username) {
        // check if operator exists
        let isExists = await this.AssetExists(ctx, operator_username);
        if (!isExists) {
            throw Error(`username ${operator_username} does not exist`);
        }
        // retriev patient info2
        let patient = await this.patientQuery(ctx, patient_username);
        let patient_obj = JSON.parse(patient);
        // check if the doctor is already authorized
        const doctors = patient_obj.AuthorizedDoctors;
        const doctor_authorized_exists = doctors.some(name => {
            if (name === operator_username) {
                throw new Error(`The doctor ${operator_username} already authorized`);
            }
        });
        //
        // add operator username to authorizedDoctorss
        patient_obj.AuthorizedDoctors.push(operator_username);
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(patient_username, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(patient_obj))));
        // return JSON.stringify(patient);
    }
    async RevokeOperator(ctx, patient_username, operator_username) {
        // check if operator exists
        let isExists = await this.AssetExists(ctx, operator_username);
        if (!isExists) {
            throw Error(`username ${operator_username} does not exist`);
        }
        // retriev patient info
        let patient = await this.ReadPatient(ctx, patient_username);
        let patient_obj = JSON.parse(patient);
        // remove operator username to authorizedDoctorss
        for (var i = 0; i < patient_obj.AuthorizedDoctors.length; i++) {
            if (patient_obj.AuthorizedDoctors[i] === operator_username) {
                patient_obj.AuthorizedDoctors.splice(i, 1);
            }
        }
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(patient_username, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(patient_obj))));
        // return JSON.stringify(patient);
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "CreatePatient", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "ReadPatient", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "AssetExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "IsAuthorized", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "doctorQuery", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "patientQuery", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "GetAll", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "AuthorizeOperator", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PatientContract.prototype, "RevokeOperator", null);
PatientContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'AssetTransfer', description: 'Smart contract for trading assets' })
], PatientContract);
exports.PatientContract = PatientContract;
//# sourceMappingURL=PatientContract.js.map