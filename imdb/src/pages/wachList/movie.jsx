import { useEffect, useState } from "react";
import getMovie from "../../utils/movie/getMovie";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeMovie } from "../../store/slices/watchedMovies";

export default function Movie(prop) {
  const id = prop.id;
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovie = async () => {
      const movies = await getMovie(id);
      setMovie(movies);
      console.log(id);
    };

    fetchMovie();
  }, []);

  return (
    <div className="col-6 col-lg-3 m-1" >
      <div
        className="card bg-dark text-light  "
        style={{ height: `${prop.show ? '18rem' : '15rem'}` }}
      >
        <div
          onClick={() => {
            navigate(`/showmovie/${movie.id}`);
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            className="card-img-top"
            alt={movie.title}
          />
        </div>
        <div className="card-body ">
          <p>
            <IoStarSharp className="mb-1 me-1" style={{ color: "#f5c618" }} />{" "}
            {movie.vote_average}
          </p>
          <p className="card-title h6 ">{movie.title}</p>
          <div className="text-center">
          <button className={`btn mx-auto py-1 btn-warning btn-remove ${prop.show ? 'd-block' : 'd-none'}`}
           onClick={()=>{
            dispatch(removeMovie(movie.id))}}
           >
             Remove
          </button>
          </div>

        </div>
      </div>
    </div>
  );
}
