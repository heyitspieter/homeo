function Svg({ className, symbol }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <use xlinkHref={`/sprite.svg#${symbol}`}></use>
    </svg>
  );
}

export default Svg;
