import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../store/authContext";
import Login from "../Auth/Login";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return user ? (
    <Route {...rest} element={{ children }} />
  ) : (
    <Route path="/login" element={<Login />} />
  );
};

export default PrivateRoute;
