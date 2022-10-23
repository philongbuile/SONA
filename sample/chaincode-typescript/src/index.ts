/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {PatientContract} from './PatientContract';
import {CaseContract} from './caseContract'
import {MedicalInfoContract} from './MedicalInfo_Contract'
import {OperatorContract} from './MedicalOperator_Contract'
import { UsageRecordContract } from './UsageRecordContract';



export {PatientContract} from './PatientContract';
export {CaseContract} from './caseContract';
export {MedicalInfoContract} from './MedicalInfo_Contract'
export {OperatorContract} from './MedicalOperator_Contract'
export { UsageRecordContract } from './UsageRecordContract';

// export {UsageRecordContract} from './UsageRecordContract'




export const contracts: any[] = [CaseContract, PatientContract, MedicalInfoContract, OperatorContract, UsageRecordContract];
