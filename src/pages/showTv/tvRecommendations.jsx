import { useEffect, useState } from "react";
import "../sections/sty.css";
import getRecommendationOfTv from "../../utils/tvShows/getRecommendation";
import { IoStarSharp } from "react-icons/io5";
import { t } from 'i18next';
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addwatchedTvs } from "../../store/slices/watchedTvs.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function TvRecommendation(prop) {
  const id = prop.id;
  let watchedMovies = useSelector(state => state.watchedMovies.watchedMovies);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  let navigate = useNavigate();

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
          slidesToScroll: 3,
          infinite: false,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
      const movies = await getRecommendationOfTv(id);
      setMovies(movies);
    };

    fetchMovies();
  }, [id]);

  return (<>{
    movies.length !=0 &&
    <div className="container mx-auto" style={{width:'100%'}}>
      <div className="flex-container">
      <div className="line"></div>
      <div className="text">
      <h1 className='main-title fs-3 ' >
        {t('Recommandations')}
      </h1>
      </div>
      </div>
      <div className="slider-container p-3">
        <Slider {...settings}>
          {
            movies.map((item) => {
              return (
                <div className="carousel-items" key={item.id}>
                  <div className=" d-flex justify-content-around">
                    <div className="card bg-dark text-light m-2" style={{ width: "100%" }} key={item.id}>
                        <div >
                          <img 
                            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`} 
                            className="card-img-top " alt={item.name} 
                            onClick={() => {navigate(`/showtv/${item.id}`);}}
                          />
                        </div>
                        <div className="card-body bg-dark">
                          <div className="d-flex justify-content-between px-2">
                            <h2 className="card-title fs-6 fw-light text-warning text-start my-0">
                            {(item.name.length > 20 ) ? item.name.substring(0, 17) + "..." : item.name}
                            </h2>
                            <p className="d-inline fw-light">
                              <IoStarSharp
                                className="mb-1 me-1"
                                style={{ color: "#f5c618" }}
                              />
                              {item.vote_average}
                            </p>
                          </div>
                          <p className="text-center watchlist m-2"
                          onClick={()=>{dispatch(addwatchedTvs(`${item.id}`))}}>
                            <LuPlus className="fs-5 fw-lighter" /> {t('Watchlist')}
                          </p>
                          <a
                            className="showw"
                            onClick={() => navigate(`/tv/${item.id}`)}
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
  }</>);
}

