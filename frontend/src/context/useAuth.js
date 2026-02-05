import { useContext } from "react";
import UserContext from "./authContext.js";

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
