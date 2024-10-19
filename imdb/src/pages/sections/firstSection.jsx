import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import i18next, { t } from "i18next";
import getPopular from "../../utils/movie/getPopular";
import Slider from "react-slick";
import './sty.css'

export default function FirstSection() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const moviess = await getPopular();
      setMovies(moviess);
    };

    fetchMovies();
  }, []);

  const handleAfterChange = (index) => {
    setCurrentIndex(index);
    nav2.slickGoTo(index);
  };

  return (
    <div className={`row g-5 d-flex align-items-center ${i18next.dir() === 'rtl' ? 'text-end' : 'text-start'}`}>
      <div className="col-12 col-lg-8 container">
        <div className="bg-black m-1">
          <div className="slider-container bg-black ">
            <Slider 
              asNavFor={nav2}
              // autoplay={true}
              // autoplaySpeed={4000}
              pauseOnHover={true} 
              cssEase={'linear'}
              ref={(slider) => (sliderRef1 = slider)} 
              rtl={i18next.dir() === 'rtl'} 
              afterChange={handleAfterChange}
            >
              {movies &&
                movies.map((movie) => (
                  <>
                    {/* image and title */}
                    <div className="card bg-dark carousel-main-card" key={movie.id}>
                      <div className="image-overlay">
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                          className="d-block w-100 card-img over"
                          alt={`${movie.title}`}
                          onClick={() => {
                            navigate(`/showmovie/${movie.id}`);
                          }}
                        />
                      </div>
                      <div className="card-img-overlay text-overlay" >
                        <div className="mx-5">
                          <h3 className="mb-2 fontSize" onClick={() => navigate(`/showmovie/${movie.id}`)} >
                            {t(movie.title)} 
                          </h3>
                          <p className="fontSize mb-0" >{t("released on")} {movie.release_date}</p>
                        </div>
                        <p className="fontSize mb-0 d-none d-md-block" >{t(movie.overview.substring(0, 70) + "...")}</p>
                        {/* <p className="mb-0">{t("Watch this")} 😍</p>
                        <p className="d-none d-md-block">
                          <span className="me-5 mt-0 mb-1">
                            <AiFillLike className="me-1" />
                            {movie.vote_average}
                          </span>
                          <span className="mt-0 mb-1">
                            {movie.vote_count} {t("votes")}
                          </span>
                        </p> */}
                      </div>
                    </div>
                    {/* relative image */}
                    <div className="carousel-card">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        className="d-block card-img"
                        alt={`${movie.title}`}
                        onClick={() => {
                          navigate(`/showmovie/${movie.id}`);
                        }}
                      />
                    </div>
                  </>
                ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="d-none d-lg-block col-lg-4">
        <div className="mx-0 bg-black" style={{ width: "100%" }}>
          <div className="slider-container bg-black">
            <h3 className="text-warning mb-4 ">{t('up next')}</h3>
            <Slider
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              slidesToShow={3}
              vertical={true}
              swipeToSlide={true}
              focusOnSelect={true}
              arrows={false}
              
            >
              {movies &&
                movies.map((movie) => (
                  <div key={movie.id} className="card bg-black">
                    <div className="row g-0">
                      <div className="col-md-3">
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          className="img-fluid rounded-start w-100"
                          alt={`${movie.title}`}
                          onClick={() => {
                            navigate(`/showmovie/${movie.id}`);
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body text-white">
                          {/* <p className="card-text">
                            <MdOutlineSlowMotionVideo className="me-2 fs-5" />
                            {t("Watch this")}
                          </p> */}
                          <p className="card-title fw-light">{t(movie.title)}</p>
                          <p className="card-text text-white-50">{t(movie.overview.substring(0, 20) + "...")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
