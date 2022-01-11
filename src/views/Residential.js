import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  RESIDENTIAL_FORM_TITLE,
  ADDRESS_FORM_FIELDS,
} from "./constants";
import {ROUTER_DATA} from "./constants";
import {saveAddressFormData} from "../actions";
import Form from "../components/Form";

function Residential() {
  const keyName = 'residential';
  const appFlowStopped = useSelector((state) => state.currentForm.stopFlowError);
  const residentialFormState = useSelector((state) => state.formDataSaved[keyName]);
  const[isRedirect, setIsRedirect] = useState(false);
  const dispatch = useDispatch();
  const residentialFields = {...ADDRESS_FORM_FIELDS, ...residentialFormState};

  const onSubmit = (event, formData) => {
    event.preventDefault();
    dispatch(saveAddressFormData({key: keyName, data: formData}));
    setIsRedirect(true);

    return <Redirect to={ROUTER_DATA.property.pathname} />;
  }

  return (
    <>
      {
        isRedirect && (
          <Redirect to={ROUTER_DATA.property.pathname} />
        )
      }
      <h2>Residential View</h2>
      <Form
        id={keyName}
        title={RESIDENTIAL_FORM_TITLE}
        fields={residentialFields}
        onSubmitListener={onSubmit}
        submitDisabled={appFlowStopped}/> 
    </>
  );
}

export default Residential;