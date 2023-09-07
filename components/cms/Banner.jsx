import RichText from './RichText';

export default function Banner({ block }) {
  const { heading, imagePosition, backgroundColor, style, content, image } = block;

  const bgClass = style == 'light' ? `bg-${backgroundColor}-200` : `bg-${backgroundColor}-800`;
  const textColorClass = style == 'light' ? 'text-slate-800' : 'text-slate-200';

  const bannerImg = (
    <div>
      <img src={`${image?.url}?w=750`} alt={image?.description} />
    </div>
  );

  return (
    <div className={`my-6 grid grid-cols-2 gap-8 rounded-2xl p-12 ${bgClass}`}>
      {imagePosition === 'left' && bannerImg}
      <div className={`${textColorClass}`}>
        <h3 className="mb-8 text-3xl font-bold">{heading}</h3>
        <RichText className="text-xl" content={content} />
      </div>
      {imagePosition === 'right' && bannerImg}
    </div>
  );
}
