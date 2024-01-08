import MainLayout from "@/components/layout/MainLayout";
import AppProviders from "@/providers";
import { Roboto } from "next/font/google";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "vietnamese"],
});

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`@/app/locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: RootLayoutProps) {
  const messages = await getMessages(locale);

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({ locale, messages, namespace: "HomePage" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <AppProviders>
            <MainLayout>{children}</MainLayout>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
