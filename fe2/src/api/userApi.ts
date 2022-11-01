import { AppError } from '../models/Error';
import { User } from '../models/User';
import { MedicalInfo } from '../models/MedicalInfo';
import { UsageRecord } from '../models/UsageRecord';
import { Operator } from '../models/Operator';
import { stringify } from 'querystring';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api/v1/user`;

/**
 * fetches for user data.
 */
export const userApi = {
  getAllUsers: async () => {
    const response = await fetch(`${apiUrl}/queryall`, {
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
      `${apiUrl}/?` + new URLSearchParams({ username }),
      {
        method: 'GET',
        credentials: 'include',
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

        const users: User[] = data.data;
        return users;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getMedicalInfo: async (userId: string) => {
    const response = await fetch(
      `${apiUrl}/,medicalInfo?` + new URLSearchParams({ user_id: userId }),
      {
        method: 'GET',
        credentials: 'include',
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

        const medicalInfo: MedicalInfo[] = data.data;
        return medicalInfo;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  updateInfo: async (parameter: User) => {
    const payload = parameter;

    const response = await fetch(`${apiUrl}`, {
      method: 'PUT',
      credentials: 'include',
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

  getUsageRecords: async (id: string) => {
    const user_id = id.toString();

    const response = await fetch(
      `${apiUrl}/usage_record?` + new URLSearchParams({ user_id }),
      {
        method: 'GET',
        credentials: 'include',
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

  getAuthorizationList: async (id: string) => {
    const user_id = id.toString();

    const response = await fetch(
      `${apiUrl}/authorization_list?` + new URLSearchParams({ user_id }),
      {
        method: 'GET',
        credentials: 'include',
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

        const results: Operator[] = data.data;
        return results;
      })
      .catch((err) => {
        return err;
      });

    return response;
  }
};
