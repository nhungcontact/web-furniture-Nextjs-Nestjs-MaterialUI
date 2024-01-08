import type { Meta, StoryObj } from "@storybook/react";
import CustomLink from "./CustomLink";

const meta: Meta<typeof CustomLink> = {
  title: "Shared/CustomLink",
  component: CustomLink,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CustomLink>;

export const Playground: Story = {
  args: {
    children: "Link",
    href: "/",
  },
};
