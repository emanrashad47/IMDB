import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import HalfRating from "../../component/ui/halfRating";
import ButtonYellow from "../../component/ui/Button";
import getTv from "../../utils/tvShows/getTv";
import { IoStarSharp } from "react-icons/io5";
import TvRecommendation from "./tvRecommendations";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../sections/sty.css";
import Navbar from "../../component/shared/layout/Navbar";
import Footer from "../../component/shared/layout/footer";
import { useTranslation } from "react-i18next";
import getTvTrans from "../../utils/tvShows/getTranslatedTv";
import OnTheAirTvShows from "../sections/tvOnTheAir";
import  ReactLoading from '../../component/ui/loading';


export default function ShowTv() {
  const { t, i18n } = useTranslation();
  const [tv, setTv] = useState([]);
  const [tvtransArabic, setTvTransArabic] = useState([]);
  let { tv_id } = useParams();
  let [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const [done, setDone] = useState(undefined);

  //لتحديد ارتفاع السكرول تبع البيانات
  let heights = screen.width > 768 ? "19rem" : "auto";

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
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
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
      const fetchTv = async () => {
      const tvs = await getTv(tv_id);
      const tvtrans = await getTvTrans(tv_id);
      setTv(tvs);
      setTvTransArabic(tvtrans);
        
      if(i18n.language === 'ar' && tvtrans.genres.length != 0){
        setGenres(tvtrans.genres )
      }else{
        setGenres(tvs.genres )
      }
      setDone(true);
    };

    fetchTv();
    }, 1000);
    
  }, [tv_id,  i18n.language , tv , tvtransArabic]);

  return (
    <>
    {!done ? (<div className="d-flex justify-content-center w-100 align-items-center" style={{height: '100vh'}}><ReactLoading/></div>) : (<>
    <Navbar/>
      <div
        className="row d-flex justify-content-center align-items-center align-items-md-start bg-black mx-auto mt-5"
        style={{ width: "100%" }}
      >
        {/* pooster and emojy */}
        <div className="col-12 col-md-7 col-lg-5">
          <img
            className="rounded-3"
            width={"100%"}
            src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
          ></img>
          <div className=" d-flex flex-wrap align-items-center ps-2 mt-1">
            <span
              className="d-inline-flex align-items-center hover"
              style={{ fontSize: "100%" }}
            >
              <BiLike className="me-1 text-white" />
              {tv.vote_count}
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
            <span
              className="d-inline-flex hover align-items-center ms-2 badge border rounded-5 p-2"
              style={{ fontSize: "80%" }}
            >
              <span className="me-2 ">🫠</span> 5
            </span>
          </div>
        </div>

        {/* data scroll */}
        <div
          className="col-12 col-md-4 col-lg-6 overflow-auto rounded-2 px-3 py-1 bg-gradient mt-2 mt-md-0 " 
          style={{ height: `${heights}` }}
        >
          {i18n.language ==='ar' &&  tvtransArabic && tvtransArabic.name && tvtransArabic.name.length != 0 ?( <p className="fs-2">{tvtransArabic.name}</p>) :(<p className="fs-2">{tv.name}</p>)}
          <p className="small fst-italic">
            {t("Original name")}: {tv.original_name}
          </p>
          <p className="d-flex flex-wrap justify-content-start gap-4">
            {tv && tvtransArabic && genres &&
              genres.map((genre) => (
                <span key={genre.id} className="fs-5 text-warning fw-lighter ">
                  {genre.name}
                </span>
              ))}
            <span className="d-flex align-items-center gap-2 text-warning">
              <HalfRating />
              {tv.vote_average}{" "}
            </span>
          </p>
          <span className="fs-6 text-white-50 fw-lighte ">
            {tv.number_of_seasons} {t("Seasons")}
          </span>
          <span className="fs-6 text-white-50 fw-light mx-3">
            {tv.number_of_episodes} {t("episode")}
          </span>
          <p className="fs-6 text-white-50 fw-lighter ">
            {tv.first_air_date} {t("to")} {tv.last_air_date}
          </p>
          {i18n.language ==='ar' &&  tvtransArabic && tvtransArabic.overview && tvtransArabic.overview.length != 0 ?( <p className="fs-6 fw-lighter mt-3 small">- {tvtransArabic.overview}</p>) :(<p className="fs-6 fw-lighter mt-3 small">- {tv.overview}</p>)}
          <p className="fs-5 fw-lighter mt-3 text-warning">
            {t("Production companies")}
          </p>
          <p>
            {tv.production_companies &&
              tv.production_companies.map((comp) => (
                <p key={comp.id} className="text-white-75 fw-lighter small">
                  {comp.name}
                </p>
              ))}
          </p>
        </div>

        {/* season */}
      </div>
      <div className="px-md-5 container">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3 ">{t("Seasons")}</h1>
          </div>
        </div>
        <div className="slider-container p-3">
          <Slider {...settings}>
            {tv.seasons != null &&
              tv.seasons.map((season) => {
                return (
                  <div className="carousel-items" key={season.id}>
                    <div className="d-flex justify-content-around">
                      <div
                        className="card bg-dark text-light m-2 hover"
                        style={{ height: "45rem" }}
                        onClick={() => {
                          navigate(`/${tv_id}/season/${season.season_number}`);
                        }}
                      >
                        <div className="h-75">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                            className="card-img-top h-100"
                            alt={season.name}
                          />
                        </div>
                        <div className="card-body pb-0">
                          <div className="d-flex justify-content-between my-0">
                            <h2 className="card-title text-warning fs-5 fw-light text-start ">
                              {t('Season')} {season.season_number}
                            </h2>
                            <p className="d-inline text-white">
                              <IoStarSharp
                                className="mb-1 me-1"
                                style={{ color: "#f5c618" }}
                              />
                              {tv.vote_average}
                            </p>
                          </div>
                          <p className="fs-6 text-white-50">
                            {season.episode_count} {t("episodes")}
                          </p>
                          {season.overview != "" ? (
                            <p
                              className="fs-6 fst-italic fw-light"
                              style={{ height: "3rem" }}
                            >
                              {season.overview.substring(0, 50) + "..."}
                            </p>
                          ) : (
                            <p
                              className="fs-6 fst-italic fw-light"
                              style={{ height: "3rem" }}
                            >
                              {t("No overview available")}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
      <TvRecommendation id={tv_id} />
      <OnTheAirTvShows/>
      <ButtonYellow />
      <Footer/>
      </>
    )}
    </>
  );
}
