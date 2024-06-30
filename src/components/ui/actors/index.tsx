import styles from './index.module.css'
import actor from './actor.jpg'
const Actor = () => {
    return (
        <div className={styles.actorWrap}>
            <img className={styles.actorPhoto} src={actor} alt="actor" />
            <p  className={styles.actorName}>Элайджа Вуд</p>
        </div>
    );
};

export default Actor;