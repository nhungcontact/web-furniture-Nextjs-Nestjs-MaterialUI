import type { Meta, StoryObj } from "@storybook/react";
import HeroBanner from "./HeroBanner";

const meta: Meta<typeof HeroBanner> = {
  title: "Home/HeroBanner",
  component: HeroBanner,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof HeroBanner>;

export const Playground: Story = {
  args: {},
};
