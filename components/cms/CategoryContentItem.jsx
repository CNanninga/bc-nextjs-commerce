import Banner from 'components/cms/Banner';
import RichText from 'components/cms/RichText';

const BLOCK_TYPE_BANNER = 'BlockBanner';
const BLOCK_TYPE_RICHTEXT = 'BlockRichText';

export default function CategoryContentItem({ block }) {
  switch (block['__typename']) {
    case BLOCK_TYPE_BANNER:
      return <Banner block={block} />;

    case BLOCK_TYPE_RICHTEXT:
      return <RichText content={block.content} />;

    default:
      return null;
  }
}
