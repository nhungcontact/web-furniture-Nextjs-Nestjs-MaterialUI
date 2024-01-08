import type { Meta, StoryObj } from "@storybook/react";
import UserList from "./UserList";

const meta: Meta<typeof UserList> = {
  title: "Users/UserList",
  component: UserList,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof UserList>;

export const Playground: Story = {
  args: {},
};
