import useProductDetail from "@/hooks/products/useProductDetail";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

// function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }
export default function BasicBreadcrumbs() {
  const [url, setUrl] = useState<string[]>([]);
  const { data: productDetail } = useProductDetail(url[url.length - 1]);
  useEffect(() => {
    const myArray = window.location.pathname.split("/");
    const valuesToRemove = ["", "vi"];
    const filteredItems = myArray.filter((item) => !valuesToRemove.includes(item));
    if (myArray) {
      setUrl(filteredItems);
    }
  }, []);
  console.log(url);
  return (
    <div
      role="presentation"
      //   onClick={handleClick}
    >
      <Breadcrumbs aria-label="breadcrumb">
        {url.map((item, index) => {
          return (
            index !== url.length - 1 && (
              <Link
                underline="hover"
                color="inherit"
                href={`${url[index - 2] ? "/" + url[index - 2] : ""}${
                  url[index - 1] ? "/" + url[index - 1] : ""
                }/${item}`}
              >
                <Typography textTransform="capitalize">
                  {item === "product-detail" ? "Product Detail" : item}
                </Typography>
              </Link>
            )
          );
        })}

        <Typography
          color="text.primary"
          textTransform="capitalize"
        >
          {productDetail ? productDetail.name : url[url.length - 1]}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
