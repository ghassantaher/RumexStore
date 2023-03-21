export const ProductRating = (props) => {
  const { average, count } = props;
  const intAverage = Math.trunc(average);
  const stars = Array(5)
    .fill('empty')
    .map((value, index) => {
      if (index < intAverage) return 'full';
      else if (index < average) return 'partial';
      else return 'empty';
    });
  const links = stars.map((star, index) => {
    function getStarClass(star) {
      if (star === 'partial') return 'fas fa-star-half-alt';
      if (star === 'empty') return 'fa-regular fa-star';
      return 'fa-solid fa-star';
    }
    return <i className={getStarClass(star)} key={index}></i>;
  });
  return (
    <div className="product-rating">
      {links}
      <span>
        &nbsp;{average}({count})
      </span>
    </div>
  );
};
