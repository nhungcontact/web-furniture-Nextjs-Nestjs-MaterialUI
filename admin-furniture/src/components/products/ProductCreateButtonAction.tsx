import { Button, CardActions } from "@mui/material";

export default function ProductCreateButtonAction() {
  return (
    <CardActions sx={{ justifyContent: "end", padding: "20px" }}>
      <Button
        size="large"
        variant="contained"
        className="btn-cancel"
        sx={{ mr: 2 }}
      >
        Cancel
      </Button>
      <Button
        size="large"
        type="submit"
        form="create-product"
        variant="contained"
        className="btn-action"
      >
        Create
      </Button>
    </CardActions>
  );
}
