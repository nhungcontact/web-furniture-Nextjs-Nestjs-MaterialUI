/* eslint-disable max-lines */
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
export default function ActivityTimeline() {
  return (
    <Card>
      <CardHeader
        title="Statistics Card"
        titleTypographyProps={{
          sx: {
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ p: 0 }}>
        <Timeline
          sx={{
            pt: 0,
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: "rgb(255, 76, 81)",
                  boxShadow: "rgba(255, 76, 81, 0.12) 0px 0px 0px 3px",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid
                container
                justifyContent="space-between"
              >
                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    8 Invoices have been paid
                  </Typography>
                  <Typography variant="body1">
                    Invoices have been paid to the company.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  textAlign={{ xs: "left", md: "right" }}
                >
                  <Typography variant="caption">Wednesday</Typography>
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: "rgb(22, 177, 255)",
                  boxShadow: "rgba(22, 177, 255, 0.12) 0px 0px 0px 3px",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid
                container
                justifyContent="space-between"
              >
                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    Create a new project for client
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={1}
                  >
                    Invoices have been paid to the company.
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Avatar
                      alt="avatar"
                      src="/images/bussiness-man.png"
                      sx={{ width: 26, height: 26 }}
                    />
                    <Typography ml={1}>John Doe (Client)</Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  textAlign={{ xs: "left", md: "right" }}
                >
                  <Typography variant="caption">Wednesday</Typography>
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: "rgb(255, 76, 81)",
                  boxShadow: "rgba(255, 76, 81, 0.12) 0px 0px 0px 3px",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid
                item
                xs={12}
                md={8}
              >
                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  8 Invoices have been paid
                </Typography>
                <Typography variant="body1">
                  Invoices have been paid to the company.
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={4}
                textAlign={{ xs: "left", md: "right" }}
              >
                <Typography variant="caption">Wednesday</Typography>
              </Grid>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot
                sx={{
                  background: "rgb(255, 180, 0)",
                  boxShadow: "rgba(255, 180, 0, 0.12) 0px 0px 0px 3px",
                }}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid
                container
                justifyContent="space-between"
              >
                <Grid
                  item
                  xs={12}
                  md={8}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    8 Invoices have been paid
                  </Typography>
                  <Typography variant="body1">
                    Invoices have been paid to the company.
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  textAlign={{ xs: "left", md: "right" }}
                >
                  <Typography variant="caption">Wednesday</Typography>
                </Grid>
              </Grid>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  );
}
