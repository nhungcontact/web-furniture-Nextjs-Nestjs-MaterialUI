import type { Meta, StoryObj } from "@storybook/react";
import CurrentUserView from "./CurrentUserView";

const meta: Meta<typeof CurrentUserView> = {
  title: "Layout/CurrentUserView",
  component: CurrentUserView,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CurrentUserView>;

export const Playground: Story = {};
