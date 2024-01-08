// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import Checkout from "@/components/checkout/Checkout";
import React from "react";

async function CheckoutPage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return <Checkout />;
}

export default CheckoutPage;
