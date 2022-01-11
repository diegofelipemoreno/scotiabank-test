import {STOP_FLOW_VALIDATIONS} from "../views/constants";

export const isInvalidProvidenceRule = (formData) => {
  const provinceKey = "providence";
  const providenceValue = formData[provinceKey]?.value;
  const currentFormData = {...formData};

  if (!providenceValue) {
    return false;
  }

  delete currentFormData[provinceKey];

  const areOtherFieldsFilled = 
    Object.values(currentFormData).every((elem) => !elem.value);
  const invalidationData = STOP_FLOW_VALIDATIONS[provinceKey];
  const invalidationErrorMsg = invalidationData.error;
  const isInvalidProvince = invalidationData.values.includes(providenceValue);

  if (areOtherFieldsFilled && isInvalidProvince) {
    return invalidationErrorMsg;
  }
}

export const isInvalidEmploymentRule = (formData) => {
  const employmentKey = "employment";
  const employmentValue = formData[employmentKey]?.value;

  if (!employmentValue) {
    return false;
  }

  const invalidationData = STOP_FLOW_VALIDATIONS[employmentKey];
  const invalidationErrorMsg = invalidationData.error;
  const isInvalidEmployment = invalidationData.values.includes(employmentValue);

  if (isInvalidEmployment) {
    return invalidationErrorMsg;
  }
}
