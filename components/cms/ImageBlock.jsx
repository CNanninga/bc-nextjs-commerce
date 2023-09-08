export default function ImageBlock({ className, block }) {
  let sizeClass, imgSize;
  switch (block.size) {
    case 'full':
      sizeClass = 'col-span-6';
      imgSize = 1000;
      break;

    case 'two-thirds':
      sizeClass = 'col-span-4';
      imgSize = 700;
      break;

    case 'half':
      sizeClass = 'col-span-3';
      imgSize = 500;
      break;

    case 'third':
      sizeClass = 'col-span-2';
      imgSize = 400;
      break;

    default:
      sizeClass = null;
  }

  return (
    <div className={`${className} ${sizeClass}`}>
      <img src={`${block.image?.url}?w=${imgSize}`} alt={block.image?.description} />
    </div>
  );
}
