import { Context, Contract } from 'fabric-contract-api';
export declare class UsageRecordContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreateRecord(ctx: Context, record_id: string, case_id: string, medicalinfo_id: string, operation: string, operator_username: string, time: string): Promise<void>;
    GetAll(ctx: Context): Promise<string>;
    QueryRecords(ctx: Context, medical_info_id: string): Promise<string>;
}
