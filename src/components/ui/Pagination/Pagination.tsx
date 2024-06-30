import styles from "./styles.module.css";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
}: IPaginationProps) => {
  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages;
  const prevButtonIcon = isPrevButtonDisabled
    ? "/assets/arrowDisabled.svg"
    : "/assets/arrowActive.svg";
  const nextButtonIcon = isNextButtonDisabled
    ? "/assets/arrowDisabled.svg"
    : "/assets/arrowActive.svg";

  const handlePrevClick = () => {
    if (!isPrevButtonDisabled) {
      onChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (!isNextButtonDisabled) {
      onChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.prev}
        onClick={handlePrevClick}
        disabled={isPrevButtonDisabled}
      >
        <img className={styles.icon} src={prevButtonIcon} alt="<" />
      </button>
      <p className={styles.page}>{currentPage}</p>
      <button
        className={styles.next}
        onClick={handleNextClick}
        disabled={isNextButtonDisabled}
      >
        <img className={styles.icon} src={nextButtonIcon} alt=">" />
      </button>
    </div>
  );
};
