import styles from "./styles.module.css";

type TActorCardProps = {
	actor: {
		name: string;
		photo: string;
	};
}

export const ActorCard = ({ actor }: TActorCardProps) => {
	return (
		<div className={styles.card}>
			<img className={styles.image} src={actor.photo} alt={actor.name} />
			<p className={styles.name}>{actor.name}</p>
		</div>
	);
};
