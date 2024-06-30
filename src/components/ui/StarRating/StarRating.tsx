import React, { useState } from "react";
import filledStar from "./assets/star_filled.svg";
import emptyStar from "./assets/star_empty.svg";
import grayStar from "./assets/star_hover.svg";
import style from "./index.module.css";
import { useRateMovieMutation } from "../../../store/apiRating";

interface StarRatingProps {
  filmId: string;
}

const StarRating: React.FC<StarRatingProps> = ({ filmId }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  // const [mutate] = useRateMovieMutation();

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (index: number) => {
    setRating(index);
    // mutate({ movieId: filmId, user_rate: index });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((index) => {
      let starIcon = emptyStar;
      if (hoverRating !== null) {
        starIcon = hoverRating >= index ? grayStar : emptyStar;
      } else if (rating >= index) {
        starIcon = filledStar;
      }

      return (
        <div key={index} className={style.starRating}>
          <img
            className={style.star}
            src={starIcon}
            alt="рейтинг"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
          <p className={style.ratingNumber}>{index}</p>
        </div>
      );
    });
  };

  return <div className={style.wrapper}>{renderStars()}</div>;
};

export default StarRating;
