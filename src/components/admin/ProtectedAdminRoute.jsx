import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedAdminRoute = ({children}) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  });
  return <>{children}</>;
};
export default ProtectedAdminRoute;
