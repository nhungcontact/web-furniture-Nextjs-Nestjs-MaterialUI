import type { Meta, StoryObj } from "@storybook/react";
import MainFooter from "./MainFooter";

const meta: Meta<typeof MainFooter> = {
  title: "Layout/MainFooter",
  component: MainFooter,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof MainFooter>;

export const Playground: Story = {};
