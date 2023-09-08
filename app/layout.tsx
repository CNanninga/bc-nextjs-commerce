import Navbar from 'components/layout/navbar';
import { getStoreSettings } from 'lib/mybigcommerce/api';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import './globals.css';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getStoreSettings();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: settings.storeName,
      template: `%s | ${settings.storeName}`
    },
    robots: {
      follow: true,
      index: true
    },
    ...(TWITTER_CREATOR &&
      TWITTER_SITE && {
        twitter: {
          card: 'summary_large_image',
          creator: TWITTER_CREATOR,
          site: TWITTER_SITE
        }
      })
  };
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
