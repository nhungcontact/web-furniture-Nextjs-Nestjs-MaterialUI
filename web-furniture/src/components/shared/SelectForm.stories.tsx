import type { Meta, StoryObj } from "@storybook/react";
import SelectForm from "./SelectForm";

const meta: Meta<typeof SelectForm> = {
  title: "Shared/SelectForm",
  component: SelectForm,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SelectForm>;

export const Playground: Story = {};
