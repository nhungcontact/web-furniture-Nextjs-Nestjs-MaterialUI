import type { Meta, StoryObj } from "@storybook/react";
import UserDetail from "./UserDetail";

const meta: Meta<typeof UserDetail> = {
  title: "Users/UserDetail",
  component: UserDetail,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserDetail>;

export const Playground: Story = {
  args: {
    userId: "7d53c11b1fdb937ebadeb306",
  },
};
