import { Auth } from "@/context/AuthContext";
import { useContext } from "react";

const useUserMeGlobal = () => useContext(Auth);
export default useUserMeGlobal;
