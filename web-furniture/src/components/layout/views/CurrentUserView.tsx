// import React from "react";
// import CustomLink from "@/components/shared/CustomLink";
// import MenuUserViewResponsive from "./MenuUserViewResponsive";
// import { NavItem } from "@/config/navigation";
// import useCurrentUser from "@/hooks/shared/useCurrentUser";
// import useUserInfor from "@/hooks/users/useUserInformation";
// import {
//   Avatar,
//   Box,
//   Button,
//   CircularProgress,
//   Divider,
//   MenuItem,
//   Typography,
//   Stack,
//   Popper,
//   Grow,
//   Paper,
//   ClickAwayListener,
//   MenuList,
// } from "@mui/material";
// import { ShoppingCart } from "@mui/icons-material";
// import { signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { theme } from "@/config/theme";
// export default function CurrentUserView() {
//   const [userData, loading] = useCurrentUser();
//   const { data } = useUserInfor();
//   let userMenu: NavItem[] = [];
//   if (data?.role === "ADMIN") {
//     userMenu = [
//       {
//         label: "Profile",
//         path: "/profile",
//       },
//       {
//         label: "Manage",
//         path: "/admin/dashboard",
//       },
//     ];
//   } else if (data?.role === "FACILITY_OWNER") {
//     userMenu = [
//       {
//         label: "Profile",
//         path: "/profile",
//       },
//       {
//         label: "Manage",
//         path: "/owner/dashboard",
//       },
//     ];
//   } else {
//     userMenu = [
//       {
//         label: "Profile",
//         path: "/profile",
//       },
//       {
//         label: "Setting",
//         path: "/setting",
//       },
//     ];
//   }
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef<HTMLButtonElement>(null);
//   if (!userData) return <></>;
//   if (loading) return <CircularProgress size={24} />;
//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };
//   const handleClose = (event: Event | React.SyntheticEvent) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
//       return;
//     }
//     setOpen(false);
//   };
//   function handleListKeyDown(event: React.KeyboardEvent) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     } else if (event.key === "Escape") {
//       setOpen(false);
//     }
//   }
//   return (
//     <Stack
//       direction={"row"}
//       justifyContent={"space-between"}
//       alignItems={"center"}
//       sx={{
//         position: "absolute",
//         zIndex: "1",
//         left: "0",
//         top: "0",
//         width: "100%",
//       }}
//     >
//       <Box
//         sx={{
//           [theme.breakpoints.down("md")]: {
//             margin: "35px 0 0 20px",
//           },
//           [theme.breakpoints.between("sm", "md")]: {
//             margin: "20px 0 0 30px",
//           },
//           margin: "30px 0 0 48px",
//         }}
//       >
//         <Link href={"/"}>
//           <Image
//             src={"/images/logo-fitivation.png"}
//             alt={""}
//             width={173}
//             height={38}
//           />
//         </Link>
//       </Box>
//       <Stack
//         direction={"row"}
//         justifyContent={"space-around"}
//         alignItems={"center"}
//         minWidth={"450px"}
//       >
//         <Button
//           onClick={handleToggle}
//           ref={anchorRef}
//           id="composition-button"
//           aria-controls={open ? "composition-menu" : undefined}
//           aria-expanded={open ? "true" : undefined}
//           aria-haspopup="true"
//           sx={{
//             p: 0,
//             [theme.breakpoints.down("md")]: { display: "none" },
//             [theme.breakpoints.between("sm", "md")]: { display: "block" },
//           }}
//           color="inherit"
//           endIcon={
//             <Avatar
//               alt="avt user"
//               src={data?.avatar?.imageURL}
//             />
//           }
//         ></Button>
//         <Box>
//           <Typography
//             variant="body2"
//             color={"#FFFFFF"}
//             sx={{
//               cursor: "default",
//               [theme.breakpoints.down("md")]: { display: "none" },
//               [theme.breakpoints.between("sm", "md")]: { display: "block" },
//             }}
//           >
//             {data?.displayName}
//           </Typography>
//         </Box>
//         <Divider
//           sx={{
//             height: "25px",
//             bgcolor: "#FFFFFF",
//             [theme.breakpoints.down("md")]: { display: "none" },
//             [theme.breakpoints.between("sm", "md")]: {
//               display: `${
//                 data?.role === "FACILITY_OWNER" || data?.role === "ADMIN"
//                   ? "none"
//                   : "block"
//               }`,
//             },
//             [theme.breakpoints.up("md")]: {
//               display: `${
//                 data?.role === "FACILITY_OWNER" || data?.role === "ADMIN"
//                   ? "none"
//                   : "block"
//               }`,
//             },
//           }}
//           orientation="vertical"
//         />
//         <Popper
//           open={open}
//           anchorEl={anchorRef.current}
//           role={undefined}
//           placement="bottom-start"
//           transition
//           disablePortal
//         >
//           {({ TransitionProps }) => (
//             <Grow
//               {...TransitionProps}
//               style={{ transformOrigin: "left top" }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList
//                     autoFocusItem={open}
//                     id="composition-menu"
//                     aria-labelledby="composition-button"
//                     onKeyDown={handleListKeyDown}
//                   >
//                     {userMenu.map(({ label, path }) => (
//                       <MenuItem
//                         key={path}
//                         onClick={handleClose}
//                       >
//                         <Typography
//                           component={CustomLink}
//                           href={path}
//                           textAlign="center"
//                         >
//                           {label}
//                         </Typography>
//                       </MenuItem>
//                     ))}
//                     <Divider />
//                     <MenuItem onClick={() => signOut({ callbackUrl: "/" })}>
//                       Sign Out
//                     </MenuItem>
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//         <Box
//           sx={{
//             [theme.breakpoints.down("md")]: { display: "none" },
//             [theme.breakpoints.between("sm", "md")]: {
//               display: `${
//                 data?.role === "FACILITY_OWNER" || data?.role === "ADMIN"
//                   ? "none"
//                   : "block"
//               }`,
//             },
//             [theme.breakpoints.up("md")]: {
//               display: `${
//                 data?.role === "FACILITY_OWNER" || data?.role === "ADMIN"
//                   ? "none"
//                   : "block"
//               }`,
//             },
//           }}
//         >
//           <Link
//             href={"/cart"}
//             style={{
//               color: "#FFFFFF",
//               textDecoration: "none",
//               display: "flex",
//               justifyContent: "space-evenly",
//               width: "100px",
//             }}
//           >
//             <ShoppingCart sx={{ color: "#FFFFFF", display: "inline" }} />
//             My cart
//           </Link>
//         </Box>
//         <Divider
//           sx={{
//             height: "25px",
//             bgcolor: "#FFFFFF",
//             [theme.breakpoints.down("md")]: { display: "none" },
//             [theme.breakpoints.between("sm", "md")]: { display: "block" },
//           }}
//           orientation="vertical"
//         />
//         <Box
//           sx={{
//             [theme.breakpoints.down("md")]: { display: "none" },
//             [theme.breakpoints.between("sm", "md")]: { display: "block" },
//           }}
//         >
//           <Box
//             onClick={() => signOut({ callbackUrl: "/" })}
//             sx={{
//               mr: "50px",
//               cursor: "pointer",
//               color: "#FFFFFF",
//               textDecoration: "none",
//               display: "flex",
//               justifyContent: "space-evenly",
//               width: "100px",
//             }}
//           >
//             <Image
//               src="/images/icon_logout.png"
//               alt="icon"
//               height={24}
//               width={24}
//               style={{ display: "inline" }}
//             />
//             Log out
//           </Box>
//         </Box>
//       </Stack>
//       <MenuUserViewResponsive />
//     </Stack>
//   );
// }
