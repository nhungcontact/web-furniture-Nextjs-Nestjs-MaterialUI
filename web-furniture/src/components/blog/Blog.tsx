/* eslint-disable max-lines */
"use client";
import useBlogList from "@/hooks/blogs/useBlogList";
import useQueryParams from "@/hooks/shared/useQueryParams";
import { Blog, BlogStatus, GetBlog } from "@/types/blog";
import { ListOptions } from "@/types/shared";
import { Box, Button, Container, Grid, LinearProgress, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BannerBlog } from "./BannerBlog";
import BlogBreadCrumbs from "./BlogBreandCrumbs";
import BlogCard from "./BlogCard";
import BlogFilterCard from "./BlogFilterCard";
import BlogSearch from "./BlogSearch";

export default function Blog() {
  const [options, setOptions] = useQueryParams<ListOptions<Blog>>({
    limit: 6,
    offset: 0,
    status: BlogStatus.Approved,
  });
  const { data: blogList, isLoading: isLoadingBlog } = useBlogList(options);
  const { data: blogListNotOption, isLoading } = useBlogList({
    status: BlogStatus.Approved,
  });
  const [dataBlog, setDataBlog] = useState<GetBlog[]>();
  const handleGetCategory = (value: string) => {
    setOptions({
      category: value,
    });
  };

  const handleLoadMore = () => {
    if (options && options.limit) {
      setOptions({
        limit: options.limit + 6,
      });
    }
  };
  const handleSearchChange = (value?: string) => {
    console.log(value);
    setOptions({
      search: value,
      offset: 0,
    });
  };

  useEffect(() => {
    if (blogListNotOption && blogListNotOption.items) {
      const filtered = blogListNotOption.items.reduce<GetBlog[]>(
        (accumulator, current) => {
          if (!accumulator.find((item) => item.category._id === current.category._id)) {
            accumulator.push(current);
          }
          return accumulator;
        },
        [],
      );

      setDataBlog(filtered);
    }
  }, [blogListNotOption]);

  return (
    <>
      <BannerBlog />
      <Container
        maxWidth={"xl"}
        sx={{ paddingY: 2 }}
      >
        <Grid
          container
          columnSpacing={8}
          justifyContent="center"
          my={4}
        >
          <Grid
            item
            xs={3}
          >
            <BlogSearch
              getValueSearch={handleSearchChange}
              defaultValueSearch={options.search}
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              my={2}
            >
              Categories
            </Typography>
            <Grid
              container
              rowSpacing={2}
            >
              {dataBlog &&
                dataBlog.length > 0 &&
                dataBlog.map((item) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      key={item._id}
                    >
                      <BlogFilterCard
                        data={item}
                        handleGetCategory={handleGetCategory}
                      />
                    </Grid>
                  );
                })}
              <Grid
                item
                xs={12}
                my={4}
              >
                <Box
                  sx={{ background: "#F4F4F4" }}
                  p={2}
                >
                  <Box mb={2}>
                    <Typography fontWeight="bold">Top News</Typography>
                  </Box>
                  <Grid container>
                    {blogList &&
                      blogList.items &&
                      blogList.items.length > 0 &&
                      blogList.items.map((item) => {
                        return item.isNew === true ? (
                          <Grid
                            item
                            xs={12}
                            key={item._id}
                          >
                            <Grid
                              container
                              justifyContent="space-between"
                              spacing={2}
                            >
                              <Grid
                                item
                                xs={12}
                                md={4}
                              >
                                {item.photo && (
                                  <Image
                                    src={item.photo.imageURL ?? "/"}
                                    alt={item.photo.name ?? "/"}
                                    width={80}
                                    height={60}
                                    unoptimized
                                    style={{
                                      boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                                    }}
                                  />
                                )}
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                md={8}
                                mb={2}
                              >
                                <Typography
                                  variant="body2"
                                  fontWeight="bold"
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  component="div"
                                  fontWeight="bold"
                                  color="grey"
                                  mb={1}
                                >
                                  {item.roomFurniture.name} -{" "}
                                  {new Date(item.createdAt).toDateString() ?? "-"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                          <Typography>No blogs</Typography>
                        );
                      })}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={8}
          >
            <Grid
              container
              justifyContent="left"
              spacing={4}
            >
              <Grid
                item
                xs={12}
              >
                {!options.category && (
                  <Typography
                    variant="h4"
                    fontWeight={"bold"}
                  >
                    All Blogs
                  </Typography>
                )}
                {options && options.category && (
                  <BlogBreadCrumbs cat={options.category} />
                )}
              </Grid>
              {blogList &&
                blogList.items &&
                blogList.items.length > 0 &&
                blogList.items.map((item) => (
                  <BlogCard
                    data={item}
                    key={item._id}
                  />
                ))}
              {isLoadingBlog && (
                <LinearProgress
                  sx={{ position: "absolute", top: 0, right: 0, left: 0 }}
                />
              )}
            </Grid>
            {blogList && blogList.items && blogList.items.length > 5 && (
              <Grid
                item
                xs={12}
                my={6}
                textAlign="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 0 }}
                  onClick={handleLoadMore}
                >
                  <Typography textTransform="capitalize">Load More</Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
