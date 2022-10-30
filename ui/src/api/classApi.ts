import { AppError } from '../models/Error';
import { User } from '../models/User';
import { Class } from '../models/Class';
import { TestDetails } from '../models/TestDetails';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api/v1/class`;

/**
 * fetches for class data.
 */
export const classApi = {
  getAll: async () => {
    const response = await fetch(`${apiUrl}/`, {
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

        const classes: Class[] = data.data;
        return classes;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getTests: async (classId: number) => {
    const response = await fetch(
      `${apiUrl}/tests?` +
        new URLSearchParams({ class_id: classId.toString() }),
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

        const tests: TestDetails[] = data.data;
        return tests;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getSingleTest: async (testId: string, classId: string) => {
    const response = await fetch(
      `${apiUrl}/single_test?` +
        new URLSearchParams({
          test_id: testId.toString(),
          class_id: '1',
        }),
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

        const testDetails: TestDetails = data.data;
        return testDetails;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getMembers: async (classId: number) => {
    const response = await fetch(
      `${apiUrl}/members?` +
        new URLSearchParams({ class_id: classId.toString() }),
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

        const members: User[] = data.data;
        return members;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  addClass: async (parameter: {
    className: string;
    info: string;
    announcement: string;
    roomCode: string;
    level: string;
  }) => {
    const payload = parameter;

    const response = await fetch(`${apiUrl}`, {
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

  addMember: async (parameter: { classId: number; userId: number }) => {
    const response = await fetch(
      `${apiUrl}/add_member?` +
        new URLSearchParams({
          class_id: parameter.classId.toString(),
          user_id: parameter.userId.toString(),
        }),
      {
        method: 'POST',
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

  addTest: async (parameter: { classId: number; testId: number }) => {
    const response = await fetch(
      `${apiUrl}/add_test?` +
        new URLSearchParams({
          class_id: parameter.classId.toString(),
          test_id: parameter.testId.toString(),
        }),
      {
        method: 'POST',
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

  removeTest: async (parameter: { classId: number; testId: number }) => {
    const response = await fetch(
      `${apiUrl}/remove_test?` +
        new URLSearchParams({
          class_id: parameter.classId.toString(),
          test_id: parameter.testId.toString(),
        }),
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

  removeMember: async (parameter: { classId: number; userId: number }) => {
    const response = await fetch(
      `${apiUrl}/remove_member?` +
        new URLSearchParams({
          class_id: parameter.classId.toString(),
          user_id: parameter.userId.toString(),
        }),
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
