import ContactHeader from "@/components/contacts/ContactHeader";
import ContactTable from "@/components/contacts/ContactTable";
import { Container, Divider, Grid, Paper } from "@mui/material";

async function ContactPage() {
  return (
    <Container
      maxWidth="xl"
      sx={{ my: 3 }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <ContactHeader
            title="List Contact"
            button={false}
          />
          <Divider />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Paper
            variant="outlined"
            sx={{ borderRadius: 0, border: "none" }}
          >
            <ContactTable />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContactPage;
