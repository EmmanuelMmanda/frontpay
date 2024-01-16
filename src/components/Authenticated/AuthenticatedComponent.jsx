// src/components/AuthenticatedComponent.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import Header from "../UI/Header";

const AuthenticatedComponent = ({ children }) => {
  const { user } = useAuth();

  if (user === null) {
    // Redirect or show login component if the user is not authenticated
    Navigate("/");
  }
  return (
    <>
      <Header user={user}/>
      {children}
    </>
  );
};

export default AuthenticatedComponent;
