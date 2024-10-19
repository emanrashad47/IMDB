import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import getTv from "../../utils/tvShows/getTv";
import { useDispatch } from "react-redux";
import { removeTv } from "../../store/slices/watchedTvs";

export default function Tv(prop) {
  const id = prop.id;
  const [tv, settv] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchtv = async () => {
      const tvs = await getTv(id);
      settv(tvs);
      console.log(id);
    };

    fetchtv();
  }, []);

  return (
    <div className="col-6 col-lg-3 m-1">
      <div className="card bg-dark text-light m-2 " style={{ height: `${prop.show ? '18rem' : '15rem'}` }}>
        <div
          onClick={() => {
            navigate(`/showtv/${tv.id}`);
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`}
            className="card-img-top"
            alt={tv.title}
          />
        </div>
        <div className="card-body ">
            <p>
              <IoStarSharp
                className="mb-1 me-1 "
                style={{ color: "#f5c618" }}
              />
              {tv.vote_average}
            </p>
            <p className="card-title h6">{tv.name}</p>
            <button
              className={`btn mx-auto py-1 btn-warning btn-remove ${
                prop.show ? "d-block" : "d-none"
              }`}
              onClick={() => {
                dispatch(removeTv(tv.id));
              }}
            >
              Remove
            </button>
        </div>
      </div>
    </div>
  );
}
