import { lazy } from 'react';
import { patientApi } from '../api/patientApi';

// code it like the authorization list
const DoctorPage = () => {

    patientApi.getPatientsofDoctor('Doctor2') ;

    return (
        <div>
            <h1>DoctorPage</h1>
        </div>
    );
}

export default DoctorPage;