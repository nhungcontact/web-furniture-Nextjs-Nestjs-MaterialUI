/* eslint-disable max-lines */
import { isValidRole } from "@/helpers/isValidRole";
import useUserDetail from "@/hooks/users/useUserDetail";
import { Menu } from "@/types/menu-item";
import getUser from "@/utils/getUser";
import {
  LineAxis,
  RingVolume,
  ShoppingBasketOutlined,
  Style,
  Warehouse,
} from "@mui/icons-material";
import Image from "next/image";
import { useEffect, useState } from "react";

const YourComponent = () => {
  //   const [permissionList, setUniquePermissions] = useState<Permission[]>([]);
  const [menu, setMenu] = useState<Menu[]>();

  const { data: user } = useUserDetail(getUser() ? getUser()?._id : "");
  //   useEffect(() => {
  //     const data = localStorage.getItem("user");
  //     if (data) {
  //       const dataParse = JSON.parse(data) as GetUser;
  //       //   console.log(user);
  //       setUserId(dataParse._id);
  //     }
  //   }, []);

  useEffect(() => {
    if (user && user.roles) {
      const permissionList = Array.from(
        new Set(user.roles.flatMap((role) => role.permissions)),
      );
      console.log("permissionList", permissionList);
      console.log(isValidRole({ permissionList, role: "ViewOrder" }));
      const MenuItems = [
        {
          navlabel: true,
          subheader: "Dashboard",
          menuItems: [
            {
              //   id: 1,
              title: "Dashboard",
              icon: <LineAxis />,
              href: "/vi",
              allow: true,
            },
          ],
        },

        {
          navlabel: true,
          subheader: "Product Management",
          menuItems: [
            {
              //   id: 2,
              title: "Product",
              icon: <ShoppingBasketOutlined />,
              href: "/vi/products",
              allow: isValidRole({ permissionList, role: "ViewProduct" }),
            },
            {
              //   id: 3,
              title: "Option and Option Value",
              icon: <Style />,
              href: "/vi/options",
              allow: isValidRole({ permissionList, role: "ViewProduct" }),
            },
            {
              //   id: 4,
              title: "Room Furniture",
              icon: (
                <Image
                  src="/images/room.png"
                  width={25}
                  height={25}
                  alt="room"
                />
              ),
              href: "/vi/room-furnitures",
              allow: isValidRole({ permissionList, role: "ViewProduct" }),
            },
            {
              //   id: 5,
              title: "Category",
              icon: (
                <Image
                  src="/images/category.png"
                  width={25}
                  height={25}
                  alt="category"
                />
              ),
              href: "/vi/categories",
              allow: isValidRole({ permissionList, role: "ViewProduct" }),
            },

            {
              //   id: 6,
              title: "Review",
              icon: (
                <Image
                  src="/images/review.png"
                  width={25}
                  height={25}
                  alt="review"
                />
              ),
              href: "/vi/reviews",
              allow: isValidRole({ permissionList, role: "ViewReview" }),
            },
          ],
        },

        {
          navlabel: true,
          subheader: "Warehouse Management",
          menuItems: [
            {
              //   id: 9,
              title: "Provider",
              icon: (
                <Image
                  src="/images/provider.png"
                  width={25}
                  height={25}
                  alt="provider"
                />
              ),
              href: "/vi/providers",
              allow: isValidRole({ permissionList, role: "ViewProvider" }),
              //   allow: true,
            },
            {
              //   id: 10,
              title: "Warehouse Receipt",
              icon: <Warehouse />,
              href: "/vi/warehouse-receipts",
              allow: isValidRole({ permissionList, role: "ViewWarehouseReceipt" }),
            },
          ],
        },

        {
          navlabel: true,
          subheader: "Order Management",
          menuItems: [
            {
              //   id: 11,
              title: "Order",
              icon: (
                <Image
                  src="/images/order.png"
                  width={25}
                  height={25}
                  alt="order"
                />
              ),
              href: "/vi/bills",
              allow: isValidRole({ permissionList, role: "ViewOrder" }),
              //   allow: true,
            },
            {
              //   id: 12,
              title: "Promotion",
              icon: (
                <Image
                  src="/images/promotion.png"
                  width={25}
                  height={25}
                  alt="promotion"
                />
              ),
              href: "/vi/promotions",
              allow: isValidRole({ permissionList, role: "ViewPromotion" }),
            },
            {
              //   id: 13,
              title: "Shipping",
              icon: (
                <Image
                  src="/images/shipping.png"
                  width={25}
                  height={25}
                  alt="shipping"
                />
              ),
              href: "/vi/shippings",
              allow: isValidRole({ permissionList, role: "ViewShipping" }),
            },
          ],
        },
        {
          navlabel: true,
          subheader: "User Management",
          menuItems: [
            {
              //   id: 14,
              title: "User",
              icon: (
                <Image
                  src="/images/user.png"
                  width={25}
                  height={25}
                  alt="user"
                />
              ),
              href: "/vi/users",
              allow: isValidRole({ permissionList, role: "ViewUser" }),
            },
            {
              //   id: 15,
              title: "Role",
              icon: (
                <Image
                  src="/images/role.png"
                  width={25}
                  height={25}
                  alt="role"
                />
              ),
              href: "/vi/roles",
              allow: isValidRole({ permissionList, role: "ViewRole" }),
            },
            {
              //   id: 16,
              title: "Permission",
              icon: (
                <Image
                  src="/images/permission.png"
                  width={25}
                  height={25}
                  alt="permission"
                />
              ),
              href: "/vi/permissions",
              allow: isValidRole({ permissionList, role: "ViewPermission" }),
            },
          ],
        },
        {
          navlabel: true,
          subheader: "Contact Management",
          menuItems: [
            {
              //   id: 17,
              title: "Contact",
              icon: <RingVolume />,
              href: "/vi/contacts",
              allow: isValidRole({ permissionList, role: "ViewPermission" }),
              //   allow: true,
            },
          ],
        },
        {
          navlabel: true,
          subheader: "Blog Management",
          menuItems: [
            {
              //   id: 7,
              title: "Blog",
              icon: (
                <Image
                  src="/images/blog.png"
                  width={25}
                  height={25}
                  alt="blog"
                />
              ),
              href: "/vi/blogs",
              allow: isValidRole({ permissionList, role: "ViewBlog" }),
            },
            {
              //   id: 8,
              title: "Comment",
              icon: (
                <Image
                  src="/images/comment.png"
                  width={25}
                  height={25}
                  alt="comment"
                />
              ),
              href: "/vi/comments",
              allow: isValidRole({ permissionList, role: "ViewComment" }),
            },
          ],
        },
      ];
      console.log("MenuItems", MenuItems);
      setMenu(MenuItems);
    }
  }, [user]);

  return menu;
};

export default YourComponent;
