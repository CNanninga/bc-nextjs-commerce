import Banner from 'components/cms/Banner';
import ImageBlock from 'components/cms/ImageBlock';
import RichText from 'components/cms/RichText';
import SimpleText from 'components/cms/SimpleText';

const BLOCK_TYPE_BANNER = 'BlockBanner';
const BLOCK_TYPE_RICHTEXT = 'BlockRichText';
const BLOCK_TYPE_SIMPLETEXT = 'BlockSimpleText';
const BLOCK_TYPE_IMG = 'BlockImage';

export default function ContentBlock({ block }) {
  switch (block['__typename']) {
    case BLOCK_TYPE_BANNER:
      return <Banner className="col-span-6 mx-auto my-6 max-w-screen-lg" block={block} />;

    case BLOCK_TYPE_RICHTEXT:
      return (
        <RichText className="col-span-6 mx-auto my-6 max-w-screen-md" content={block.content} />
      );

    case BLOCK_TYPE_SIMPLETEXT:
      return <SimpleText className="my-6 max-w-screen-md" block={block} />;

    case BLOCK_TYPE_IMG:
      return <ImageBlock className="my-6" block={block} />;

    default:
      return null;
  }
}
