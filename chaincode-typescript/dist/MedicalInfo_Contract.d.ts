import { Context, Contract } from 'fabric-contract-api';
import { MedicalInfo } from './asset';
export declare class MedicalInfoContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreateMedicalInfo(ctx: Context, id: string): Promise<MedicalInfo>;
    private ReadMedicalInfo;
    operatorQueryMedicalInfo(ctx: Context, id: string, operator_username: string, record_id: string, time: string): Promise<string>;
    patientQueryMedicalInfo(ctx: Context, id: string): Promise<string>;
    private CreateCase;
    AddCase(ctx: Context, case_id: string, info_id: string, test_result: string, diagnosis: string, treatment: string, operator_username: string, patient_username: string, record_id: string, time: string): Promise<void>;
    AppendCase(ctx: Context, info_id: string, case_id: string, test_result: string, diagnosis: string, treatment: string, operator_username: string, patient_username: string, record_id: string, time: string): Promise<void>;
    MedicalInfoExists(ctx: Context, id: string): Promise<boolean>;
    GetAll(ctx: Context): Promise<string>;
    QueryByKeyWord(ctx: Context, keywords: string): Promise<string>;
}
