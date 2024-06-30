import { useState } from "react"
import styles from './index.module.css'
import { useParams } from "react-router-dom"
import StarRating from "../../components/ui/StarRating/StarRating"
import { ActorCard } from "../../components/ui/ActorCard/ActorCard"
import { useGetFilmByIdQuery } from "../../store/api"
import Loader from "../../components/ui/Loader/Loader"

const Film = () => {
  
  const [rating, setRating] = useState(0)
  const { filmId } = useParams();
  
	const { data, isLoading, error } = useGetFilmByIdQuery(Number(filmId!));

  if(error) console.log(error);  
  if (!data) return null;
  if (isLoading) return <Loader/>

  return (
    <div className={styles.FilmPage}>
      <div className={styles.wrap}>
        <img className={styles.filmImage} src={data.poster} alt="poster" /> 
          <div>
            <div className={styles.header}>
            <h2>{data.title}</h2>
              <StarRating rating={rating} onRatingChange={setRating}/>
            </div>
            <div className={styles.discWrap}>
              <p className={styles.discTitle}>
                <b>Жанр:</b>
              </p> 
              <p className={styles.discValue}>
                {data.genre}
              </p>
            </div>
            <div className={styles.discWrap}>
              <p className={styles.discTitle}>
                <b>Год выпуска:</b>
              </p> 
              <p className={styles.discValue}>{data.release_year}
              </p>
            </div>
            <div className={styles.discWrap}>
              <p className={styles.discTitle}>
                <b>Рейтинг:</b>
              </p>
              <p className={styles.discValue}>{data.rating}
              </p>
            </div>
            <div className={styles.discWrap}>
              <p><b>Описание:</b></p>
            </div>
            <p>{data.description}</p>
          </div>
        </div>
        <div className={styles.actorsBlock}>
          <h4>Актёры</h4>
          <div className={styles.actors}>
          {data.actors.map((actor, index) => (
            <ActorCard key={index} actor={actor} />
          ))}
        </div>
      </div>
    </div> 
  )
}

export default Film