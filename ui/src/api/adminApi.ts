import { AppError } from '../models/Error';
import { TestDetails } from '../models/TestDetails';
import TestData from '../models/test/TestData.interface';
import SubmitData from '../models/test/SubmitData.interface';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api/v1/admin`;

/**
 * fetches for admin data.
 */
export const adminApi = {
  deleteUser: async (userId: number) => {
    const response = await fetch(
      `${apiUrl}/user?` + new URLSearchParams({ user_id: userId.toString() }),
      {
        method: 'DELETE',
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

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  deleteClass: async (classId: number) => {
    const response = await fetch(
      `${apiUrl}/class?` +
        new URLSearchParams({ class_id: classId.toString() }),
      {
        method: 'DELETE',
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

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
};
