import RichText from './RichText';

export default function SimpleText({ className, block }) {
  let sizeClass;
  switch (block.size) {
    case 'full':
      sizeClass = 'col-span-6';
      break;

    case 'two-thirds':
      sizeClass = 'col-span-4';
      break;

    case 'half':
      sizeClass = 'col-span-3';
      break;

    case 'third':
      sizeClass = 'col-span-2';
      break;

    default:
      sizeClass = null;
  }

  return <RichText content={block.content} className={`${className} ${sizeClass}`} />;
}
