"use client";

import useUserDetail from "@/hooks/users/useUserDetail";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import Image from "next/image";
import LoadingContent from "../shared/LoadingContent";
import ErrorContent from "../errors/ErrorContent";
import CustomLink from "../shared/CustomLink";
import { useSearchParams } from "next/navigation";
import useRole from "@/hooks/shared/useRole";
import { UserRole } from "@/types/user";

export type UserDetailProps = {
  userId: string;
};

function UserDetail({ userId }: UserDetailProps) {
  const [roleMatched] = useRole([UserRole.Admin, UserRole.Manager]);
  const searchParams = useSearchParams();
  const {
    data: user,
    error,
    isLoading,
    isValidating,
  } = useUserDetail(roleMatched ? userId : undefined);

  if (roleMatched == undefined) {
    return <LoadingContent caption="Checking..." />;
  }

  if (isLoading) {
    return <LoadingContent caption="Loading data..." />;
  }

  if (!roleMatched) {
    return (
      <ErrorContent error={{ name: "Forbidden", message: "The content is restricted" }} />
    );
  }

  if (error) {
    return <ErrorContent error={{ name: error.code, message: error.message }} />;
  }

  if (!user) {
    return (
      <ErrorContent
        severity="warning"
        error={{ name: "Empty", message: "No data found" }}
      />
    );
  }

  return (
    <Box
      p={2}
      position={"relative"}
    >
      {isValidating && (
        <LinearProgress sx={{ position: "absolute", top: 0, right: 0, left: 0 }} />
      )}
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          container
          justifyContent={"center"}
        >
          <Avatar sx={{ height: 100, width: 100 }}>
            <Image
              src={user.avatar}
              alt=""
              fill
              sizes="100px"
              unoptimized
            />
          </Avatar>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h5"
            textAlign={"center"}
          >
            {user.displayName}
          </Typography>
          <Typography
            variant="body2"
            textAlign={"center"}
          >
            {user.email}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Typography>ID: {user._id}</Typography>
          <Typography>Login: {user.username}</Typography>
          <Typography>Phone number: {user.tel}</Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            href={`/users/${user._id}/edit?${searchParams}`}
            LinkComponent={CustomLink}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2, ml: 2 }}
            href={`/users/${user._id}/remove?${searchParams}`}
            LinkComponent={CustomLink}
            color="error"
          >
            Remove
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel aliquam
            libero. Sed risus ex, malesuada blandit arcu ac, molestie dictum orci. Integer
            elementum dolor quam, eget fermentum lacus euismod sit amet.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserDetail;
