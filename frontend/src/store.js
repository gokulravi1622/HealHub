import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/reducers/rootReducers';

const store = configureStore({
  reducer: rootReducer
});

export default store;
