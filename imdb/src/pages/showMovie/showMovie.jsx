import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import HalfRating from "../../component/ui/halfRating";
import ButtonYellow from "../../component/ui/Button";
import getMovie from "../../utils/movie/getMovie";
import Recommendation from "./recommendation";
import PlayingNow from "../sections/playingNow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../sections/sty.css";
// import { t } from "i18next";
import Navbar from "../../component/shared/layout/Navbar";
import Footer from "../../component/shared/layout/footer";
import getMovieTrans from "../../utils/movie/getTranslatedMovie";
import { useTranslation } from "react-i18next";


export default function ShowMovie() {
  const { t, i18n } = useTranslation();
  const [movie, setMovie] = useState([]);
  const [movietransArabic, setMovieTransArabic] = useState([]);
  let { movie_id } = useParams();
  let [genres, setGenres] = useState([]);
  //لتحديد ارتفاع السكرول تبع البيانات
  let heights = (screen.width > 768 ) ? '19rem' :'auto';
  
  useEffect(() => {
    const fetchMovie = async () => {
      const movie = await getMovie(movie_id);
      const movietrans = await getMovieTrans(movie_id);
      setMovie(movie);
      setMovieTransArabic(movietrans);

      if(i18n.language === 'ar' && movietrans.genres.length != 0){
        setGenres(movietrans.genres )
      }else{
        setGenres(movie.genres )
      }
      
    };

    fetchMovie();
  }, [movie_id , i18n.language , movie , movietransArabic]);

  console.log(genres);
  console.log(movie);
  console.log(movietransArabic);
  

  return (
    <>
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
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          />
          <div className=" d-flex flex-wrap align-items-center ps-2 mt-1 ">
            <span
              className="d-inline-flex align-items-center hover"
              style={{ fontSize: "100%" }}
            >
              <BiLike className="me-1 text-white" />
              {movie.vote_count}
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
          className="col-12 col-md-4 col-lg-6 overflow-auto rounded-2 px-3 py-1 bg-gradient mt-2 mt-md-0" 
          style={{ height: `${heights}` }}
        >
          {i18n.language ==='ar' &&  movietransArabic && movietransArabic.title && movietransArabic.title.length != 0 ?(<p className="fs-2">{movietransArabic.title}</p>) :(<p className="fs-2">{movie.title}</p>)}
          <p className="small fst-italic">{t('Original name')}: {movie.original_title}</p>
          <p className="d-flex flex-wrap justify-content-start gap-4">
            {movie && movietransArabic && genres &&
              genres.map((genre) => (
                <span key={genre.id} className="fs-5 text-warning fw-lighter">
                  {genre.name}
                </span>
              ))}
            <span className="d-flex align-items-center gap-2 text-warning">
              <HalfRating />
              {movie.vote_average}{" "}
            </span>
          </p>
          {i18n.language ==='ar' &&  movietransArabic  && movietransArabic.overview && movietransArabic.overview.length != 0 ? ( <p className="fs-6 fw-lighter mt-3 small">-  {movietransArabic.overview } </p>) : ( <p className="fs-6 fw-lighter mt-3 small">- {movie.overview} </p>)}
          <p className="fs-5 fw-lighter mt-3 text-warning">
            {t('Production companies')}
          </p>
          <p>
            {movie.production_companies &&
              movie.production_companies.map((comp) => (
                <p key={comp.id} className="text-white-75 fw-lighter small">
                  {comp.name}
                </p>
              ))}
          </p>
        </div>
      </div>
      <Recommendation id={movie_id} />
      <PlayingNow/>
      <ButtonYellow />
      <Footer/>
    </>
  );
}

