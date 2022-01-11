import React from "react";
import { useSelector } from "react-redux";

function Summary() {
  const addressData = useSelector((state) => state.formDataSaved);
  const customFields = useSelector((state) => state.customFields);
  const addressListLength = Object.keys(addressData).length;

  return (
    <>
      <h2>Summary View</h2>
      <div>
        {!!addressListLength ?
          Object.keys(addressData).map((key, index) => (
            <ol key={index}>
              <h3>{key}</h3>
              <ul>
                {
                  Object.keys(addressData[key]).map((subKey, index) => (
                    <li key={`${subKey}-${index}`}>
                      {subKey} : {addressData[key][subKey].value}
                    </li>
                  ))
                }
                {!!customFields[key] &&
                  Object.keys(customFields[key]).map((customKey, index) => (
                    <li key={`${customKey}-${index}`}>
                      {customKey} : {customFields[key][customKey].value}
                    </li>
                  ))
                }
              </ul>
            </ol>
          ))
        : <h1>There is no address list</h1>
      }
      </div>
    </>
  );
}

export default Summary;
