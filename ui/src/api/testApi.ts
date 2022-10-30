import { AppError } from '../models/Error';
import { TestDetails } from '../models/TestDetails';
import { Result } from '../models/Result';
import TestData from '../models/test/TestData.interface';
import SubmitData from '../models/test/SubmitData.interface';

const BASE_API = process.env.REACT_APP_BASE_API || 'http://localhost:8080';
const apiUrl = `${BASE_API}/api/v1/test`;

/**
 * fetches for test data.
 */
export const testApi = {
  getAllTests: async () => {
    const response = await fetch(`${apiUrl}/all`, {
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

        const tests: TestDetails[] = data.data;
        return tests;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getTest: async (testId: string) => {
    const response = await fetch(
      `${apiUrl}/?` + new URLSearchParams({ test_id: testId }),
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

  doTest: async (testId: string) => {
    const response = await fetch(
      `${apiUrl}/do?` + new URLSearchParams({ test_id: testId }),
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
        console.log('mydata: ', data);
        const err: AppError = data.error;
        if (err.errorCode !== 0) {
          throw new Error(err.errorMsg + ' ++ ' + err.errorField);
        }

        const testData: TestData = data.data;
        return testData;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  submitTest: async (parameter: SubmitData) => {
    const payload = parameter;

    console.log('payload');
    console.log(payload);

    const response = await fetch(`${apiUrl}/submit`, {
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

        const testResultId: number = data.data;
        console.log('response:');
        console.log(data);
        return testResultId;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getResult: async (testResultId: string) => {
    const response = await fetch(
      `${apiUrl}/result?` +
        new URLSearchParams({ test_result_id: testResultId }),
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

        const result: Result = data.data;
        return result;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getAnswer: async (testResultId: string) => {
    const response = await fetch(
      `${apiUrl}/answer?` +
        new URLSearchParams({ test_result_id: testResultId }),
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

        const submitData: SubmitData = data.data;
        return submitData;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },

  getTestByTestClassID: async (testClassId: number) => {
    const response = await fetch(
      `${apiUrl}/tcid?` +
        new URLSearchParams({ test_class_id: testClassId.toString() }),
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

        const test: TestDetails = data.data;
        return test;
      })
      .catch((err) => {
        return err;
      });

    return response;
  },
};
