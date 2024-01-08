// "use client";
// import React from "react";
// import Link from "next/link";
// import { signOut } from "next-auth/react";
// import {
//   Box,
//   List,
//   ListItem,
//   Typography,
//   Avatar,
//   SwipeableDrawer,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { theme } from "@/config/theme";
// import useUserInfor from "@/hooks/users/useUserInformation";

// export default function MenuUserViewResponsive() {
//   const [state, setState] = React.useState<boolean>(false);
//   const { data } = useUserInfor();
//   const toggleDrawer =
//     (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (
//         event &&
//         event.type === "keydown" &&
//         ((event as React.KeyboardEvent).key === "Tab" ||
//           (event as React.KeyboardEvent).key === "Shift")
//       ) {
//         return;
//       }
//       setState(open);
//     };
//   const list = () => {
//     return (
//       <Box
//         sx={{ width: 250 }}
//         role="presentation"
//         onClick={toggleDrawer(false)}
//       >
//         <List
//           sx={{
//             width: 250,
//           }}
//         >
//           <ListItem sx={{ bgcolor: "rgba(128,128,128,0.2)" }}>
//             <Link
//               href={"/profile"}
//               style={{
//                 textDecoration: "none",
//                 width: "100%",
//                 display: "flex",
//                 justifyContent: "start",
//                 alignItems: "center",
//               }}
//             >
//               <Avatar
//                 alt="avt user"
//                 src={data?.avatar?.imageURL}
//                 sx={{ mr: "20px" }}
//               />
//               <Typography
//                 variant="body2"
//                 color={"primary"}
//                 sx={{ cursor: "default" }}
//               >
//                 {data?.displayName}
//               </Typography>
//             </Link>
//           </ListItem>
//           <ListItem>
//             <Link
//               href={
//                 data?.role === "ADMIN"
//                   ? "/admin/dashboard"
//                   : data?.role === "FACILITY_OWNER"
//                   ? "/owner/dashboard"
//                   : "/cart"
//               }
//               style={{ textDecoration: "none", color: "blue" }}
//             >
//               {data?.role === "ADMIN"
//                 ? "Manage"
//                 : data?.role === "FACILITY_OWNER"
//                 ? "Manage"
//                 : "My cart"}
//             </Link>
//           </ListItem>
//           <ListItem onClick={() => signOut({ callbackUrl: "/" })}>
//             <Link
//               href={"#"}
//               style={{ textDecoration: "none", color: "blue" }}
//             >
//               Log out
//             </Link>
//           </ListItem>
//         </List>
//       </Box>
//     );
//   };

//   return (
//     <>
//       <Button
//         onClick={toggleDrawer(true)}
//         sx={{
//           [theme.breakpoints.up("md")]: {
//             display: "none",
//           },
//           [theme.breakpoints.down("md")]: {
//             position: "relative",
//             top: "13px",
//             left: "-333px",
//           },
//           [theme.breakpoints.between("sm", "md")]: {
//             display: "none",
//           },
//         }}
//       >
//         <MenuIcon sx={{ fontSize: "35px" }} />
//       </Button>
//       <SwipeableDrawer
//         anchor={"right"}
//         open={state}
//         onClose={toggleDrawer(false)}
//         onOpen={toggleDrawer(true)}
//       >
//         {list()}
//       </SwipeableDrawer>
//     </>
//   );
// }
