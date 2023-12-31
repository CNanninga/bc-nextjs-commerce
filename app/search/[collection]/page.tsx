import { getCollection, getCollectionProducts } from 'lib/bigcommerce';
import { getContentBlocks } from 'lib/contentful/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CmsContent from 'components/cms/CmsContent';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';

export const runtime = 'edge';

export async function generateMetadata({
  params
}: {
  params: { collection: string };
}): Promise<Metadata> {
  const collection = await getCollection(params.collection);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description || collection.description || `${collection.title} products`
  };
}

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { collection: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const [collection, cmsContent, products] = await Promise.all([
    getCollection(params.collection),
    getContentBlocks('category', params.collection),
    getCollectionProducts({ collection: params.collection, sortKey, reverse })
  ]);

  return (
    <section>
      <h1 className="mb-4 border-b border-white text-2xl">{collection.title}</h1>
      {cmsContent && <CmsContent blocks={cmsContent} />}
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}
