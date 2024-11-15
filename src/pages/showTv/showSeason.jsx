import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import getSeason from "../../utils/tvShows/getSeason";
import { BiDislike, BiLike } from "react-icons/bi";
import { t } from "i18next";
import "../sections/sty.css";
import HalfRating from "../../component/ui/halfRating";
import { IoStarSharp } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Navbar from "../../component/shared/layout/Navbar";
import Footer from "../../component/shared/layout/footer";
import  ReactLoading from '../../component/ui/loading';


export default function ShowSeason() {
  let { tv_id, season_number } = useParams();
  const [season, setSeason] = useState([]);
  const [done, setDone] = useState(undefined);

  const navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  
  useEffect(() => {
    setTimeout(() => {
    const fetchSeason = async () => {
      const season = await getSeason({ tv_id, season_number });
      setSeason(season);
      setDone(true);
    };

    fetchSeason();
  
}, 1000);
  }, [tv_id, season_number]);

  return (
    <>
    {!done ? (<div className="d-flex justify-content-center w-100 align-items-center" style={{height: '100vh'}}><ReactLoading/></div>) : (<>

    <Navbar/>
      <div
        className="row d-flex justify-content-center bg-black mx-auto mt-md-5"
        style={{ width: "100%" }}
      >
        <div className="col-12 col-md-3 my-2 my-md-0">
          <img
            width={"100%"}
            src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
            className=" rounded-2"
          />
          <div className=" d-flex flex-wrap align-items-center ps-2 mt-1">
            <span
              className="d-inline-flex align-items-center hover"
              style={{ fontSize: "100%" }}
            >
              <BiLike className="me-1 text-white" />
              {season.vote_average}
            </span>
            <span
              className="d-inline-flex align-items-center ms-2 ms-md-5 border-end border-white pe-2 hover"
              style={{ fontSize: "100%" }}
            >
              <BiDislike className="me-1 text-white" /> 3
            </span>
            <span
              className="d-inline-flex hover align-items-center ms-2 badge border rounded-5 p-2"
              style={{ fontSize: "80%" }}
            >
              {/* <FcLike className="fs-5 me-1 text-white" /> */}
              <span className="me-2 ">😍</span> 50
            </span>
            <span
              className="d-inline-flex hover align-items-center ms-2 badge border rounded-5 p-2"
              style={{ fontSize: "80%" }}
            >
              <span className="me-2 ">🦋</span> 47
            </span>
            <span
              className="d-inline-flex hover align-items-center ms-2 badge border rounded-5 p-2"
              style={{ fontSize: "80%" }}
            >
              <span className="me-2 ">👏🏻</span> 32
            </span>
          </div>
        </div>
        <div
          className="col-12 col-md-8 overflow-auto rounded-2 py-1 bg-gradient" 
        >
            <div className="flex-container">
            <div className="line"></div>
            <div className="text">
              <h1 className="main-title fs-3">{t("Season")}{' '}{season.season_number}</h1>
            </div>
            </div>
          <p className="d-flex align-items-center gap-2 text-warning">
            <HalfRating />
            {season.vote_average}{" "}
          </p>
          <p className="fs-6  ">
            {season.overview}
          </p>
          <div className="px-md-5 container">
          <div className="flex-container">
          <div className="line"></div>
            <div className="text">
              <h1 className="main-title fs-3">{t("episodes")}</h1>
            </div>
            </div>
            <div className="slider-container p-4 overflow-x-hidden">
              <Slider {...settings}>
                {season.episodes != null &&
                  season.episodes.map((epi) => {
                    return (
                      <div className="carousel-items hover" key={epi.id} >
                        <div className="d-flex justify-content-around">
                          <div className="card bg-black text-light m-2" style={{height: '20rem'}}
                          onClick={()=>{
                            navigate(`${epi.episode_number}`)
                        }}>
                            <div>
                              <img
                                src={`https://image.tmdb.org/t/p/original/${epi.still_path}`}
                                className="card-img-top h-100"
                                alt={epi.name}
                              />
                            </div>
                            <div className="card-body pb-0" >
                              <div className="d-flex justify-content-between my-0">
                                <h2 className="card-title text-warning fs-6 fw-light text-start ">
                                  {epi.name !='' && epi.name.length > 17 ? epi.name.substring(0, 17) + "...": epi.name }
                                </h2>
                                <p className="d-inline text-white">
                                  <IoStarSharp
                                    className="mb-1 me-1"
                                    style={{ color: "#f5c618" }}
                                  />
                                  {epi.vote_average.toFixed(2)}
                                </p>
                              </div>
                              <p className="fs-6 text-white-50">
                                {t("type")}: {epi.episode_type}
                              </p>
                              <p className="fs-6 my-0 text-white">{epi.air_date}</p>
                              <p className="fs-6 my-0 fw-lighter text-white">{t('episode')} {epi.episode_number}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      <div className="col-11 mx-auto p-2">
           <Outlet />

      </div>
      </div>
      <Footer/>
      </>
    )}

    </>
  );
}
