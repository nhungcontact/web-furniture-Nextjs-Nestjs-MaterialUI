import React from "react";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Image from "next/image";
import RatingReview from "@/components/shared/RatingReview";
import { Photo } from "@/types/photo";
import { GetReview } from "@/types/review";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
type Props = {
  open: boolean;
  handleClose: () => void;
  src: Photo[];
  data: GetReview;
};
export default function ProductDetailReviewImage({
  open,
  handleClose,
  src,
  data,
}: Props) {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={"md"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography
            variant="body1"
            fontWeight={600}
          >
            Customer Photos
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {src.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={item.imageURL ?? "/"}
                  alt={item.name ?? "-"}
                  unoptimized
                  width="0"
                  height="400"
                  sizes="100vw"
                  style={{ width: "-webkit-fill-available", objectFit: "contain" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box marginTop={2}>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                columnGap={1}
                marginBottom={1}
              >
                <Avatar
                  alt={data.user.username}
                  src={data.user.avatar?.imageURL ?? "/"}
                />
                <Typography variant="body1">
                  {data.user.firstName + " " + data.user.lastName}
                </Typography>
              </Box>
              <Typography variant="body1">
                {new Date(data.createdAt).toLocaleString()}
              </Typography>
            </Box>
            <RatingReview defaultValue={data.rating ?? 5} />
            {!!data.productSku.optionValues &&
              !!data.productSku.optionValues.length &&
              data.productSku.optionValues.map((value) => (
                <Box key={value._id}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    display={"inline"}
                  >
                    {value.optionSku.name}:
                  </Typography>
                  <Typography
                    variant="body1"
                    display={"inline"}
                  >
                    {value.name}&quot;
                  </Typography>
                </Box>
              ))}
            <Typography
              variant="body1"
              marginTop={1}
            >
              {data.content ??
                "The Natural does not match the picture at ALL. It is way darker and warmer than...."}
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
