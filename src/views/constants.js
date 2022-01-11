export const RESIDENTIAL_FORM_TITLE = "Residential form";
export const PROPERTY_FORM_TITLE = "Property form";

export const ADDRESS_FORM_FIELDS = {
  streetName: {
    type: "input",
    id: "streetName",
    label: "Street name",
    validationType: "string",
    maxLength: 10,
    value: "",
    error: "Please enter a valid Street name."
  },
  streetNumber: {
    type: "input",
    id: "streetNumber",
    label: "Street number",
    validationType: "number",
    maxLength: 4,
    value: "",
    error: "Please enter a valid Street number."
  },
  city: {
    type: "input",
    id: "city",
    label: "City",
    validationType: "string",
    maxLength: 10,
    value: "",
    error: "Please enter a valid city."
  },
  code: {
    type: "input",
    id: "code",
    label: "Code",
    maxLength: 5,
    validationType: "number",
    value: "",
    error: "Please enter a valid code."
  },
  providence: {
    type: "dropdown",
    id: "providence",
    label: "Providence",
    value: "",
    options: ["Otawa", "Quebec", "Montreal"],
    error: "Please select a providence."
  }
}

export const EMPLOYMENT_FORM_FIELDS = {
  ...ADDRESS_FORM_FIELDS,
  employment: {
    type: "dropdown",
    id: "employment",
    label: "Employment type",
    value: "",
    options: ["Employed", "Retired", "Student"],
    error: "Please select a employment type."
  }
}

export const EMPLOYMENT_CUSTOM_FIELDS = {
  current: {
    type: "input",
    id: "current",
    label: "Current",
    value: "",
    validationType: "string",
    maxLength: 10,
    error: "Please enter valid current employment."
  },
  previous: {
    type: "input",
    id: "previous",
    label: "Previous",
    value: "",
    validationType: "string",
    maxLength: 10,
    error: "Please enter valid previous employment."
  },
}

export const CUSTOM_VALIDATIONS = {
  "providence" : {id: "providence", values: ["Quebec"], error: "Quebec is not a providence allowed."},
}

export const STOP_FLOW_VALIDATIONS = {
  "providence" : {id: "providence", values: ["Quebec"], error: "Quebec is not a providence allowed."},
  "employment" : {id: "employment", values: ["Retired", "Student"], error: "You must be an employed."}
}

export const ROUTER_DATA = {
  residential: {
    pathname: '/residential'
  },
  property: {
    pathname: '/property',
  },
  employment: {
    pathname: '/employment'
  },
  summary: {
    pathname: '/summary'
  }
}