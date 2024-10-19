import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import getTopRated from "../utils/getTopRated";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Section() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    initialSlide: 0,
    rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const moviess = await getTopRated();
      setMovies(moviess);
      console.log(movies);
    };

    fetchMovies();
    
  }, []);

  let d =1;

  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
        
          {
            movies.map((movie) => {
              return (
                <div className="carousel-inner grid" key={movie.id}>
                  <div className="carousel-items">
                    <div className="card bg-dark text-light m-2" style={{ width: '100%'}} key={movie.id}>
                      <div onClick={() => {navigate(`/showmovie/${movie.id}`);}} style={{height: '80%'}}  > 
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                      </div>
                      <div className="card-body pb-5">
                        <p><IoStarSharp className='mb-1 me-1' style={{color: '#f5c618'}} /> {movie.vote_average}</p>
                        <h2 className="card-title title">{d++}. {movie.title}</h2>
                        <p className='text-center watchlist mb-4'><LuPlus className='fs-5'/> Watchlist</p>
                        <h3 className="text-center trailer fs-5"><FaPlay className='fs-6 mb-1'/> Trailer</h3>

                        <a className='show small' onClick={() => navigate( `/movie/${movie.id}`)}>Show Similar</a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
        </Slider> 
      </div>
    </>
  );
}

{/* <motion.div ref={carouselRef} className="carousel">
          <motion.div 
            drag="x" 
            dragConstraints={{right: 0, left: -width}}
            className="inner-carousel d-flex ">
            {
              movies.map((movie, index) => {
                  return (
                    <motion.div className="carousel-items" key={index}>
                       <motion.div  className="card bg-dark text-light m-2"style={{ width: '18rem'}}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="movie-img"
                          onClick={() => navigate(`/movie/${movie.id}`)}
                        />
                        <div className="movie-info">
                          <h5>{movie.title}</h5>
                          <p>{t('section.rating')}: {movie.vote_average}</p>
                          <AiFillLike size={24} color="#FFC107" />
                          <p>{t('section.release')}: {new Date(movie.release_date).getFullYear()}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                   
                  );
                })
              
            }
          </motion.div>
        </motion.div> */}