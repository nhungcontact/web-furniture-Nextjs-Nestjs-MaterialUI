import type { Meta, StoryObj } from "@storybook/react";
import CustomInput from "./CustomInput";

const meta: Meta<typeof CustomInput> = {
  title: "Shared/CustomInput",
  component: CustomInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomInput>;

export const Playground: Story = {
  args: {
    placeholder: "This is placeholder",
    label: "Label",
  },
};
