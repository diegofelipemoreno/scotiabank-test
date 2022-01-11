import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  PROPERTY_FORM_TITLE,
  EMPLOYMENT_FORM_FIELDS,
  EMPLOYMENT_CUSTOM_FIELDS,
} from "./constants";
import {ROUTER_DATA} from "./constants";
import Form from "../components/Form";
import Input from "../components/Input";
import {saveAddressFormData, saveCustomFieldsData, saveCurrentForm} from "../actions";
import {fieldValidation, areAllFieldsValid} from "../utils";

function Employment() {
    const keyName = 'employment';
    const dispatch = useDispatch();
    const appFlowStopped = useSelector((state) => state.currentForm.stopFlowError);
    const employmentFormState = useSelector((state) => state.formDataSaved[keyName]);
    const employmentCustomFieldState = useSelector((state) => state.customFields[keyName]);
    const employmentFields = {...EMPLOYMENT_FORM_FIELDS, ...employmentFormState};
    const employmentCustomFields = employmentCustomFieldState || EMPLOYMENT_CUSTOM_FIELDS;
    const [customFields, setCustomFields] = useState(employmentCustomFields);
    const[isRedirect, setIsRedirect] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const customFieldsLength = Object.values(customFields).length;

    useEffect(() => {
      dispatch(saveCurrentForm({key: keyName, data: customFields}));
    }, [dispatch, customFields]);

    useEffect(() => {
      const allFieldsValid = areAllFieldsValid(customFields);

      setSubmitDisabled(!allFieldsValid);
    }, [customFields]);

    useEffect(() => {
      dispatch(
        saveCurrentForm(
          {key: keyName, data: customFields}
        )
      );
      return () => {};
    }, [dispatch, customFields]);



    const onSubmit = (event, formData) => {
      event.preventDefault();
      dispatch(saveAddressFormData(
        {key: keyName, data: formData}
      ));

      dispatch(saveCustomFieldsData(
        {key: keyName, data: customFields}
      ));
      setIsRedirect(true);

      return <Redirect to={ROUTER_DATA.summary.pathname} />;
    }

    const customFieldsValidationHandler = (id, value) => {
      const currentField = customFields[id];
      const {validationType, maxLength} = currentField;
      const isFieldLengthValid = maxLength ? value.length <= maxLength : true;
      const isFieldEmpty = value.length > 0;
      const isValidField = fieldValidation(value, validationType);
      const actualFieldDict = {...customFields};
  
      actualFieldDict[id] = { 
        ...currentField,
        value, 
        isInvalid: !isValidField || !isFieldLengthValid || !isFieldEmpty
      };

      setCustomFields(actualFieldDict);
    }

    const getNewField = (fieldType) => {
      const customFieldsLength = Object.values(customFields).length;
      const fieldModel = EMPLOYMENT_CUSTOM_FIELDS[fieldType];
      const newField = {};
      const newFieldId = `${fieldType}-${customFieldsLength}`;

      newField[`${fieldType}-${customFieldsLength}`] = { 
        ...fieldModel,
        id: newFieldId,
        label: `${fieldModel.label} ${customFieldsLength}`,
      }

      return newField;
    }

    const addCustomField = () => {
      let currentCustomFields = {};

      if (customFieldsLength) {
        currentCustomFields = {...customFields, ...getNewField('previous')};
      } else {
        currentCustomFields = {...customFields, ...getNewField('current')};
      }
    
      setCustomFields(currentCustomFields);
    }

    const removeCustomField = (id) => {
      const currentCustomFields = {...customFields};

      delete currentCustomFields[id];
      setCustomFields(currentCustomFields);
    }

    return (
    <>
      {
        isRedirect && (
          <Redirect to={ROUTER_DATA.summary.pathname} />
        )
      }

      <h2>Employment View</h2>
      <Form
        id={keyName}
        title={PROPERTY_FORM_TITLE}
        fields={employmentFields}
        submitDisabled={submitDisabled || appFlowStopped}
        onSubmitListener={onSubmit}>

          <div className="employment-container">
            <h3>Employments address:</h3>

            {!!customFieldsLength &&
              Object.values(customFields).map((elem, index) => (
                  <div className="employment-input-wrapper" key={index}>
                    <Input 
                      id={elem.id} 
                      label={elem.label} 
                      error={elem.error} 
                      value={elem.value}
                      isInvalid={elem.isInvalid} 
                      onChangeListener={customFieldsValidationHandler}/>
                      <button 
                      type="button" 
                      onClick={() => removeCustomField(elem.id)}>
                        Remove
                      </button> 
                  </div>
              ))
            }
            <button 
            className="add-employment-cta" 
            type="button" 
            onClick={addCustomField}>
              Add employment address
            </button>
          </div>
      </Form> 
    </>
  );
}

export default Employment;