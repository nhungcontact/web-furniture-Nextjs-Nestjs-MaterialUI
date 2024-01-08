/* eslint-disable max-lines */
"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LeafletMap from "./Map";
import { useTranslations } from "next-intl";
import { FormEvent, useRef } from "react";
import useContactCreate from "@/hooks/contacts/useContactCreate";
import { jsonForm } from "@/utils/form";
import { ContactCreateInput, ContactStatus } from "@/types/contact";
import { useSnackbar } from "notistack";
export default function Contact() {
  const t = useTranslations("MainPage");
  const { trigger: createContact } = useContactCreate();
  const { enqueueSnackbar } = useSnackbar();
  const formRef = useRef<HTMLFormElement>(null);

  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const json = jsonForm(event.currentTarget);
    createContact({
      body: {
        username: json.username,
        email: json.email,
        phoneNumber: json.phoneNumber,
        contact: json.contact,
        status: ContactStatus.NoResponse,
      } as ContactCreateInput,
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
  };
  return (
    <>
      <Divider />

      <Grid
        container
        columnSpacing={2}
      >
        <Grid
          item
          xs={12}
          md={6}
        >
          <LeafletMap />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Container>
            <Typography
              variant="h1"
              fontWeight={"bold"}
              sx={{
                ":after": {
                  content: `""`,
                  display: "block",
                  width: "50px",
                  height: "5px",
                  marginTop: "20px",
                  background: "#252a2b",
                  marginBottom: "50px",
                },
              }}
            >
              {t("Contact")}
            </Typography>
            <Box my={4}>
              <Typography
                variant="h5"
                sx={{ color: "#666" }}
              >
                {t("Our address")}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"bold"}
              >
                KTX A, Đại học Cần Thơ, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần
                Thơ
              </Typography>
            </Box>
            <Box my={4}>
              <Typography
                variant="h5"
                sx={{ color: "#666" }}
              >
                {t("Our Email")}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"bold"}
              >
                furnit@furniture.com
              </Typography>
            </Box>
            <Box my={4}>
              <Typography
                variant="h5"
                sx={{ color: "#666" }}
              >
                {t("Our phone number")}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"bold"}
              >
                1900.636.099
              </Typography>
            </Box>
            <Box my={4}>
              <Typography
                variant="h5"
                sx={{ color: "#666" }}
              >
                {t("Working hours")}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"bold"}
              >
                {t("Monday to Friday from 8:00 AM to 6:00 PM")}. <br />
                {t("Saturday and Sunday from 8:00 AM to 5:00 PM")}.
              </Typography>
            </Box>
            <Box my={6}>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                  ":after": {
                    content: `""`,
                    display: "block",
                    width: "50px",
                    height: "5px",
                    marginTop: "20px",
                    background: "#252a2b",
                    marginBottom: "50px",
                  },
                }}
              >
                {t("Send your inquiries to us")}
              </Typography>
              <form
                onSubmit={handleContact}
                id="create-contact"
                ref={formRef}
              >
                <TextField
                  fullWidth
                  placeholder={t("Enter a name")}
                  name="username"
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      background: "#fbfbfb",
                      borderRadius: 0,
                      "& fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&:hover fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #e7e7e7",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder={t("Enter a email")}
                  name="email"
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      background: "#fbfbfb",
                      borderRadius: 0,
                      "& fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&:hover fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #e7e7e7",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  placeholder={t("Enter a phone number")}
                  name="phoneNumber"
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      background: "#fbfbfb",
                      borderRadius: 0,
                      "& fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&:hover fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #e7e7e7",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  rows={5}
                  multiline
                  placeholder={t("Enter a content")}
                  name="contact"
                  sx={{
                    mb: 4,
                    "& .MuiOutlinedInput-root": {
                      background: "#fbfbfb",
                      borderRadius: 0,
                      "& fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&:hover fieldset": {
                        borderColor: "#e7e7e7",
                      },
                      "&.Mui-focused fieldset": {
                        border: "1px solid #e7e7e7",
                      },
                    },
                  }}
                />
                <Box>
                  <Button
                    variant="contained"
                    sx={{ borderRadius: 0, width: "150px" }}
                    size="large"
                    type="submit"
                    form="create-contact"
                  >
                    {t("Send to us")}
                  </Button>
                </Box>
              </form>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
