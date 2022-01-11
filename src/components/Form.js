import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import Input from "./Input";
import Dropdown from "./Dropdown";
import {saveCurrentForm} from "../actions";
import {fieldValidation, customFieldValidation, areAllFieldsValid} from "../utils";

const useEffectOnce = (effect) => {
  const finalEffect = useRef(effect);
  useEffect(() => {
    finalEffect.current();
  }, []);
};

function Form({
  children,
  id,
  title,
  fields,
  onSubmitListener,
  submitDisabled,
  customValidations
  }) {
  const dispatch = useDispatch();   
  const [fieldsDict, setFieldsDict] = useState(fields);
  const [isValidForm, setIsValidForm] = useState(false);
  const allFieldsValid = areAllFieldsValid(fieldsDict);
  const formId = id;
  
  useEffectOnce(() => {
    const currentFieldsDict = Object.values(fields).reduce((acc, elem) => {
      const {id} = elem;

      acc[id] = {...elem, isInvalid: false}

      return acc;
    }, {});

    setFieldsDict(currentFieldsDict);
  }, [fields]);

  useEffect(() => {
    if (submitDisabled) {
      setIsValidForm(!submitDisabled);

      return;
    }

    setIsValidForm(allFieldsValid);
  }, [allFieldsValid, submitDisabled]);


  useEffect(() => {
    dispatch(saveCurrentForm({key: formId, data: fieldsDict}));
  }, [dispatch, fieldsDict, formId]);

  const checkCustomValidations = (value, currentField) => {
    const {id} = currentField;
    const actualFieldsDict = {...fieldsDict};
    const currentCustomValidation = customValidations ? customValidations[id] : null;
    const isThereCustomError = customFieldValidation({id, value}, currentCustomValidation);
    const customError = currentCustomValidation?.error || '';

    if (!isThereCustomError) {
      return;
    }

    actualFieldsDict[id] = {
      ...currentField,
      value,
      isInvalid: true,
      error: customError || currentField.error,
    };

    setFieldsDict(actualFieldsDict);
  }

  const defaultValidations = (value, currentField) => {
    const {id, validationType, maxLength} = currentField;
    const isFieldLengthValid = maxLength ? value.length <= maxLength : true;
    const isFieldEmpty = value.length > 0;
    const isValidField = fieldValidation(value, validationType);
    const actualFieldsDict = {...fieldsDict};

    actualFieldsDict[id] = { 
      ...currentField,
      value, 
      isInvalid: !isValidField || !isFieldLengthValid || !isFieldEmpty
    };

    setFieldsDict(actualFieldsDict);
  }

  const validationHandler = (id, value) => {
    const currentField = fieldsDict[id];

    if (!currentField) {
      return;
    }

    defaultValidations(value, currentField);
    checkCustomValidations(value, currentField);
  }

  return (
    <form onSubmit={(event) => onSubmitListener(event, fieldsDict)}>
      <fieldset>
        <legend>{title}</legend>
        {!!Object.values(fieldsDict) &&
          Object.values(fieldsDict).map((elem) => {
            const {type, id, label, error, isInvalid, options, value} = elem;

            if (type === "input") {
              return (
              <Input 
                key={id} 
                id={id} 
                label={label} 
                error={error}
                value={value}
                isInvalid={isInvalid} 
                onChangeListener={validationHandler}/>)
            }

            if (type === "dropdown") {
              return (
              <Dropdown 
                key={id} 
                id={id} 
                label={label} 
                options={options} 
                value={value}
                error={error} 
                isInvalid={isInvalid} 
                onChangeListener={validationHandler}/>)
            }
        })}  
        <>{children}</>
        <div>
         <button type="submit" disabled={!isValidForm}>Submit</button>
        </div>
      </fieldset>
    </form>
  );
}

export default Form;