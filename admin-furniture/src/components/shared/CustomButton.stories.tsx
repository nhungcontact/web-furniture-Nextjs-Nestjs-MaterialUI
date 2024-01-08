import type { Meta, StoryObj } from "@storybook/react";
import CustomButton from "./CustomButton";

const meta: Meta<typeof CustomButton> = {
  title: "Shared/CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

export const Playground: Story = {
  args: {
    children: "Button",
    variant: "contained",
  },
};
