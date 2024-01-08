import type { Meta, StoryObj } from "@storybook/react";
import MainAppBar from "./MainAppBar";

const meta: Meta<typeof MainAppBar> = {
  title: "Layout/MainAppBar",
  component: MainAppBar,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MainAppBar>;

export const Playground: Story = {};
