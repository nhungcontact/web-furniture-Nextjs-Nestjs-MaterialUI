import { Button, CardActions } from "@mui/material";
type Props = {
  handleReset: () => void;
};
export default function BlogCreateButtonAction({ handleReset }: Props) {
  return (
    <CardActions sx={{ justifyContent: "end", padding: "20px" }}>
      <Button
        size="large"
        variant="contained"
        className="btn-cancel"
        sx={{ mr: 2 }}
        // onClick={() => router.push("/blogs")}
        onClick={handleReset}
      >
        Reset
      </Button>
      <Button
        size="large"
        type="submit"
        form="create-blog"
        variant="contained"
        className="btn-action"
      >
        Create
      </Button>
    </CardActions>
  );
}
