import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["./*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-mdx-gfm"],
  framework: {
    name: "@storybook/nextjs",
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      // makes union prop types like variant and size appear as select controls
      shouldExtractLiteralValuesFromEnum: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      shouldRemoveUndefinedFromOptional: true,
      // Filter out third-party props from node_modules except @mui packages
      propFilter: prop => true
    }
  },
  webpackFinal: async (config, {
    configType
  }) => {
    config.resolve!.alias = {
      ...config.resolve?.alias,
      "@": path.resolve(__dirname, "../src/")
    };
    return config;
  }
};
export default config;