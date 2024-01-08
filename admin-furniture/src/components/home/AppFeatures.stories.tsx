import type { Meta, StoryObj } from "@storybook/react";
import AppFeatures from "./AppFeatures";

const meta: Meta<typeof AppFeatures> = {
  title: "Home/AppFeatures",
  component: AppFeatures,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AppFeatures>;

export const Playground: Story = {
  args: {},
};
