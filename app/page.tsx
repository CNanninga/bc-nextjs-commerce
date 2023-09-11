import CmsContent from 'components/cms/CmsContent';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { getContentBlocks } from 'lib/contentful/api';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and BigCommerce.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  const cmsContent = await getContentBlocks('home', 'home');

  return (
    <>
      {cmsContent && <CmsContent className="mx-8" blocks={cmsContent} />}
      <h2 className="mb-4 text-center text-3xl">Featured Products</h2>
      <ThreeItemGrid />
      <Suspense>
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
