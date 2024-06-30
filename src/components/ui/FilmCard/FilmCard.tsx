import { useState } from 'react';
import StarRating from '../StarRating/StarRating';
import styles from './index.module.css'
import { ShortMovieInfo } from '../../../type/types';

interface IFilmCardProps {
	film: ShortMovieInfo;
	onClick?: (film: ShortMovieInfo) => void;
}

const FilmCard = ({ film, onClick }: IFilmCardProps) => {
    const [rating, setRating] = useState(0)
    const handleClick = () => {
		if (onClick) {
			onClick(film);
		}
	};
    return (
        <div className={styles.wrap} onClick={handleClick}>
           <img className={styles.filmImage} src={film.poster} alt="film" /> 
           <div>
            <h3 className={styles.filmTitle}>{film.title}</h3>
            <div className={styles.discWrap}><p className={styles.discTitle}>Жанр</p> <p className={styles.discValue}>{film.genre}</p></div>
            <div className={styles.discWrap}><p className={styles.discTitle}>Год выпуска</p> <p className={styles.discValue}>{film.release_year}</p></div>
            <div className={styles.discWrap}><p className={styles.discTitle}>Описание</p> <p className={styles.discValue}>{film.description}</p></div>
           </div>
           <StarRating rating={rating} onRatingChange={setRating}/>
        </div>
    );
};

export default FilmCard;