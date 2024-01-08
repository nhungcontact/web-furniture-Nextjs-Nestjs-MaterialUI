import type { Meta, StoryObj } from "@storybook/react";
import NotFound from "./NotFound";

const meta: Meta<typeof NotFound> = {
  title: "Errors/NotFound",
  component: NotFound,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof NotFound>;

export const Playground: Story = {
  args: {},
};
