# Scotiabank Frontend Test

This App is created according the PDF exercise.

![alt text](https://github.com/diegofelipemoreno/scotiabank-test/blob/master/src/images/app.png)

## Components

The components created for this APP are: Input, Dropdown, Form and NavigationControls:
  Input, Dropdown: Is a component that it can be reuse in other places of the APP, it counts 
  with a label, error message and onChangeListener configurations.
  
  Form: This component can create a full form with configurable fields, also can manage fields
  validations (string, integer, stringLength) and also can manage custom validations,
  for each field, in case some business rules values should not be allowed. 
  ("Quebec", "Retired", "Student")
  
  The way to set the configuration on this component is like this way:

  ```
  {
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
  ```

  ```
  {
     "providence" : {id: "providence", values: ["Quebec"], error: "Quebec is not a providence allowed."},
  }
 ```

  NavigationControls: This is a reusable and agnostic component can manage the
  router redirection according specific views. The way to configure the component is like this way:

  ```
  {
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
  ```

## Views
  For Residential and Property views the Form component was call with the specific
  configurations according the business rules, this configuration can be found on
  "src/views/constants.js"

  For the Employment view the Form component also was called, but this view need an
  additional logic con inputs (employment: current, previous, ...) that can be
  created o removed according the case, so this custom fields were called as
  children on the Form component.

  
## Model data.
All the data that are injected on the component, views, from the validation for 
an input until custom validation, APP stop flow validations can be found on the 
"src/views/constants.js"

## State 
In order to make each view agnostic to business logic the state was create of this
way to ensure that the all the data can be easily found and understandable.

![alt text](https://github.com/diegofelipemoreno/scotiabank-test/blob/master/src/images/app-state.png)

# To start the project
In a new terminal


From the root of this project:
``` bash
  Node version: v14.18.2
  Run command `npm install`
  Run command `npm start`
  Local project will start at localhost:3000
```
