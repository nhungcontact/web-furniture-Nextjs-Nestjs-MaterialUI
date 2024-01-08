import React from 'react'
import { Typography, Card, Box, CardContent, CardMedia } from "@mui/material";
import RatingReview from './RatingReview';
import { neutral } from '@/config/theme';
import { Photo } from '@/types/photo';

type propsInput = {
  name: string,
  role: string,
  content: string,
  img?: Photo,
  rating: number
}

function ReviewCard(props: propsInput) {
  return (
    <>
      <Card sx={{ display: 'flex', margin: "5px", backgroundColor: `${neutral[600]}`, minHeight: "258px", borderRadius: 2,justifyContent:"space-between" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{padding: "24px 0px 32px 24px",flex: '1 0 auto'}}>
            <Typography component="div" variant="h4" sx={{ color: "#ffffff" }}>
              {props.name}
            </Typography>
            <Typography component="div" variant="caption" color="secondary">
              {props.role}
            </Typography>
            <Typography variant="body1" color="neutral.light" component="div" minHeight={120}>
              {props.content}
            </Typography>
            <RatingReview defaultValue={props.rating} />
          </CardContent>
        </Box>
          <CardMedia
            component="img"
            sx={{
              display:{xs:"none",sm:"block",md:"block",lg:"block"},
              width: {sm:"200px",md:"200px", lg:"245px"},
              minHeight: "258px",
              clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0 100%)"
            }}
            image={props?.img?.imageURL}
            alt={props?.img?.name}
          />
      </Card>
    </>
  )
}

export default ReviewCard