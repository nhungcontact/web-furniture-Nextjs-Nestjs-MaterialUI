import { Box, Typography } from '@mui/material'
import React from 'react'
import FilterCategories from './FilterCategories'
import FilterPriceDistance from './FilterPriceDistance'
import { FilterBrand } from './FilterBrand'
import { FilterMaterial } from './FilterMaterial'
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckBoxColor from '@/components/shared/CheckBoxColor'
import FilterRoomFur from './FilterRoomFur'
const colors = ["red","orange","blue","brown","black","green"]
export default function ListFilter () {
  return (
    <Box>
      <Box marginBottom={6}>
        <Typography variant='h6' marginBottom={2} fontWeight={600}>Room furnitures</Typography>
        <FilterRoomFur />
      </Box>
      <Box marginBottom={6}>
        <Typography variant='h6' marginBottom={2} fontWeight={600}>Categories</Typography>
        <FilterCategories />
      </Box>
      <Box>
        <Typography variant='h6' marginBottom={6} fontWeight={600}>Filter by</Typography>
        <Box marginBottom={4}>
          <Typography variant='body1' marginBottom={1} fontWeight={600} textTransform={"uppercase"}>Price</Typography>
          <FilterPriceDistance />
        </Box>
        <Box marginBottom={4}>
          <Typography variant='body1' marginBottom={1} fontWeight={600} textTransform={"uppercase"}>Colors</Typography>
          {colors.map((item)=>(
            <CheckBoxColor
              key={item}
              icon={<CircleIcon />} 
              checkedIcon={<CheckCircleIcon />}
              sx={{
                color: item,
                padding:"2px",
                '& .MuiSvgIcon-root':{
                  fontSize:"34px"
                },
                '&.Mui-checked': {
                  color: item,
                },
              }} 
            />
          ))}
        </Box>
        <Box marginBottom={4}>
          <Typography variant='body1' marginBottom={1} fontWeight={600} textTransform={"uppercase"}>Materials</Typography>
          <FilterMaterial />
        </Box>
        <Box marginBottom={4}>
          <Typography variant='body1' marginBottom={1} fontWeight={600} textTransform={"uppercase"}>Brands</Typography>
          <FilterBrand />
        </Box>
        
      </Box>
    </Box>
  )
}
