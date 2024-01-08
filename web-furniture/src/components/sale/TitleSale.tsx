import { Box, Typography } from "@mui/material";
type Props = {
  title: string;
};
export default function TitleSale({ title }: Props) {
  return (
    <Box
      textAlign={"center"}
      mb={8}
    >
      <Typography
        variant="h2"
        fontWeight={"bold"}
        textTransform={"uppercase"}
        sx={{
          background: "red",
          padding: "10px 50px 10px",
          color: "white",
          minWidth: "60%",
          borderRadius: "50px 0px 50px 0px",
          boxShadow: "5px 5px 0px 0px rgba(255,0,0,0.15)",
          position: "relative",
          display: "inline-block",
          margin: 0,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
