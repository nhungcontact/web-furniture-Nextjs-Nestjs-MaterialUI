import useCategoryDetail from "@/hooks/categories/useCatgoryDetail";
import { GetBlog } from "@/types/blog";
import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
type Props = {
  data: GetBlog;
  handleGetCategory: (value: string) => void;
};
export default function BlogFilterCard({ data, handleGetCategory }: Props) {
  //   const router = useRouter();
  const { data: category } = useCategoryDetail(
    data && data.category ? data.category._id : "",
  );
  //   useEffect(() => {});
  return (
    <>
      {category && (
        <Card
          sx={{ maxWidth: 345, borderRadius: "0", cursor: "pointer" }}
          onClick={() => handleGetCategory(category._id)}
        >
          <Box
            sx={{
              position: "relative",
              textAlign: "center",

              ":before": {
                content: `""`,
                display: "block",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(0, 0, 0, 0.34)",
              },
            }}
          >
            <CardMedia
              component="img"
              height="50"
              image={category.photo ? category.photo.imageURL : "/"}
              alt="green iguana"
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: " translate(-50%, -50%)",
              }}
            >
              <Typography
                variant="body1"
                color="white"
                textAlign="center"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {category.name ?? "-"}
              </Typography>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}
