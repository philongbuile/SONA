import React, { useReducer, useContext, createContext } from 'react';
import reducer from './reducer';
import * as types from './constants';

// import interfaces
import { TestDetails } from '../../models/TestDetails';
import TestData from '../../models/test/TestData.interface';
import SubmitData from '../../models/test/SubmitData.interface';

interface InitialStateType {
  isLoading: boolean;
  reviewMode: boolean;
  waitModal: boolean;
  testDetails: TestDetails;
  testData: TestData;
  submitData: SubmitData;
  setTestDetails: (testDetails: TestDetails) => void;
  setTestData: (testData: TestData) => void;
  setSubmitData: (submitData: SubmitData) => void;
  setIsLoading: (isLoading: boolean) => void;
  setReviewMode: (reviewMode: boolean) => void;
  setWaitModal: (waitModal: boolean) => void;
}

const initialState: InitialStateType = {
  isLoading: false,
  reviewMode: false,
  waitModal: false,
  testDetails: {
    id: 0,
    testClassId: 0,
    tagId: 0,
    tagName: '',
    testName: '',
    createdUserId: 0,
    previousTestResultId: 0,
    targetEntityCode: 0,
    title: '',
    info: '',
    status: '',
    duration: 0,
    dateAssigned: 0,
    dateUpdated: 0,
    deadline: 0,
    isDone: false,
  },
  testData: {
    mediaURL: '',
    title: '',
    content: '',
    description: '',
    type: '',
    sections: [],
  },
  submitData: {
    id: 0,
    testClassId: 0,
    sections: [],
  },
  setTestDetails: () => {},
  setTestData: () => {},
  setSubmitData: () => {},
  setIsLoading: () => {},
  setReviewMode: () => {},
  setWaitModal: () => {},
};

const TestContext = createContext<InitialStateType>(initialState);

const TestProvider = (parameter: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSetTestDetails = (testDetails: TestDetails) => {
    dispatch({
      type: types.SET_TEST_DETAILS,
      payload: testDetails,
    });
  };

  const handleSetTestData = (testData: TestData) => {
    dispatch({
      type: types.SET_TEST_DATA,
      payload: testData,
    });
  };

  const handleSetSubmitData = (submitData: SubmitData) => {
    dispatch({
      type: types.SET_SUBMIT_DATA,
      payload: submitData,
    });
  };

  const handleSetIsLoading = (isLoading: boolean) => {
    dispatch({
      type: types.SET_IS_LOADING,
      payload: isLoading,
    });
  };

  const handleSetReviewMode = (reviewMode: boolean) => {
    dispatch({
      type: types.SET_REVIEW_MODE,
      payload: reviewMode,
    });
  };

  const handleSetWaitModal = (waitModal: boolean) => {
    dispatch({
      type: types.SET_WAIT_MODAL,
      payload: waitModal,
    });
  };

  return (
    <TestContext.Provider
      value={{
        ...state,
        setTestDetails: handleSetTestDetails,
        setTestData: handleSetTestData,
        setSubmitData: handleSetSubmitData,
        setIsLoading: handleSetIsLoading,
        setReviewMode: handleSetReviewMode,
        setWaitModal: handleSetWaitModal,
      }}
    >
      {parameter.children}
    </TestContext.Provider>
  );
};

const useTestContext = () => useContext(TestContext);

export { TestContext, TestProvider, useTestContext };
