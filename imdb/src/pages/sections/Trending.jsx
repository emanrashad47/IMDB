import { useEffect, useState } from 'react';
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import { addwatchedMovies } from "../../store/slices/watchedMovies.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './sty.css';
import {t} from 'i18next'
import getTrending from '../../utils/movie/getTrending.js';


export default function Trending() {
  let watchedMovies = useSelector(state => state.watchedMovies.watchedMovies);
  console.log(watchedMovies);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 1,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false
        }
      }
    ]
  };
  
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const movies = await getTrending();
      setMovies(movies);
      console.log(movies);
    };

    fetchTrendingMovies();
  }, []);


  let d = 1; //number of movies


  return (
    <div className="container mx-0">
      <div className="flex-container">
        <div className="line"></div>
        <div className="text">
          <h1 className="main-title fs-3"
          onClick={()=>{navigate('/movie/trending')}}>
            {t('Trending Movie Today')}
            <IoIosArrowForward className='fs-2 me-3 mb-1 ms-5 icon'/>
          </h1>
        </div>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {
            movies.map((movie) => {
              return (
                <div className="carousel-inner grid" key={movie.id}>
                  <div className="carousel-items">
                    <div className="card bg-dark text-light m-2" style={{ width: '100%'}} key={movie.id}>
                      <div onClick={() => {navigate(`/showmovie/${movie.id}`);}} style={{height: '50%'}}  > 
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                      </div>
                      <div className="card-body pb-5">
                        <p><IoStarSharp className='mb-1 me-1' style={{color: '#f5c618'}} /> {movie.vote_average}</p>
                        <h2 className="card-title title">{d++}. {(movie.title.length > 20 ) ? movie.title.substring(0, 17) + "..." : movie.title}</h2>
                        <p className='text-center watchlist mb-4' onClick={()=>{dispatch(addwatchedMovies(`${movie.id}`))}}>
                          <LuPlus className='fs-5'/> {t('Watchlist')}
                        </p>
                        <h3 className="text-center trailer fs-5"><FaPlay className='fs-6 mb-1'/> {t('Trailer')}</h3>

                        <a className='showw small' onClick={() => navigate( `/movie/${movie.id}`)}>{t('Show Similar')}</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </Slider> 
      </div>
  </div>
    
  );
}


