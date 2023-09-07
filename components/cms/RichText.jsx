import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

function RichTextAsset({ id, content }) {
  const assetLinks = content?.links?.assets?.block ?? [];

  const asset = assetLinks.find((asset) => asset.sys.id === id);

  return asset?.url ? <img src={asset.url} alt={asset.description} /> : null;
}

export default function RichText({ content, className }) {
  return (
    <div className={className}>
      {documentToReactComponents(content.json, {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) => (
            <RichTextAsset id={node.data.target.sys.id} content={content} />
          )
        }
      })}
    </div>
  );
}