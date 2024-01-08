/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContextProps } from "@/types/context";
import { DialogType } from "@/types/control-component";
import { ErrorResponse, ListOptions } from "@/types/shared";
import { createContext, useState } from "react";

export type ControlComponentContextType = {
  dialog: DialogType | undefined;
  handleControlDialog: (
    dialog: DialogType, //React.CSSProperties | undefined,
  ) => Promise<boolean>;
  error: ErrorResponse<ListOptions> | undefined;
//   handleControlError: (error: ErrorResponse<ListOptions> | undefined) => Promise<boolean>;
};
export const ControlComponentContext = createContext<ControlComponentContextType>({
  dialog: undefined,
  handleControlDialog: async () => false,
  error: undefined,
//   handleControlError: async () => false,
});

export const ControlComponentContextProvider = ({ children }: ContextProps) => {
  const [dialog, setDialog] = useState<DialogType | undefined>({
    openDialog: false,
    component: <></>,
  });
  const [error, setError] = useState<ErrorResponse<ListOptions> | undefined>(undefined);
  const handleControlDialog = async ({
    component,
    openDialog,
    maxWidth,
    style,
    subDialog,
    title,
  }: DialogType) => {
    const createDialog: DialogType = {
      openDialog,
      component,
      maxWidth,
      style,
      subDialog,
      title,
    };
    setDialog(openDialog ? createDialog : undefined);
    return true;
  };

//   const handleControlError = async (err: ErrorResponse<ListOptions> | undefined) => {
//     // setError(err);
//     return true;
//   };
  return (
    <ControlComponentContext.Provider
      value={{
        dialog,
        handleControlDialog,
        error,
        // handleControlError,
      }}
    >
      {children}
    </ControlComponentContext.Provider>
  );
};
