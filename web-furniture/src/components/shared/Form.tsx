import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextField from "@/components/shared/TextField";
import CheckBoxForm from "./CheckBoxForm";
import RadioButtonForm from "./RadioButtonForm";
import SelectForm from "./SelectForm";
import SelectMultiForm from "./SelectMultiForm";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
  name: string;
  description: string;
  price: string;
  agree: NonNullable<boolean>;
  job: string;
  size: string;
  sizeMulti: string[];
};
interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

export default function Form({ onSubmit }: FormProps) {
  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.string().required(),
    agree: yup.boolean().oneOf([true], "Bạn phải đồng ý điều khoảnnn.").required(),
    job: yup.string().required("chon job"),
    size: yup.string().required("chon size"),
    sizeMulti: yup.array().required(),
  });

  const defaultValues: FormValues = {
    name: "",
    description: "",
    price: "",
    agree: true,
    job: "",
    size: "",
    sizeMulti: [],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ defaultValues, resolver: yupResolver(schema) });

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
    reset(); // Gọi hàm reset sau khi dữ liệu đã được submit
  };
  const options = [
    {
      label: "size S",
      value: "S",
    },
    {
      label: "size M",
      value: "M",
    },
    {
      label: "size L",
      value: "L",
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Các trường dữ liệu ở đây */}
      <TextField<FormValues>
        placeholder="input name"
        label="name"
        name="name"
        control={control}
        rules={{ required: true }}
        error={errors.name?.message}
      />
      <TextField<FormValues>
        placeholder="input description"
        label="description"
        name="description"
        control={control}
        rules={{ required: true }}
        error={errors.description?.message}
      />
      <TextField<FormValues>
        placeholder="input price"
        label="price"
        name="price"
        control={control}
        rules={{ required: true }}
        error={errors.price?.message}
      />
      <CheckBoxForm<FormValues>
        label="Đồng ý điều khoản"
        name="agree"
        control={control}
        rules={{ required: true }}
        error={errors.agree?.message}
      />
      <RadioButtonForm<FormValues>
        value="student"
        label="student"
        name="job"
        control={control}
        rules={{ required: true }}
        error={errors.job?.message}
      />
      <RadioButtonForm<FormValues>
        value="IT"
        label="IT"
        name="job"
        control={control}
        rules={{ required: true }}
        error={errors.job?.message}
      />
      <SelectForm<FormValues>
        sx={{ backgroundColor: "blue" }}
        label="size S"
        name="size"
        control={control}
        options={options}
        rules={{ required: true }}
        error={errors.size?.message}
      />
      <SelectMultiForm<FormValues>
        sx={{ backgroundColor: "blue" }}
        label="size S"
        name="sizeMulti"
        control={control}
        options={options}
        rules={{ required: true }}
        error={errors.size?.message}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
