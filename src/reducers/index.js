import {
  SAVE_FORM_DATA,
  SAVE_CUSTOM_FIELD_DATA,
  STOP_APP_FLOW,
  SAVE_CURRENT_FORM_FILLING
} from "../actions/constants";

import {isInvalidProvidenceRule, isInvalidEmploymentRule} from "./utils-business";

function saveFormDataReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_FORM_DATA:
      const {payload} = action;
      const {key, data} = payload;
      const addressDataByType = {};

      addressDataByType[key] = data;

      return {
        ...state,
       ...addressDataByType
      };
    default:
      return state;
  }
}

function addCurrentFormReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_CURRENT_FORM_FILLING:
      const {payload} = action;
      const {key, data} = payload;
      const currentData = {...state[key], ...data};
      const addressDataByType = {
        stopFlowError: 
          isInvalidProvidenceRule(currentData) ||
          isInvalidEmploymentRule(currentData),
      };

      addressDataByType[key] = currentData;

      return {
       ...addressDataByType
      };
    default:
      return state;
  }
}

function addCustomFieldsDataReducer(state = {}, action) {
  switch (action.type) {
    case SAVE_CUSTOM_FIELD_DATA:
      const {payload} = action;
      const {key, data} = payload;
      const customFieldData = {};

      customFieldData[key] = data;

      return {
        ...state,
       ...customFieldData
      };
    default:
      return state;
  }
}

function listenCustomError(state = false, action) {
  switch (action.type) {
    case STOP_APP_FLOW:
      const {payload} = action;
      
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
}

export { 
  saveFormDataReducer,
  addCustomFieldsDataReducer,
  listenCustomError,
  addCurrentFormReducer };