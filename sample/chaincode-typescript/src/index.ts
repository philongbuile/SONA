/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {PatientContract} from './PatientContract';
import {CaseContract} from './caseContract'

export {PatientContract as AssetTransferContract} from './PatientContract';
export {CaseContract} from './caseContract'

export const contracts: any[] = [PatientContract, CaseContract ];
