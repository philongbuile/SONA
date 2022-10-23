/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {PatientContract} from './PatientContract';
import {CaseContract} from './caseContract'
import {MedicalInfoContract} from './MedicalInfo_Contract'




export {PatientContract} from './PatientContract';
export {CaseContract} from './caseContract';
export {MedicalInfoContract} from './MedicalInfo_Contract'


// import { UsageRecordContract } from './UsageRecordContract';
import {MedicalOperatorContract} from './MedicalOperator_Contract';

// export {UsageRecordContract} from './UsageRecordContract'




export const contracts: any[] = [CaseContract, PatientContract, MedicalInfoContract];
