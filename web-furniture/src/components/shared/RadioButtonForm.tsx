import React, { ReactNode } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

interface RadiobuttonProps<T extends FieldValues> {
  label: ReactNode;
  name: keyof T;
  value: string;
  control: Control<T>;
  rules?: object;
  error?: string | undefined;
}

export default function RadioButtonForm<T extends FieldValues>({ label, name, value, control, rules, error }: RadiobuttonProps<T>) {
  return (
    <div>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({ field }) => (
          <RadioGroup {...field}>

            <FormControlLabel value={value} control={<Radio sx={{ color: 'white' }} />} label={label} />
          </RadioGroup>
        )}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
