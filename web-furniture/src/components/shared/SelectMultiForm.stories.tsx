import type { Meta, StoryObj } from "@storybook/react";
import SelectMultiForm from "./SelectMultiForm";

const meta: Meta<typeof SelectMultiForm> = {
  title: "Shared/SelectMultiForm",
  component: SelectMultiForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectMultiForm>;

export const Playground: Story = {};
