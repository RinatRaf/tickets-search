import { useNavigate, useSearchParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { GENRES, YEARS } from "../../type/types";
import Select from "../../components/ui/Select/Select";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import styles from "./index.module.css";
import { useGetFilmsQuery } from "../../store/api";
import FilmCard from "../../components/ui/FilmCard/FilmCard";
import { Pagination } from "../../components/ui/Pagination/Pagination";
import Loader from "../../components/ui/Loader/Loader";
import { useDebounce } from "../../hooks/useDebounce";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [genre, setGenre] = useState<keyof typeof GENRES>(
    (searchParams.get("genre") as keyof typeof GENRES) || "0"
  );
  const [year, setYear] = useState<keyof typeof YEARS>(
    (searchParams.get("year") as keyof typeof YEARS) || "0"
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const debouncedTitle = useDebounce(title, 1000);

  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/Film/${id}`);
  };

  const { data, error, isLoading } = useGetFilmsQuery({
    page: page,
    title: debouncedTitle,
    genre: genre,
    release_year: year,
  });

  useEffect(() => {
    setSearchParams((params) => {
      if (genre !== "0") params.set("genre", genre);
      else params.delete("genre");
      if (year !== "0") params.set("year", year);
      else params.delete("year");
      if (debouncedTitle) params.set("title", debouncedTitle);
      params.set("page", String(1));
      return params;
    });
  }, [debouncedTitle, genre, setSearchParams, year]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const changePage = (page: number): void => {
    setPage(page);
    setSearchParams((params) => {
      params.set("page", String(page));
      return params;
    });
  };

  if (error) console.log(error);

  if (!data) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.filterWrap}>
        <h4 className={styles.filter}>Фильтр</h4>
        <p>Жанр</p>
        <Select
          options={GENRES}
          onChange={setGenre}
          value={GENRES[genre]}
          placeholder="Выберите Жанр"
          width={400}
        />
        <p style={{ marginTop: "16px" }}>Год выпуска</p>
        <Select
          options={YEARS}
          onChange={setYear}
          value={YEARS[year]}
          placeholder="Выберите год выпуска"
          width={400}
        />
      </div>
      <div>
        <SearchInput
          onChange={handleSearchChange}
          placeholder="Название фильма"
          value={title}
          style={{ width: 400 }}
        />

        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {data?.search_result.length === 0 && !data ? (
          <div className={styles.empty}>
            <h1 className={styles.title}>Фильмы не найдены</h1>
            <h3 className={styles.subtitle}>
              Измените запрос и попробуйте снова
            </h3>
          </div>
        ) : (
          <>
            {data?.search_result.map((film) => (
              <FilmCard
                key={film.id}
                film={film}
                onClick={() => handleClick(film.id)}
              />
            ))}
            <Pagination
              currentPage={page}
              totalPages={data.total_pages}
              onChange={changePage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
