import useGroupPermissionList from "@/hooks/group-permissions/useGroupPermissionList";
import {
  Box,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PermissionCheckboxHead from "./PermissionCheckboxHead";
import PermissionCheckboxTableBody from "./PermissionCheckboxTableBody";

interface Props {
  handlePermissions?: (data: string) => void | undefined;
  disabled: boolean;
  checkedAll: string[];
  setCheckedAll: (data: string[]) => void;
  //   dataPermissions?: GetPermission[];
}
export default function RoleCheckboxTable({
  handlePermissions,
  disabled,
  checkedAll,
  setCheckedAll, //   dataPermissions,
}: Props) {
  //   console.log(dataPermissions);
  const { data, isLoading, error } = useGroupPermissionList({ limit: 1000 });
  const [isSelected, setIsSelected] = useState<boolean>(false);
  console.log(data);
  //   const [dataGroup, setDataGroup] = useState<GroupPermission[]>();

  const handleSelectedAll = () => {
    setIsSelected(!isSelected);
    const getPermissions = data?.items?.map((v) => v?.permissions).flat(1);
    const IDs = getPermissions?.map((v) => v?._id);
    if (IDs) {
      const res = checkedAll.concat(IDs as string[]);
      setCheckedAll(res.filter((val, index) => res.indexOf(val) === index));
    }
  };

  //   useEffect(() => {
  //     if (dataPermissions && dataPermissions.length) {
  //       const groupedPermissions: GroupPermission[] = Object.values(
  //         dataPermissions.reduce((groups, permission) => {
  //           const groupKey = permission.groupPermission;

  //           if (!groups[groupKey]) {
  //             groups[groupKey] = { groupPermission: groupKey, permissions: [] };
  //           }

  //           groups[groupKey].permissions.push(permission);

  //           return groups;
  //         }, {}),
  //       );
  //       setDataGroup(groupedPermissions);
  //       // Log the grouped permissions
  //       console.log("groupedPermissions", groupedPermissions);
  //     }
  //   }, [dataPermissions]);
  return (
    <>
      <Box
        className="display-sb"
        justifyContent="flex-end"
        gap="12px"
        mb="16px"
      >
        <Button
          color="primary"
          onClick={handleSelectedAll}
          disabled={disabled}
        >
          <Typography
            variant="body1"
            textTransform="capitalize"
            fontWeight={"bold"}
            color="black"
          >
            Select all
          </Typography>
        </Button>
      </Box>
      {!isLoading && !data?.options && (
        <Typography
          variant={"body1"}
          fontWeight={600}
          textTransform={"capitalize"}
          color="black"
        >
          No data
        </Typography>
      )}
      {!isLoading && error && (
        <Typography
          variant={"body1"}
          color="red"
        >
          {error?.message}
        </Typography>
      )}
      {!isLoading && data && (
        <TableContainer
          sx={{
            overflow: "auto",
            background: "#fff",
            borderRadius: 0,
            minHeight: "300px",
          }}
        >
          <Table
            // sx={{
            //   minWidth: "1200px",
            //   overflowX: "auto",
            //   background: "#fff",
            // }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                {!!data &&
                  !!data.items &&
                  !!data.items.length &&
                  data.items.map((v, i) => {
                    return (
                      <PermissionCheckboxHead
                        key={i}
                        item={v}
                        disabled={disabled}
                        checkedAll={checkedAll}
                        setCheckedAll={(val) => setCheckedAll(val)}
                        isSelected={isSelected}
                      />
                    );
                  })}
              </TableRow>
              <TableRow>
                {data &&
                  data.items &&
                  data.items.map((val) => {
                    return (
                      <PermissionCheckboxTableBody
                        key={val?._id}
                        item={val}
                        handlePermissions={handlePermissions}
                        disabled={disabled}
                        checkedAll={checkedAll}
                      />
                    );
                  })}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
