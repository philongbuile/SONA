interface MedicalInfo {
    id: string;
    case: Case[];
}

interface Case {
    id: string;
    examination: {
        testresult: string;
        diagnosis: string;
        treatment: string;
    };
}

export type { MedicalInfo, Case};