"use client";

import React from "react";
import HeaderLayout from "./HeaderLayout";
import CurrentUserView from "./views/CurrentUserView";
import useCurrentUser from "@/hooks/shared/useCurrentUser";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import useFacilityDetail from "@/hooks/facilities/useFacilityDetail";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: MainLayoutProps) {
  const param = useParams();
  const { data: facility } = useFacilityDetail(param.id);
  const pathname = usePathname();
  const [userData] = useCurrentUser();
  return (
    <>
      {pathname === "/vi/login" ||
        pathname === "/vi/signup" ||
        pathname === "/vi/admin/dashboard" ||
        pathname === "/vi/admin/customers" ||
        pathname === "/vi/owner/manage" ||
        pathname === "/vi/owner/manage/create-information" ||
        pathname === "/vi/owner/manage/create-package-type" ||
        pathname === "/vi/owner/manage/create-package" ||
        pathname === `/vi/owner/manage/create-package/package/${facility?._id}` ||
        pathname === `/vi/owner/manage/create-package/add/${param.id}` ||
        pathname === "/vi/owner/manage/update-image" ||
        pathname === `/vi/owner/manage/update-image/add/${facility?._id}` ||
        pathname === "/vi/owner/manage/list-facility" ||
        pathname === `/vi/owner/manage/create-package-type/add/${facility?._id}` ||
        pathname === "/vi/owner/dashboard" ||
        pathname === "/vi/owner/bill-item" ||
        pathname === "/vi/owner/manage-schedule" ? (
        children
      ) :
        pathname === "/vi/result" ||
          pathname === "/vi/cart" ||
          pathname === "/vi/payment" ||
          pathname === "/vi/profile" ||
          pathname === `/vi/gym-detail/${param.id}` ? (
          <>
            {!userData ? <HeaderLayout /> : <CurrentUserView />}
            {children}
          </>
        ) : (
          <>
            {!userData ? <HeaderLayout /> : <CurrentUserView />}
            <main
              style={{
                minHeight: "100vh",
                top: 0,
                left: 0,
              }}
            >
              <Image
                src={"/images/gym-fitness-banner3.jpg"}
                alt={""}
                fill
                style={{
                  objectFit: "cover",
                  zIndex: -1,
                }}
              />
              <Box
                sx={{
                  content: '""',
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.7)",
                }}
              ></Box>
              {children}
            </main>
          </>
        )}
    </>
  );
}

export default MainLayout;
