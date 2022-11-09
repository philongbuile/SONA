"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseContract = void 0;
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
const MedicalInfo_Contract_1 = require("./MedicalInfo_Contract");
class CaseContract {
    // called by Medical Operator
    // CreateCase issues a new medical case of the patient, to the Medical Info with given details.
    // return a Case object
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
    // used by MedicalInfoContract()
    // Usage: put an Examnination to the corresponding case of corresponding Medical Info
    async UpdateCase(ctx, medicalinfo_id, case_id, testresult, diagnosis, treatment) {
        const jsonString = await new MedicalInfo_Contract_1.MedicalInfoContract().patientQueryMedicalInfo(ctx, medicalinfo_id);
        // // convert json string to object
        const medicalinfoObject = JSON.parse(jsonString);
        // check if this case already exists
        let i = 0;
        let exists = 0;
        while (i < medicalinfoObject.Cases.length) {
            if (medicalinfoObject.Cases[i].Case_ID == case_id) {
                exists = 1;
            }
            if (exists == 0 && medicalinfoObject.Cases.length == 1) {
                throw new Error(`The medical info is not initialized yet ${jsonString} `);
            }
            i++;
        }
        if (exists == 0) {
            throw new Error(`The case ${case_id} does not exist`);
        }
        const Examination_object = {
            TestResult: testresult,
            Diagnosis: diagnosis,
            Treatment: treatment
        };
        // find the index of current case id
        const index = medicalinfoObject.Cases.findIndex((element) => element.Case_ID == case_id);
        // push the Examination to that Case
        medicalinfoObject.Cases[index].Examinations.push(Examination_object);
        // change world state
        await ctx.stub.putState(medicalinfo_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(medicalinfoObject))));
    }
}
exports.CaseContract = CaseContract;
//# sourceMappingURL=caseUtils.js.map