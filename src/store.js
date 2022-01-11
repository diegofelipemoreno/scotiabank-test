import { createStore, combineReducers, compose } from "redux";

import { 
  saveFormDataReducer,
  addCustomFieldsDataReducer,
  listenCustomError,
  addCurrentFormReducer
} from "./reducers";

const initialState = {};
const reducer = combineReducers({
  formDataSaved: saveFormDataReducer,
  customFields: addCustomFieldsDataReducer,
  customError: listenCustomError,
  currentForm: addCurrentFormReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancers()
);

export default store;