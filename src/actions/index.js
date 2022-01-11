import {
  SAVE_FORM_DATA,
  SAVE_CUSTOM_FIELD_DATA,
  STOP_APP_FLOW,
  SAVE_CURRENT_FORM_FILLING
} from "./constants";

const saveAddressFormData = (formData) => {
  return {
    type: SAVE_FORM_DATA,
    payload: formData, 
  }
}

const saveCustomFieldsData = (formData) => {
  return {
    type: SAVE_CUSTOM_FIELD_DATA,
    payload: formData, 
  }
}

const listenCustomError = (customErrorData) => {
  return {
    type: STOP_APP_FLOW,
    payload: customErrorData, 
  }
}

const saveCurrentForm = (formData) => {
  return {
    type: SAVE_CURRENT_FORM_FILLING,
    payload: formData, 
  }
}

export {
  saveAddressFormData,
  saveCustomFieldsData,
  listenCustomError,
  saveCurrentForm
};