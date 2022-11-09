import { Context } from 'fabric-contract-api';
import { Case } from './asset';
export declare class CaseContract {
    CreateCase(case_id: string, testresult: string, diagnosis: string, treatment: string): Case;
    UpdateCase(ctx: Context, medicalinfo_id: string, case_id: string, testresult: string, diagnosis: string, treatment: string): Promise<void>;
}
