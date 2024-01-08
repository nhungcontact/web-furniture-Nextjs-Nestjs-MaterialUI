import type { Meta, StoryObj } from "@storybook/react";
import LocaleSwitcher from "./LocaleSwitcher";

const meta: Meta<typeof LocaleSwitcher> = {
  title: "Layout/LocaleSwitcher",
  component: LocaleSwitcher,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LocaleSwitcher>;

export const Playground: Story = {};
