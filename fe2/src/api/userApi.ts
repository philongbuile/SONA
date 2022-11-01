import { AppError } from '../models/Error';
import { User } from '../models/User';
import { MedicalInfo } from '../models/MedicalInfo';
import { UsageRecord } from '../models/UsageRecord';
import { Operator } from '../models/Operator';
import { stringify } from 'querystring';

const BASE_API = 'http://localhost:8080';
const apiUrl = `${BASE_API}/`;

/**
 * fetches for user data.
 */
export const userApi = {
  getAllUsers: async () => {
    const response = await fetch(`${apiUrl}/patient/queryall`, {
      method: 'GET',
      credentials: 'include',
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

        const users: User[] = data.data;
        return users;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getInfoByUsername: async (username: string) => {
    const response = await fetch(
      `${apiUrl}patient/query/` + username,
      {
        method: 'GET',
      }
    )
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

        
        const user = data
        return user;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getMedicalInfo: async (id: string) => {
    const response = await fetch(
      `${apiUrl}/medinfo/patient_query_medicalinfo/` + id,
      {
        method: 'GET',
      }
    )
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

        const medicalInfo: MedicalInfo = data.data;
        return medicalInfo;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getUsageRecords: async (id: string) => {
    const medicalid = id.toString();

    const response = await fetch(
      `${apiUrl}/record/query/` + medicalid,
      {
        method: 'GET',
      } 
    )
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

        const results: UsageRecord[] = data.data;
        return results;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
};
