import { GroupPermission } from "@/types/group-permission";
import { Box, Checkbox, TableCell, Typography } from "@mui/material";

interface Props {
  item: GroupPermission;
  handlePermissions?: ((data: string) => void | undefined) | undefined;
  disabled: boolean;
  checkedAll: string[];
}
export default function PermissionCheckboxTableBody({
  item,
  handlePermissions,
  disabled,
  checkedAll,
}: Props) {
  //   const options = useQueryParams();
  return (
    <>
      <TableCell
        sx={{
          border: 0,
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: 0 }}>
          {item.permissions &&
            item.permissions.map((v, i) => {
              return (
                <Box
                  mt="18px"
                  display="flex"
                  alignItems="flex-start"
                  gap="8px"
                  key={i}
                >
                  <Checkbox
                    id={v?._id}
                    sx={{ p: "0" }}
                    checked={checkedAll?.includes(v?._id)}
                    name={v?._id}
                    onChange={() => handlePermissions && handlePermissions(v?._id)}
                    disabled={disabled}
                  />
                  {/* {options[0].page === "user" && (
                  <Box>
                    {i % 2 ? (
                      <Person
                        sx={{
                          width: "16px",
                        }}
                      />
                    ) : (
                      <PeopleAlt
                        sx={{
                          width: "16px",
                          display: `${v?._id === "CreateRole" && "none !import"}`,
                        }}
                      />
                    )}
                  </Box>
                  )} */}

                  <Typography variant="body1">{v?.name}</Typography>
                </Box>
              );
            })}
        </Box>
      </TableCell>
    </>
  );
}
