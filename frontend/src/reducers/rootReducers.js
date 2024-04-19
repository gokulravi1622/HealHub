// rootReducer.js

import { combineReducers } from 'redux';
import authReducer from '../reducers/authReducers'; // Update the path if necessary

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if you have them
});

export default rootReducer;
