import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getSeason from "../../utils/tvShows/getSeason";
import { t } from "i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoStarSharp } from "react-icons/io5";

export default function Episoide() {
  let param = useParams();
  const navigate = useNavigate();
  const tv_id = param.tv_id;
  const season_number = param.season_number;
  const epi_number = param.epi_number;
  const [epi, setEpi] = useState([]);
  const [guests, setGuests] = useState([]);
  console.log(param);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
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
    const fetchEpisoide = async () => {
      const episoide = await getSeason({ tv_id, season_number });
      setEpi(episoide.episodes[epi_number - 1]);
      setGuests(episoide.episodes[epi_number - 1].guest_stars);
      console.log(episoide);
    };

    fetchEpisoide();
  }, [tv_id, season_number, epi_number]);

  console.log(epi);

  return (
    <div className="mx-auto bg-black ps-lg-3 h-100">
        <div className="rounded-2 my-3 p-2 bg-gradient">
      <p className="text-warning fs-4">{epi.name}</p>
      <p className=" fw-light text-white-50">
        {epi.runtime} {t("min")}
      </p>
      <p className=" fw-light">{epi.overview}</p>
      </div>
      {guests.length != 0 && (
        <div className="px-lg-5 container">
          <div className="flex-container">
            <div className="line"></div>
            <div className="text">
              <h1 className="main-title fs-3">{t("guest stars")}</h1>
            </div>
          </div>

          <div className="slider-container">
            <Slider {...settings}>
              {guests.length != 0 &&
                guests.map((guest) => {
                  return (
                    <div className="carousel-items hover" key={guest.id}>
                      <div className="d-flex justify-content-around">
                        <div
                          className="card bg-dark text-light m-2 "
                          style={{ height: "23rem" }}
                          onClick={() => {
                            navigate(`/person/${guest.id}`);
                          }}
                        >
                          <div className="h-75">
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${guest.profile_path}`}
                              className="card-img-top h-100"
                              alt={guest.original_name}
                            />
                          </div>
                          <div className="card-body p-1 h-25">
                            <div className="d-flex justify-content-between my-0">
                              <p className="card-title fs-6 fw-lighter text-start ">
                                {guest.name}{" "}
                                <span className=" text-secondary">
                                  {t("character")}
                                </span>{" "}
                                {guest.character}
                              </p>
                              <p className="d-inline text-white">
                                <IoStarSharp
                                  className="mb-1 me-1"
                                  style={{ color: "#f5c618" }}
                                />
                                {guest.popularity.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
