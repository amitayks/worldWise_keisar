import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
function ProtectedRouts({ children }) {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigation("/");
  });

  return isAuthenticated ? children : null;
}

export default ProtectedRouts;
