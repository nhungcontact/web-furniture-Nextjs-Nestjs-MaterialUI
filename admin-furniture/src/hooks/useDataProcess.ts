import { DataProcessContext } from "@/context/DataProcessContext";
import { useContext } from "react";

const useDataProcess = () => useContext(DataProcessContext);
export default useDataProcess;

