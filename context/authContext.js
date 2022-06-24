import React, { createContext, useEffect, useState, useReducer} from 'react';
import { authReducer, initialState } from '../reducers/AuthReducer';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [initialState, setInitialState] = useState({});
  useEffect(() => {
    setInitialState(JSON.parse(localStorage.getItem("state")));
  },[]);

    const [state, dispatch] = useReducer(authReducer, initialState);
    console.log("new state is", state);
    return (
    <AuthContext.Provider value={{ state, dispatch }}>
        {children}
    </AuthContext.Provider>
  )
}
