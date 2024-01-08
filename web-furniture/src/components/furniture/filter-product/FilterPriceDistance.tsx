import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import { secondary } from '@/config/theme';
import { TextField } from '@mui/material';

const PrettoSlider = styled(Slider)({
  color: `${secondary[300]}`,
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: `${secondary[300]}`,
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

function valuetext(value: number) {
  return `$ ${value}`;
}

const minDistance = 50;

export default function FilterPriceDistance() {
  const minmin = 150;
  const maxmax = 1900;
  const [value2, setValue2] = React.useState<number[]>([150, 550]);
  
  const handleChange2 = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };
  const handleChangeTextField2 = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue2([value2[0],event.target.value] as number[])
  }
  const handleChangeTextField1 = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue2([event.target.value, value2[1]] as number[])
  }
  return (
    <Box sx={{ width: "-webkit-fill-available" }}>
      <PrettoSlider
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={minmin}
        max={maxmax}
        marks
        step={100}
      />
      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <TextField
          variant="outlined"
          type='number'
          label='min price'
          value={value2[0]}
          onChange={handleChangeTextField1}
          sx={{
            "& .MuiInputBase-root":{
              borderRadius:"0px"
            },
            "& .MuiOutlinedInput-input": {
              padding:"11px",
            },
            width:"90px",
            height:"50px"
          }}
        />
        <TextField
          variant="outlined"
          type='number'
          label='max price'
          value={value2[1]}
          onChange={handleChangeTextField2}
          sx={{
            "& .MuiInputBase-root":{
              borderRadius:"0px"
            },
            "& .MuiOutlinedInput-input": {
              padding:"11px",
            },
            width:"90px",
            height:"50px"
          }}
        />
      </Box>
      {/* <Typography variant='caption' fontWeight={"600"}>Range: ${value2[0]} - ${value2[1]} </Typography> */}
    </Box>
  );
}
