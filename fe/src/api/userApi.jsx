import useFetch from "./UseFetch";

const PersonalInforFetch = (username) => {
    const { data: personalData, isPending, error } = useFetch('http://localhost:8080/patient/query/' + username);
    return { data: personalData, isPending, error };
}

const MedicalInforFetch = (medicalinfor_id) => {
    const { data: medicalData, isPending, error } = useFetch('http://localhost:8080/medinfo/patient_query_medicalinfo/' + medicalinfor_id);
    return { data: medicalData };
}

export { PersonalInforFetch, MedicalInforFetch };