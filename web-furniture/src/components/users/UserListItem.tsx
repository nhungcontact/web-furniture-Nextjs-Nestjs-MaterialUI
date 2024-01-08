"use client";

import { User } from "@/types/user";
import OptionIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type UserListItemProps = {
  user: User;
};

UserListItem.height = 72;

function UserListItem({ user }: UserListItemProps) {
  const t = useTranslations("UserListItem");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [anchorPopup, setAnchorPopup] = useState<Element>();

  const handleClosePopup = () => setAnchorPopup(undefined);

  const handleOpenPopup = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorPopup(e.currentTarget);
  };

  const handleClickDetail = () => {
    router.push(`/users/${user._id}?${searchParams}`);
  };

  const handleClickEdit = () => {
    handleClosePopup();
    router.push(`/users/${user._id}/edit?${searchParams}`);
  };

  const handleClickDelete = () => {
    handleClosePopup();
    router.push(`/users/${user._id}/remove?${searchParams}`);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            onClick={handleOpenPopup}
          >
            <OptionIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton onClick={handleClickDetail}>
          <ListItemAvatar>
            <Avatar>
              <Image
                src={user.avatar}
                alt=""
                fill
                sizes="40px"
                unoptimized
              />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={user.displayName}
            secondary={user.email}
          />
        </ListItemButton>
      </ListItem>
      <Menu
        anchorEl={anchorPopup}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorPopup)}
        onClose={handleClosePopup}
      >
        <MenuItem onClick={handleClickEdit}>{t("option.edit")}</MenuItem>
        <MenuItem onClick={handleClickDelete}>{t("option.delete")}</MenuItem>
      </Menu>
    </>
  );
}

export default UserListItem;
