import { AppError } from '../models/Error';
import { Case } from '../models/MedicalInfo';
import { MedicalInfo } from '../models/MedicalInfo';
import { UsageRecord } from '../models/UsageRecord';
import { Operator } from '../models/Operator';
import { stringify } from 'querystring';

// const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const BASE_API = 'http://localhost:8080';

// const apiUrl = `${BASE_API}/api/`;
const apiUrl = `${BASE_API}/patient`;
// "/medinfo/operator_query_medicalinfo/:medicalinfo_id/:operator_username"

/**
 * fetches for user data.
 */
export const patientApi = {

// return arrays of patients of that doctor

  getPatientsofDoctor: async (doctor_username: string) => {

    const payload = '';
    
    const response = await fetch(`${apiUrl}/queryall/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log(data);
        const err: AppError = data.error;
        if (err.errorCode !== 0) {
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  addCase: async (examination: any, operator: string, patient: string, infoID: string) => {

    const payload = {
      examination: examination,
      operator_username : operator,
      patient_username: patient,
      infoID : infoID
    }

    console.log(`${apiUrl}/addCase/`);
    const response = await fetch(`${apiUrl}/addCase/`, {
      method: 'POST',
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        console.log(data);
        const err: AppError = data.error;
        if (err.errorCode !== 0) {
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        return err;
      });

    return response;
  }
};
