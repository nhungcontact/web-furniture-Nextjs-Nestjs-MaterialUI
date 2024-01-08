import { GetPermission, PermissionId } from "@/types/permission";

type Props = {
  permissionList: GetPermission[];
  role: PermissionId;
};
export const isValidRole = ({ permissionList, role }: Props) => {
  console.log(permissionList);
  if (role === "Default") {
    return true;
  }
  return !!permissionList?.find((val) => val.code === role);
};
