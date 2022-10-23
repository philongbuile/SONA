/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {AssetTransferContract} from './assetTransfer';
import {CaseContract} from './caseContract'
import { UsageRecordContract } from './UsageRecordContract';

export {AssetTransferContract} from './assetTransfer';
export {CaseContract} from './caseContract';
export {UsageRecordContract} from './UsageRecordContract'


export const contracts: any[] = [AssetTransferContract, CaseContract,UsageRecordContract ];
