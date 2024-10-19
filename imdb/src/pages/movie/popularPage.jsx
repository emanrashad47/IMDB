import { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";
import "./specific.css";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import Footer from '../../component/shared/layout/footer'
import { useDispatch, useSelector } from "react-redux";
import { addwatchedMovies } from "../../store/slices/watchedMovies.js";
import getPopular from "../../utils/movie/getPopular.js";
import Navbar from "../../component/shared/layout/Navbar.jsx";

export default function PopularPage() {
  let watchedMovies = useSelector((state) => state.watchedMovies.watchedMovies);
  console.log(watchedMovies);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      const movies = await getPopular();
      setMovies(movies);
    };

    fetchSimilarMovies();
  }, []);

  return (
    <>
    <Navbar/>
      <div className="container mx-auto ">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3">
              {t("Most Popular Movies")}
            </h1>
          </div>
        </div>
        <div>
          {movies.map((movie) => {
            return (
              <div className="movie-card mb-3 w-100" key={movie.id}>
                <div className="d-flex">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  onClick={() => {
                    navigate(`/showmovie/${movie.id}`);
                  }}
                  alt="Movie Poster"
                />
                <div className="movie-info">
                  <p className="movie-name"onClick={() => {
                    navigate(`/showmovie/${movie.id}`);
                  }}>{movie.title}</p>
                  <p className="movie-genre">
                    {t("Views")}: {movie.popularity} {t("times")}
                  </p>
                  <p className="movie-cast">
                    <IoStarSharp
                      className="mb-1 me-1"
                      style={{ color: "#f5c618" }}
                    />{" "}
                    {movie.vote_average}
                  </p>
                </div>
                </div>
                <div className="bookmark rounded-circle">
                  <span
                    className="fs-5 mt-2"
                    onClick={() => {
                      dispatch(addwatchedMovies(`${movie.id}`));
                    }}
                  >
                    <CiBookmarkPlus />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}
