/* eslint-disable max-lines */

import isValidRole from "@/helpers/isValidRole";
import { useRouterConfig } from "@/helpers/useRouterConfig";
import usePermissionList from "@/hooks/permissions/usePermissionList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { ContextProps } from "@/types/context.type";
import { GetPermission } from "@/types/permission";

import { ListOptions } from "@/types/shared";
import { usePathname } from "next-intl/client";
import { createContext, useEffect, useState } from "react";

export type AuthType = {
  //   userMe: UserMe | undefined;
  //   handleSetUserMe: (user: UserMe) => Promise<boolean>;
  //   ltiRole: LtiRole | undefined;
  //   handleSetLtiRole: (user: LtiRole) => Promise<boolean>;
  permissionList: GetPermission[];
  handleSetPermissionList: (list: GetPermission[]) => Promise<boolean>;
  allowed: (p: string) => boolean;
  handleFetchPermissionList: () => Promise<boolean>;
};
export const Auth = createContext<AuthType>({
  //   userMe: undefined,
  //   handleSetUserMe: async () => false,
  //   ltiRole: undefined,
  //   handleSetLtiRole: async () => false,
  permissionList: [],
  handleSetPermissionList: async () => false,
  allowed: () => false,
  handleFetchPermissionList: async () => false,
});

export const AuthProvider = ({ children }: ContextProps) => {
  const {
    data: dataPermission,
    isLoading: isLoadingPermission,
    mutate: fetchPermissionList,
  } = usePermissionList();
  console.log("per", dataPermission);
  //   const [userMe, setUserMe] = useState<User | undefined>(undefined);
  //   const [ltiRole, setLtiRole] = useState<LtiRole | undefined>(undefined);
  const [permissionList, setPermissionList] = useState<GetPermission[]>([]);
  const [, setParams] = useQueryParams<ListOptions>();
  const pathname = usePathname();
  const { handleNavigateReplace } = useRouterConfig();

  const handleFetchPermissionList = async () => {
    fetchPermissionList();
    return true;
  };

  const handleSetPermissionList = async (list: GetPermission[]) => {
    setPermissionList(list);
    // console.log({ list });
    return true;
  };
  const allowed = (permission: string) => {
    return !!permissionList.find((item) => item._id === permission);
  };
  useEffect(() => {
    if (!isLoadingPermission && dataPermission) {
      handleSetPermissionList(dataPermission);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isLoadingPermission && dataPermission]);

  useEffect(() => {
    fetchPermissionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  useEffect(() => {
    if (!!permissionList?.length) {
      switch (pathname) {
        case "/product": {
          if (!isValidRole({ permissionList, role: "ViewProduct" }))
            handleNavigateReplace("/403");
          break;
        }
        case "/roles": {
          if (!isValidRole({ permissionList, role: "ViewRole" }))
            handleNavigateReplace("/403");
          break;
        }
        // case "/edu": {
        //   if (!isValidRole({ permissionList, role: "ViewEduSystem" }))
        //     handleNavigateReplace("/403");
        //   break;
        // }
        // case "/framework-program": {
        //   if (
        //     !isValidRole({
        //       permissionList,
        //       role: "ViewFrameworkProgram",
        //     })
        //   )
        //     handleNavigateReplace("/403");
        //   break;
        // }
        // case "/learning-outcome": {
        //   if (
        //     !isValidRole({
        //       permissionList,
        //       role: "ViewLearningOutcome",
        //     })
        //   )
        //     handleNavigateReplace("/403");
        //   break;
        // }
        // case "/roles": {
        //   if (
        //     !isValidRole({
        //       permissionList,
        //       role: "ViewRole",
        //     })
        //   )
        //     handleNavigateReplace("/403");
        //   break;
        // }
        // case "/subjects": {
        //   if (
        //     !isValidRole({
        //       permissionList,
        //       role: "ViewSubject",
        //     })
        //   )
        //     handleNavigateReplace("/403");
        //   break;
        // }
        // case "/term": {
        //   if (
        //     !isValidRole({
        //       permissionList,
        //       role: "ViewTerm",
        //     })
        //   )
        //     handleNavigateReplace("/403");
        //   break;
        // }
        // case "/users": {
        //   if (
        //     !isValidRole({
        //       permissionList,

        //       role: "ViewUser",
        //     })
        //   )
        //     handleNavigateReplace("/403");
        //   break;
        // }
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, permissionList]);

  useEffect(() => {
    setParams({
      searchValue: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Auth.Provider
      value={{
        // userMe,
        // handleSetUserMe,
        // ltiRole,
        // handleSetLtiRole,
        permissionList,
        handleSetPermissionList,
        allowed,
        handleFetchPermissionList,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
