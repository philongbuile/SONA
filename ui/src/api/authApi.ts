import { AppError } from '../models/Error';
import { User } from '../models/User';
import { toast } from 'react-toastify';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api`;

/**
 * functions that related to authentication/authorization.
 */
export const authApi = {
  register: async (parameter: {
    fullname: string;
    username: string;
    password: string;
    gender: string;
    mail: string;
  }) => {
    const payload = parameter;

    const response = await fetch(`${apiUrl}/register`, {
      method: 'POST',
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
        if (err.errorMsg.length !== 0) {
          alert(err.errorMsg);
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        //
        return err;
      });

    return response;
  },
  /**
   * Login Function.
   *
   * @param username string
   * @param password string
   *
   * @returns userIndentity when success & Error otherwise.
   */
  login: async (parameter: { username: string; password: string }) => {
    const payload = {
      username: parameter.username,
      password: parameter.password,
    };

    const response = await fetch(`${apiUrl}/login`, {
      method: 'POST',
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
        if (err.errorMsg.length !== 0) {
          alert(err.errorMsg);
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const user: User = data.data;
        return user;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
  /**
   * Logout Function.
   *
   * @returns null when success & Error otherwise.
   */
  logout: async () => {
    const response = await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        }

        throw new Error('Network response was not ok.');
      })
      .then((data) => {
        const err: AppError = data.error;
        if (err.errorCode) {
          return null;
        }

        const response: number = data.data;
        return response;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  /**
   * Check if user is logged in.
   *
   * @returns true if user is logged in, false otherwise.
   */
  validateLoggedStatus: async () => {
    const response = await fetch(`${apiUrl}/validateLoggedStatus`, {
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
        const err: AppError = data.error;
        if (err.errorCode) {
          return null;
        }

        const user: User = data.data;
        return user;
      });

    return response;
  },
  /**
   * Retrieve the role of user.
   *
   * @returns role of if user & error if failed.
   */
  validateRole: async () => {
    const response = await fetch(`${apiUrl}/v1/validateRole`, {
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
        const err: AppError = data.error;
        if (err.errorCode) {
          return null;
        }

        return data.data;
      })
      .catch((error) => {
        return error;
      });

    return response;
  },

  getId: async () => {
    const response = await fetch(`${apiUrl}/v1/ID`, {
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
        const err: AppError = data.error;
        if (err.errorCode) {
          return null;
        }

        return data.data;
      })
      .catch((error) => {
        return error;
      });

    return response;
  },
};
