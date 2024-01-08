// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import Cart from "@/components/cart/Cart";
import React from "react";

async function CartPage() {
  //   const [passed, user] = await assertRole([UserRole.Admin, UserRole.Manager], {
  //     returnResult: true,
  //   });

  //   if (!user) {
  //     return (
  //       <div
  //         style={{
  //           margin: "auto",
  //           marginTop: 100,
  //           width: 500,
  //           textAlign: "center",
  //           color: "red",
  //         }}
  //       >
  //         <strong>Please Login!</strong>
  //       </div>
  //     );
  //   }

  //   if (!passed) {
  //     return (
  //       <div
  //         style={{
  //           margin: "auto",
  //           marginTop: 100,
  //           width: 500,
  //           textAlign: "center",
  //           color: "red",
  //         }}
  //       >
  //         <strong>You are not allowed to see this!</strong>
  //       </div>
  //     );
  //   }

  return (
    <>
      <Cart />
    </>
  );
}

export default CartPage;
