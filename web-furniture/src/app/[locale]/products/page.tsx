// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import React from "react";

async function ProductPage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return (
    <div style={{ margin: "auto", marginTop: 100, width: 500, textAlign: "center" }}>
      <strong>You are qualified!</strong>
    </div>
  );
}

export default ProductPage;
