
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './sty.css';
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { addwatchedTvs } from "../../store/slices/watchedTvs.js";
import { t } from 'i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import getPlayingNow from "../../utils/movie/getPlayingNow.js";

export default function PlayingNow() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate(); 
  let watchedMovies = useSelector(state => state.watchedMovies.watchedMovies);
  console.log(watchedMovies);
  const dispatch = useDispatch();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: false,
        }
      }
    ]
  };
  
  useEffect(() => {
    const fetchMovies = async () => {
        const movies = await getPlayingNow();
        setMovies(movies);
      };
    
    fetchMovies();
  },[] );
 

  return (
    <div className="container" style={{width:'100%'}}>
      <div className="flex-container">
        <div className="line"></div>
        <div className="text">
          <h1 className="main-title fs-3"
          >
           {t('Playing Now')}
          </h1>
        </div>
      </div>
      
      <div className="slider-container p-3">
        <Slider {...settings}>
          {
            movies.map((movie) => {
              if (movie.id != 933260){
              return (
                <div className="" key={movie.id}>
                  <div className=" d-flex justify-content-around">
                    <div className="card bg-dark text-light m-2" style={{ width: "100%" }} key={movie.id}>
                        <div >
                          <img 
                            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} 
                            className="card-img-top " alt={movie.name} 
                            onClick={() => {navigate(`/showmovie/${movie.id}`);}}
                          />
                        </div>
                        <div className="card-body bg-dark">
                          <div className="d-flex justify-content-between px-2">
                            <h2 className="card-title fs-6 fw-light text-warning text-start my-0">
                            {(movie.title.length > 20 ) ? movie.title.substring(0, 17) + "..." : movie.title}
                            </h2>
                            <p className="d-inline fw-light">
                              <IoStarSharp
                                className="mb-1 me-1"
                                style={{ color: "#f5c618" }}
                              />
                              {movie.vote_average}
                            </p>
                          </div>
                          <p className="text-center watchlist m-2"
                          onClick={()=>{dispatch(addwatchedTvs(`${movie.id}`))}}>
                            <LuPlus className="fs-5 fw-lighter" /> {t('Watchlist')}
                          </p>
                          <a
                            className="showw"
                            onClick={() => navigate(`/movie/${movie.id}`)}
                          >
                            {t('Show Similar')}
                          </a>
                        </div>
                    </div>
                  </div>
                </div>
              );
            }})
          }
        </Slider>
      </div>
    </div>
  );
}
