import { Box, Button, List, ListItem, SwipeableDrawer, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import FilterCategories from "../filter-product/FilterCategories";

export function FilterProduct() {
  const [state, setState] = React.useState<boolean>(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setState(open);
    };
  const list = () => {
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        // onClick={toggleDrawer(false)}
      >
        <List
          sx={{
            width: 250,
          }}
        >
          <ListItem>
            <Box marginBottom={4}>
              <Typography
                variant="body1"
                marginBottom={1}
                fontWeight={600}
                textTransform={"uppercase"}
              >
                Brands
              </Typography>
              <FilterCategories />
            </Box>
          </ListItem>
          <ListItem>Sign up</ListItem>
        </List>
      </Box>
    );
  };

  return (
    <>
      <Button
        size="small"
        sx={{
          padding: "8px 22px",
        }}
        variant="outlined"
        onClick={toggleDrawer(true)}
        endIcon={
          <Image
            src="/images/filter.png"
            width={20}
            height={20}
            alt="filter"
          />
        }
      >
        Filter
      </Button>
      <SwipeableDrawer
        anchor={"right"}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}
