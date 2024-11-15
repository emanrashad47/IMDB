import { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import getTvTrending from "../../utils/tvShows/getTvTrending";
import { useDispatch, useSelector } from "react-redux";
import { addwatchedTvs } from "../../store/slices/watchedTvs.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './sty.css';
import {t} from 'i18next'

export default function TvTrending() {
  let watchedMovies = useSelector(state => state.watchedMovies.watchedMovies);
   (watchedMovies);
  const dispatch = useDispatch();
  const [tvs, setTv] = useState([]);
  const navigate = useNavigate();

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 1,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        }
      }
    ]
  };

  useEffect(() => {
    const fetchPopulartv = async () => {
      const tvs = await getTvTrending();
      setTv(tvs);
       (tvs);
    };

    fetchPopulartv();
  }, []);

  let d =1;

  return (
    <div className="container mx-0">
       <div className="flex-container">
        <div className="line"></div>
        <div className="text">
          <h1 className="main-title fs-3"
          onClick={()=>{navigate('/tv/trending')}}>
            {t('Trending Tv Shows')}
            <IoIosArrowForward className='fs-2 me-3 mb-1 ms-5 icon'/>
          </h1>
        </div>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {
            tvs.map((tv) => {
              return (
                <div className="carousel-items" key={tv.id}>
                  <div className=" d-flex justify-content-around">
                    <div className="card bg-dark text-light m-2" style={{ width: "100%" }} key={tv.id}>
                        <div >
                          <img 
                            src={`https://image.tmdb.org/t/p/original/${tv.backdrop_path}`} 
                            className="card-img-top " alt={tv.name} 
                            onClick={() => {navigate(`/showtv/${tv.id}`);}}
                          />
                        </div>
                        <div className="card-body bg-dark">
                          <div className="d-flex justify-content-between px-2">
                            <h2 className="card-title fs-6 fw-light text-start my-0">
                             {d++}. {(tv.name.length > 20 ) ? tv.name.substring(0, 17) + "..." : tv.name}
                            </h2>
                            <p className="d-inline fw-light">
                              <IoStarSharp
                                className="mb-1 me-1"
                                style={{ color: "#f5c618" }}
                              />
                              {tv.vote_average}
                            </p>
                          </div>
                          <p className="text-center watchlist m-2"
                          onClick={()=>{dispatch(addwatchedTvs(`${tv.id}`))}}>
                            <LuPlus className="fs-5 fw-lighter" /> {t('Watchlist')}
                          </p>
                          <a
                            className="showw"
                            onClick={() => navigate(`/tv/${tv.id}`)}
                          >
                            {t('Show Similar')}
                          </a>
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

