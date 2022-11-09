export declare class Examination {
    docType?: string;
    TestResult: string;
    Diagnosis: string;
    Treatment: string;
}
export declare class Case {
    docType?: string;
    Case_ID: string;
    Examinations: Examination[];
}
export declare class MedicalInfo {
    docType?: string;
    ID: string;
    Cases: Case[];
}
export declare class Operator {
    docType?: string;
    Username: string;
    Role: string;
}
export declare class UsageRecord {
    docType?: string;
    Case_ID?: string;
    MedicalInfo_ID: string;
    Record_ID: string;
    Operation: string;
    Roles: string;
    OperatorName: string;
    Time: string;
}
export declare class Patient {
    docType?: string;
    FullName: string;
    Username: string;
    Phone: string;
    Address: string;
    DoB: string;
    Gender: string;
    MedicalInfo_ID: string;
    AuthorizedDoctors: string[];
}
