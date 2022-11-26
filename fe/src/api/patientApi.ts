import { AppError } from '../models/Error';
import { Case } from '../models/MedicalInfo';
import { MedicalInfo } from '../models/MedicalInfo';
import { UsageRecord } from '../models/UsageRecord';
import { Operator } from '../models/Operator';
import { stringify } from 'querystring';

// const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const BASE_API = '128.199.203.189:8080';

// const apiUrl = `${BASE_API}/api/`;
const apiUrl = `${BASE_API}/patient`;
// "/medinfo/operator_query_medicalinfo/:medicalinfo_id/:operator_username"

/**
 * fetches for user data.
 */
export const patientApi = {

// return arrays of patients of that doctor

  getPatientsofDoctor: async (doctor_username: any) => {
    const response = await fetch(`${apiUrl}/queryall/`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const patients = data.response.filter( (obj) => {
            return obj.docType === "patient";
        });

        const authorized_patients = patients.filter((patient) => patient.AuthorizedDoctors.includes(doctor_username));
        console.log(authorized_patients)
        return authorized_patients;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

};
