// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import Sale from "@/components/sale/Sale";
import { Divider } from "@mui/material";

async function SalePage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return (
    <>
      <Divider />
      <Sale />
    </>
  );
}

export default SalePage;
