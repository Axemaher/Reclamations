import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ userLogged, children }) => {
  if (!userLogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;