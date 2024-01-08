/* eslint-disable max-lines */
"use client";
import { primary } from "@/config/theme";
import useBlogAddComment from "@/hooks/blogs/useBlogAddComment";
import useBlogDetail from "@/hooks/blogs/useBlogDetail";
import useUserInfor from "@/hooks/users/useUserInfor";
import { jsonForm } from "@/utils/form";
import { CalendarMonth, Message, Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FormEvent, useRef } from "react";

import { CommentStatus } from "@/types/comment";
import { useSnackbar } from "notistack";
import { useTranslations } from "next-intl";

export default function BlogDetail() {
  const t = useTranslations("MainPage");
  const formRef = useRef<HTMLFormElement>(null);

  const param = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { data: detail } = useBlogDetail(param.id as any);
  const { data: user } = useUserInfor();
  const { trigger: addComment } = useBlogAddComment(detail ? detail._id : "");

  const handleClearComment = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };
  const handleSubmitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = jsonForm(event.currentTarget);
    if (user) {
      console.log("sadsa");
      addComment({
        body: {
          comment: json.comment as string,
          status: CommentStatus.UnApproved,
          user: user._id,
        },
      })
        .then(() => {
          enqueueSnackbar("successfully", {
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          if (formRef.current) {
            formRef.current.reset();
          }
        })
        .catch((e) => {
          enqueueSnackbar(e?.message, {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
        });
    }
  };

  return (
    <>
      <Divider />
      <Container sx={{ pb: 6, pt: 2 }}>
        {detail && (
          <Grid container>
            <Grid
              item
              xs={12}
              mb={2}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  href="/blog"
                >
                  {t("Blog")}
                </Link>
                <Typography
                  color="text.primary"
                  fontWeight={"bold"}
                >
                  {detail.name}
                </Typography>
              </Breadcrumbs>
            </Grid>
            {detail.photo && (
              <Grid
                item
                xs={12}
                mb={2}
              >
                <Image
                  src={detail.photo.imageURL ?? "/"}
                  alt={detail.photo.name ?? "-"}
                  width={600}
                  height={400}
                  unoptimized
                  style={{
                    width: "-webkit-fill-available",
                  }}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              mb={1}
            >
              <Typography
                variant="h4"
                fontWeight={"bold"}
              >
                {detail.name}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              mb={4}
            >
              <Box
                display="flex"
                textAlign={"center"}
              >
                <Person
                  color="error"
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography
                  variant="body2"
                  color="GrayText"
                  sx={{ borderRight: "1px solid #A9A9A9", pr: 2 }}
                >
                  Actor: {detail.actor}
                </Typography>
                <CalendarMonth
                  color="error"
                  fontSize="small"
                  sx={{ ml: 2, mr: 1 }}
                />
                <Typography
                  variant="body2"
                  color="GrayText"
                  sx={{ borderRight: "1px solid #A9A9A9", pr: 2 }}
                >
                  {new Date(detail.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Typography>
                <Message
                  color="error"
                  fontSize="small"
                  sx={{ ml: 2, mr: 1 }}
                />
                <Typography
                  variant="body2"
                  color="GrayText"
                >
                  {detail.comments.length} comment
                </Typography>
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              mb={4}
              sx={{ background: "#F8F8F8", p: 2, borderLeft: "3px solid red" }}
            >
              <Typography
                variant="body2"
                color="GrayText"
              >
                {detail.description}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ background: "#F5F5F5", px: 2, py: 1 }}
              mb={4}
            >
              <div dangerouslySetInnerHTML={{ __html: detail.content }} />
            </Grid>
            <Grid
              item
              xs={12}
              mb={4}
            >
              <Typography
                variant="body1"
                fontWeight="bold"
                sx={{ borderLeft: "3px solid red", pl: 1 }}
                mb={2}
              >
                Comments ({detail.comments.length})
              </Typography>
              {!!detail.comments &&
                !!detail.comments.length &&
                detail.comments.map((item) => {
                  return (
                    item.status === CommentStatus.Approved && (
                      <Box
                        key={item._id}
                        display={"flex"}
                        alignItems={"start"}
                        sx={{ background: `${primary[50]}`, p: 2, mb: 2 }}
                      >
                        <Avatar
                          src={
                            item.user.avatar
                              ? item.user.avatar.imageURL
                              : item.user.username
                          }
                          alt={item.user.avatar ? item.user.username : item.user.username}
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box marginLeft={4}>
                          <Typography
                            variant="body1"
                            fontWeight="bold"
                          >
                            {item.user.username}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="GrayText"
                            mb={2}
                          >
                            {new Date(item.createdAt).toLocaleString()}
                          </Typography>
                          <Typography variant="body1">{item.comment}</Typography>
                        </Box>
                      </Box>
                    )
                  );
                })}
            </Grid>
            <Grid
              item
              xs={12}
            >
              <form
                onSubmit={handleSubmitComment}
                ref={formRef}
              >
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  sx={{ borderLeft: "3px solid red", pl: 1 }}
                  mb={2}
                >
                  Write a comment
                </Typography>
                <TextField
                  disabled={user ? false : true}
                  fullWidth
                  multiline
                  rows={4}
                  name="comment"
                  placeholder="Write a comment here"
                  helperText={
                    user ? (
                      "Comments will be moderated before being displayed."
                    ) : (
                      <Box>
                        <Typography
                          variant="caption"
                          mr={1}
                        >
                          Log in or register an account to comment!
                        </Typography>
                        <Link href={"/signin"}>Login</Link>
                      </Box>
                    )
                  }
                />
                <Box textAlign={"end"}>
                  <Button
                    variant="contained"
                    className="btn-cancel"
                    type="submit"
                    sx={{ mr: 2 }}
                    onClick={handleClearComment}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    className="btn-action"
                    type="submit"
                  >
                    Send Comment
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
