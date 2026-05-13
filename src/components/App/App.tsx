import { useState, type ComponentType } from "react";
import { useQuery } from "@tanstack/react-query";

import toast, { Toaster } from "react-hot-toast";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import css from "./App.module.css";

import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";

type ModuleWithDefault<T> = { default: T };
const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [query, setQuery] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [selectedMovie, setSelectedMovie] =
    useState<Movie | null>(null);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movies", query, page],

    queryFn: () =>
      fetchMovies(query, page),

    enabled: query !== "",
  });

  const handleSearch = (
    newQuery: string
  ) => {
    setQuery(newQuery);
    setPage(1);
  };

  const movies = data?.results ?? [];
  const totalPages =
    data?.totalPages ?? 0;

  if (
    query &&
    !isLoading &&
    movies.length === 0
  ) {
    toast.error(
      "No movies found for your request."
    );
  }

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <Toaster position="top-right" />

      {isLoading && <Loader />}

      {isError && <ErrorMessage />}

      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={setSelectedMovie}
        />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) =>
            setPage(selected + 1)
          }
          forcePage={page - 1}
          containerClassName={
            css.pagination
          }
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() =>
            setSelectedMovie(null)
          }
        />
      )}
    </>
  );
}