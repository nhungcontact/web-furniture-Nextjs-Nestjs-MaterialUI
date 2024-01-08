import React from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
interface CheckboxProps<T extends FieldValues> {
  label: string;
  name: keyof T;
  control: Control<T>;
  rules?: object;
  error?: string | undefined;
}

export default function CheckBoxForm<T extends FieldValues>({ label, name, control, rules, error }: CheckboxProps<T>) {
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name as Path<T>}
        control={control}
        rules={rules}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={field.value}
          />
        )}
      />
      {error && <p>{error}</p>}
    </div>
  );
}
