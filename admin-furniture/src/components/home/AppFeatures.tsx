"use client";

import { Container, Grid, Paper, Typography } from "@mui/material";
import Icon1 from "@mui/icons-material/Thunderstorm";
import { useTranslations } from "next-intl";

function AppFeatures() {
  const t = useTranslations("AppFeatures");

  return (
    <Container
      maxWidth="xl"
      sx={{ minHeight: 400, py: 5 }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <Typography
            variant="h3"
            textAlign={"center"}
            sx={{ mb: 3 }}
          >
            {t("title")}
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper sx={{ p: 2 }}>
            <Icon1
              sx={{ fontSize: 64 }}
              color="disabled"
            />
            <Typography
              variant="h5"
              lineHeight={2}
            >
              {t("subtitle")}
            </Typography>
            <Typography color={"textSecondary"}>{t("description")}</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper sx={{ p: 2 }}>
            <Icon1
              sx={{ fontSize: 64 }}
              color="disabled"
            />
            <Typography
              variant="h5"
              lineHeight={2}
            >
              {t("subtitle")}
            </Typography>
            <Typography color={"textSecondary"}>{t("description")}</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper sx={{ p: 2 }}>
            <Icon1
              sx={{ fontSize: 64 }}
              color="disabled"
            />
            <Typography
              variant="h5"
              lineHeight={2}
            >
              {t("subtitle")}
            </Typography>
            <Typography color={"textSecondary"}>{t("description")}</Typography>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
        >
          <Paper sx={{ p: 2 }}>
            <Icon1
              sx={{ fontSize: 64 }}
              color="disabled"
            />
            <Typography
              variant="h5"
              lineHeight={2}
            >
              {t("subtitle")}
            </Typography>
            <Typography color={"textSecondary"}>{t("description")}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppFeatures;
