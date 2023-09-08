import RichText from './RichText';

export default function Banner({ className, block }) {
  const { heading, imagePosition, backgroundColor, style, content, image } = block;

  const bgClass = style == 'light' ? `bg-${backgroundColor}-200` : `bg-${backgroundColor}-800`;
  const textColorClass = style == 'light' ? 'text-slate-800' : 'text-slate-200';

  const bannerImg = (
    <div>
      <img src={`${image?.url}?w=750`} alt={image?.description} />
    </div>
  );

  return (
    <div className={`${className} rounded-2xl p-12 md:grid md:grid-cols-2 md:gap-8 ${bgClass}`}>
      {imagePosition === 'left' && bannerImg}
      <div className={`${textColorClass}`}>
        <h3 className="mb-8 text-3xl font-bold">{heading}</h3>
        <RichText className="text-xl" content={content} />
      </div>
      {imagePosition === 'right' && bannerImg}
    </div>
  );
}
