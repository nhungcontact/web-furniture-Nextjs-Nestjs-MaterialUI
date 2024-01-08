import { Button, CardActions } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ShippingCreateButtonAction() {
  const router = useRouter();
  return (
    <CardActions sx={{ justifyContent: "end", padding: "20px" }}>
      <Button
        size="large"
        variant="contained"
        className="btn-cancel"
        sx={{ mr: 2 }}
        onClick={() => router.push("/shippings")}
      >
        Cancel
      </Button>
      <Button
        size="large"
        type="submit"
        form="create-shipping"
        variant="contained"
        className="btn-action"
      >
        Create
      </Button>
    </CardActions>
  );
}
