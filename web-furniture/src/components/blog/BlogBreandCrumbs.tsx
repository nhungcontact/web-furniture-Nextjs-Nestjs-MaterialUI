import useCategoryDetail from "@/hooks/categories/useCatgoryDetail";
import { Breadcrumbs, Link, Typography } from "@mui/material";
type Props = {
  cat: string;
};
export default function BlogBreadCrumbs({ cat }: Props) {
  const { data: catDetail } = useCategoryDetail(cat ? cat : "");
  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumb"
    >
      <Link
        underline="hover"
        key="1"
        color="inherit"
        href="/blog"
        //   onClick={handleClick}
      >
        <Typography
          fontWeight="bold"
          color="text.primary"
        >
          All
        </Typography>
      </Link>

      <Typography
        fontWeight="bold"
        color="text.primary"
      >
        {catDetail && catDetail.name}
      </Typography>
    </Breadcrumbs>
  );
}
