import React from "react";
import type { Preview } from "@storybook/react";
import "./styles.css";
import { NextIntlClientProvider } from "next-intl";
import { Roboto } from "next/font/google";
import AppProviders from "../src/providers";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "vietnamese"],
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        segments: [["locale", "en"]],
      },
    },
  },
  args: {
    locale: "en",
  },
  argTypes: {
    locale: {
      options: ["en", "vi", "ko"],
      control: { type: "select" },
      description: "Set app locale",
    },
  },
  loaders: [
    async (context) => ({
      locales: {
        en: (await import(`../src/app/locales/en.json`)).default,
        vi: (await import(`../src/app/locales/vi.json`)).default,
        ko: (await import(`../src/app/locales/ko.json`)).default,
      },
    }),
  ],
  decorators: [
    (Story, context) => {
      const locale = context.args["locale"];

      return (
        <main className={roboto.className}>
          <NextIntlClientProvider
            locale={locale}
            messages={context.loaded["locales"][locale]}
          >
            <AppProviders>
              <Story {...context} />
            </AppProviders>
          </NextIntlClientProvider>
        </main>
      );
    },
  ],
};

export default preview;
