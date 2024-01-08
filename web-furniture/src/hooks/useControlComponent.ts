import { ControlComponentContext } from "@/context/ControlComponentContext";
import { useContext } from "react";

const useControlComponent = () => useContext(ControlComponentContext);
export default useControlComponent;
