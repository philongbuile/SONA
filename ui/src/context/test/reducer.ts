import * as types from './constants';

// import interfaces
import { TestDetails } from '../../models/TestDetails';
import TestData from '../../models/test/TestData.interface';
import SubmitData from '../../models/test/SubmitData.interface';

const reducer = (
  state: {
    reviewMode: boolean;
    isLoading: boolean;
    waitModal: boolean;
    testDetails: TestDetails;
    testData: TestData;
    submitData: SubmitData;
  },
  { type, payload }: any
) => {
  switch (type) {
    case types.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: payload,
      };
    }
    case types.SET_REVIEW_MODE: {
      return {
        ...state,
        reviewMode: payload,
      };
    }
    case types.SET_WAIT_MODAL: {
      return {
        ...state,
        waitModal: payload,
      };
    }
    case types.SET_TEST_DETAILS: {
      return {
        ...state,
        testDetails: payload,
      };
    }
    case types.SET_TEST_DATA: {
      return {
        ...state,
        testData: payload,
      };
    }
    case types.SET_SUBMIT_DATA: {
      return {
        ...state,
        submitData: payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
