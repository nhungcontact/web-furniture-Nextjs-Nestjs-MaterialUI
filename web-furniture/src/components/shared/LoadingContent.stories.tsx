import type { Meta, StoryObj } from "@storybook/react";
import LoadingContent from "./LoadingContent";

const meta: Meta<typeof LoadingContent> = {
  title: "Shared/LoadingContent",
  component: LoadingContent,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof LoadingContent>;

export const Playground: Story = {
  args: {
    caption: "Loading something...",
  },
};
