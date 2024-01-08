// import { UserRole } from "@/types/user";
// import { assertRole } from "@/utils/session";
import CheckoutWithStripe from "@/components/checkout/checkout-with-stripe/CheckoutWithStripe";

async function CheckoutWithStripePage() {
  // await assertRole([UserRole.Admin, UserRole.Manager]);

  return <CheckoutWithStripe />;
}

export default CheckoutWithStripePage;
