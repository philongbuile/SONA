/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {PatientContract} from './PatientContract';
import {CaseContract} from './caseUtils'
import {MedicalInfoContract} from './MedicalInfo_Contract'
import {OperatorContract} from './MedicalOperator_Contract'
import { UsageRecordContract } from './UsageRecordContract';
import {SecuredPatientContract} from './secured_patient_contract';



export {PatientContract} from './PatientContract';
export {SecuredPatientContract} from './secured_patient_contract';

export {MedicalInfoContract} from './MedicalInfo_Contract'
export {OperatorContract} from './MedicalOperator_Contract'
export { UsageRecordContract } from './UsageRecordContract';

// export {UsageRecordContract} from './UsageRecordContract'




export const contracts: any[] = [SecuredPatientContract, PatientContract, MedicalInfoContract, OperatorContract, UsageRecordContract];
