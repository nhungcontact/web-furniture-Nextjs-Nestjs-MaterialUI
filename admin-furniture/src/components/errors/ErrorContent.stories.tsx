import type { Meta, StoryObj } from "@storybook/react";
import ErrorContent from "./ErrorContent";

const meta: Meta<typeof ErrorContent> = {
  title: "Errors/ErrorContent",
  component: ErrorContent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ErrorContent>;

export const Playground: Story = {
  args: {
    error: {
      name: "Error name",
      message: "This is error message",
    },
  },
};
