import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { removeData } from "../utils/manageData";
import { AuthContext } from "../context/auth.context";

const LogOut = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  useEffect(() => {
    removeData("token");
    setToken(null);
    navigate("/", { replace: true });
  }, [navigate, setToken]);

  return null;
};

export default LogOut;