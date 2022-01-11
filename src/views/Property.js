import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  PROPERTY_FORM_TITLE,
  ADDRESS_FORM_FIELDS,
  CUSTOM_VALIDATIONS
} from "./constants";
import {ROUTER_DATA} from "./constants";
import {saveAddressFormData} from "../actions";
import Form from "../components/Form";

function Property() {
    const keyName = 'property';
    const appFlowStopped = useSelector((state) => state.currentForm.stopFlowError);
    const propertyFormState = useSelector((state) => state.formDataSaved[keyName]);
    const [isRedirect, setIsRedirect] = useState(false);
    const dispatch = useDispatch();
    const propertyFields = {...ADDRESS_FORM_FIELDS, ...propertyFormState};

    const onSubmit = (event, formData) => {
      event.preventDefault();
      dispatch(saveAddressFormData({key: keyName, data: formData}));
      setIsRedirect(true);

      return <Redirect to={ROUTER_DATA.employment.pathname} />;
    }

    return (
    <>
      {
        isRedirect && (
          <Redirect to={ROUTER_DATA.employment.pathname} />
        )
      }
      <h2>Property View</h2>
      <Form
        id={keyName}
        title={PROPERTY_FORM_TITLE}
        fields={propertyFields}
        customValidations={CUSTOM_VALIDATIONS}
        onSubmitListener={onSubmit} 
        submitDisabled={appFlowStopped}
        /> 
    </>
  );
}

export default Property;