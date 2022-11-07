"use strict";
/*
  SPDX-License-Identifier: Apache-2.0
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = exports.UsageRecord = exports.Operator = exports.MedicalInfo = exports.Case = exports.Examination = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let Examination = class Examination {
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Examination.prototype, "docType", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Examination.prototype, "TestResult", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Examination.prototype, "Diagnosis", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Examination.prototype, "Treatment", void 0);
Examination = __decorate([
    (0, fabric_contract_api_1.Object)()
], Examination);
exports.Examination = Examination;
let Case = class Case {
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Case.prototype, "docType", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Case.prototype, "Case_ID", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Array)
], Case.prototype, "Examinations", void 0);
Case = __decorate([
    (0, fabric_contract_api_1.Object)()
], Case);
exports.Case = Case;
let MedicalInfo = class MedicalInfo {
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], MedicalInfo.prototype, "docType", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], MedicalInfo.prototype, "ID", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Array)
], MedicalInfo.prototype, "Cases", void 0);
MedicalInfo = __decorate([
    (0, fabric_contract_api_1.Object)()
], MedicalInfo);
exports.MedicalInfo = MedicalInfo;
let Operator = class Operator {
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Operator.prototype, "docType", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Operator.prototype, "Username", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Operator.prototype, "Role", void 0);
Operator = __decorate([
    (0, fabric_contract_api_1.Object)()
], Operator);
exports.Operator = Operator;
let UsageRecord = class UsageRecord {
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "docType", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "Case_ID", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "MedicalInfo_ID", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "Record_ID", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "Operation", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "Roles", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "OperatorName", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], UsageRecord.prototype, "Time", void 0);
UsageRecord = __decorate([
    (0, fabric_contract_api_1.Object)()
], UsageRecord);
exports.UsageRecord = UsageRecord;
let Patient = class Patient {
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "docType", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "FullName", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "Username", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "Phone", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "Address", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "DoB", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "Gender", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], Patient.prototype, "MedicalInfo_ID", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Array)
], Patient.prototype, "AuthorizedDoctors", void 0);
Patient = __decorate([
    (0, fabric_contract_api_1.Object)()
], Patient);
exports.Patient = Patient;
//# sourceMappingURL=asset.js.map