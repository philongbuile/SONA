import { Context, Contract } from 'fabric-contract-api';
export declare class PatientContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreatePatient(ctx: Context, fullname: string, username: string, medinfo_id: string, phone: string, address: string, dob: string, gender: string, operator_username: string): Promise<void>;
    private ReadPatient;
    private AssetExists;
    IsAuthorized(ctx: Context, patient_username: string, doctor_username: string): Promise<boolean>;
    doctorQuery(ctx: Context, patient_username: string, doctor_username: string, record_id: string, time: string): Promise<string>;
    patientQuery(ctx: Context, username: string): Promise<string>;
    GetAll(ctx: Context): Promise<string>;
    AuthorizeOperator(ctx: Context, patient_username: string, operator_username: string): Promise<void>;
    RevokeOperator(ctx: Context, patient_username: string, operator_username: string): Promise<void>;
}
