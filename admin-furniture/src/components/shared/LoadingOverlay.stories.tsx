import type { Meta, StoryObj } from "@storybook/react";
import LoadingOverlay from "./LoadingOverlay";

const meta: Meta<typeof LoadingOverlay> = {
  title: "Shared/LoadingOverlay",
  component: LoadingOverlay,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoadingOverlay>;

export const Playground: Story = {};
