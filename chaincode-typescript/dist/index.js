"use strict";
/*
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.contracts = exports.UsageRecordContract = exports.OperatorContract = exports.MedicalInfoContract = exports.PatientContract = void 0;
const PatientContract_1 = require("./PatientContract");
const MedicalInfo_Contract_1 = require("./MedicalInfo_Contract");
const MedicalOperator_Contract_1 = require("./MedicalOperator_Contract");
const UsageRecordContract_1 = require("./UsageRecordContract");
var PatientContract_2 = require("./PatientContract");
Object.defineProperty(exports, "PatientContract", { enumerable: true, get: function () { return PatientContract_2.PatientContract; } });
var MedicalInfo_Contract_2 = require("./MedicalInfo_Contract");
Object.defineProperty(exports, "MedicalInfoContract", { enumerable: true, get: function () { return MedicalInfo_Contract_2.MedicalInfoContract; } });
var MedicalOperator_Contract_2 = require("./MedicalOperator_Contract");
Object.defineProperty(exports, "OperatorContract", { enumerable: true, get: function () { return MedicalOperator_Contract_2.OperatorContract; } });
var UsageRecordContract_2 = require("./UsageRecordContract");
Object.defineProperty(exports, "UsageRecordContract", { enumerable: true, get: function () { return UsageRecordContract_2.UsageRecordContract; } });
// export {UsageRecordContract} from './UsageRecordContract'
exports.contracts = [PatientContract_1.PatientContract, MedicalInfo_Contract_1.MedicalInfoContract, MedicalOperator_Contract_1.OperatorContract, UsageRecordContract_1.UsageRecordContract];
//# sourceMappingURL=index.js.map