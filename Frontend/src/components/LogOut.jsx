import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeData } from "../utils/manageData";

const LogOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeData("token");
    navigate("/", { replace: true });
  }, [navigate]);

  return null;
};

export default LogOut;