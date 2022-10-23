/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {AssetTransferContract} from './assetTransfer';
import {CaseContract} from './caseContract'
import { UsageRecordContract } from './UsageRecordContract';
import {MedicalOperatorContract} from './MedicalOperator_Contract';

export {AssetTransferContract} from './assetTransfer';
export {CaseContract} from './caseContract';
export {UsageRecordContract} from './UsageRecordContract'


export const contracts: any[] = [AssetTransferContract, CaseContract,UsageRecordContract,MedicalOperatorContract ];
