/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";

const FakeAuthContext = createContext();

const initailState = {
  user: {},
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.value, isAuthenticated: true };
    case "logout":
      return { ...state, user: {}, isAuthenticated: false };
  }
}

function FakeAuthProvider({ children }) { 
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initailState
  );

  const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      console.table(FAKE_USER);
      dispatch({ type: "login", value: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </FakeAuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined) {
    throw new Error("usePosts cannot be provided outside context Provider");
  }

  return context;
}

FakeAuthProvider.propTypes = {
  children: PropTypes.element,
};

export { FakeAuthProvider, useAuth };
