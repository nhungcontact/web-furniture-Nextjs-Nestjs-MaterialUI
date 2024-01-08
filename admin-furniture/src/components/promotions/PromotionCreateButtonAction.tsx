import { Button, CardActions } from "@mui/material";

export default function PromotionCreateButtonAction() {
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
        form="create-promotion"
        variant="contained"
        className="btn-action"
      >
        Create
      </Button>
    </CardActions>
  );
}
