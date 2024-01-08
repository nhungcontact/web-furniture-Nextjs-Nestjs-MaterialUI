import { GetBlog } from "@/types/blog";
import { convertToSlug } from "@/utils/convertToSlug";
import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";

type Props = {
  data: GetBlog;
};

export default function BlogCard({ data }: Props) {
  const router = useRouter();
  const formatDate = (value: any) => {
    const dateString = new Date(value).toDateString();
    return dateString;
  };

  const handleClick = (id: string) => {
    // router.push(
    //   {
    //     pathname: "/product/detail/[id]",
    //     query: { id: id },
    //   },
    //   undefined, // This is the correct placement for the second argument
    //   { shallow: true }, // This is the third argument
    // );

    router.push(`blog/blog-detail/${id}`);
  };
  return (
    <>
      <Grid
        item
        xs={6}
        md={4}
      >
        <Card
          sx={{ maxWidth: 345 }}
          onClick={() => handleClick(data._id)}
        >
          <CardActionArea>
            {data.photo && (
              <CardMedia
                component="img"
                height="140"
                image={data.photo.imageURL ?? "/"}
                alt={data.photo.name ?? "/"}
                key={data.photo._id}
              />
            )}
            <CardContent>
              <Grid container>
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    variant="caption"
                    fontWeight="bold"
                    color="grey"
                    mb={1}
                  >
                    {data.roomFurniture.name} - {formatDate(data.createdAt) ?? "-"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    gutterBottom
                    variant="body1"
                    fontWeight="bold"
                  >
                    {data.name ?? "-"}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {data.description ?? "-"}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </>
  );
}
