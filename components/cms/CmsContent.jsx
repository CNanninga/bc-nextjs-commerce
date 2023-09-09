import ContentBlock from 'components/cms/ContentBlock';

export default function CmsContent({ className, blocks }) {
  return (
    <div className={`${className} grid grid-cols-6 gap-6`}>
      {blocks.map((block) => (
        <ContentBlock key={block.sys.id} block={block} />
      ))}
    </div>
  );
}
