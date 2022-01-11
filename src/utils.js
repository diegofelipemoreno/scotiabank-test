export const isValidWordCharacter = (value) => {
  const isValidWordReg = /\d+|[^\w||^\\ñ|^\\Ñ|^\-|^\\|\\ ]/g;

  return !isValidWordReg.test(value);
};

export const isValidNumber = (value) => {
  return /^\d*$/.test(value);
};

export const fieldValidation = (value, typeOfValidation) => {
  if (typeOfValidation === "string") {
    return isValidWordCharacter(value);
  }

  if (typeOfValidation === "number") {
    return isValidNumber(value);
  }

  return true;
}

export const customFieldValidation = (fieldData, invalidFieldData) => {
  if (!invalidFieldData) {
    return false;
  }

  const {id, value} = fieldData;
  const {values} = invalidFieldData;

  return values.some((invalidValue) => id === invalidFieldData.id && value === invalidValue);
}

export const areAllFieldsValid = (fieldsDict) => {
  return Object.values(fieldsDict).every((elem) => !elem.isInvalid && elem.value);
}

export const areAllFieldsFilled = (fieldsDict) => {
  return Object.values(fieldsDict).every((elem) => elem.value);
}

