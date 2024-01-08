import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IconButton, List, ListItem, ListItemText } from '@mui/material';
import { primary } from '@/config/theme';
import MuiListItemButton from '@mui/material/ListItemButton';
import { usePathname } from 'next/navigation';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ }) => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(MuiAccordionSummary) (({ }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ }) => ({
  padding: "0px"
}));
const ListItemButton = styled(MuiListItemButton)({
    "&.Mui-selected": {
      background:"none",
    },
  //   "&.Mui-selected .MuiListItemIcon-root": {
  //     color: "orangered",
  //   },
    "&.MuiButtonBase-root:hover": {
      background: "none",
      color:`${primary[400]}`
    },
    "&.Mui-selected .MuiListItemText-root .MuiTypography-root": {
      fontWeight:"600",
      color:`${primary[400]}`,
    }
})
export default function FilterCategories() {
  const pathName = usePathname();
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography fontWeight={expanded === 'panel1' ? "600" : "500"}>Category 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List sx={{marginLeft:"30px"}}>
            <ListItem disablePadding 
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Typography color={"black"}>300</Typography>
                </IconButton>
              }
            >
              <ListItemButton selected={pathName === "/vi/furniture" ? true : false}>
                <ListItemText primary="All" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding 
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Typography color={"black"}>300</Typography>
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemText primary="Room 1" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Typography color={"black"}>300</Typography>
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemText primary="Room 2" />
              </ListItemButton>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography fontWeight={expanded === 'panel2' ? "600" : "500"}>Category 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography fontWeight={expanded === 'panel3' ? "600" : "500"}>Category 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
