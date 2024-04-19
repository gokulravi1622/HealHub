// actions/authActions.js

import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../types';

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      dispatch({ type: LOGIN_SUCCESS, payload: data });

      // Redirect logic...
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return { type: LOGOUT };
};
