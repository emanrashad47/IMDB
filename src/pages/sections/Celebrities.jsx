import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from 'react-icons/io';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {t} from 'i18next'
import './sty.css';
import getCelebrities from "../../utils/people/celebrity/getCelebrities";

export default function Celebrities() {
  const [celebrities, setcelebrities] = useState([]);
  const navigate = useNavigate();


  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    initialSlide: 1,
    // rtl: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
    const fetchPopularcelebrities = async () => {
      const celebrities = await getCelebrities();
      setcelebrities(celebrities);
    };

    fetchPopularcelebrities();
    
  }, []);

  let d =1;

  return (
    <>
     <div className="container">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3"
            onClick={()=>{navigate('/celebrities')}}>
              {t('Celebrities')}
              <IoIosArrowForward className="fs-2 mb-1 ms-5 icon" />
            </h1>
          </div>
        </div>
        <div className="slider-container">
          <Slider {...settings}>
            {
              celebrities.map((celebritie) => {
                return (
                  <div className="carousel-inner" key={celebritie.id}>
                    <div className="carousel-items">
                      <div className="m-2" style={{ width: '100%'}} key={celebritie.id}>
                        <div className="d-flex justify-content-around">
                          <div
                            className="text-light text-center"
                            style={{ width: "18rem" }}
                            key={celebritie.id}
                          >
                            <div style={{ height: "65%" }}>
                              <img
                                src={`https://image.tmdb.org/t/p/w500/${celebritie.profile_path}`}
                                style={{ height: "70%", width: "70%", objectFit: "cover" }}
                                className="card-img-top rounded-circle ms-3 mb-4"
                                alt={celebritie.title}
                                onClick={() => navigate(`/celebrity/${celebritie.name}`)}
                              />
                              <p>
                                <IoStarSharp
                                  className="mb-1 me-1"
                                  style={{ color: "#f5c618" }}
                                />{" "}
                                {celebritie.known_for[1].vote_average}
                              </p>
                              <h2 className="card-title title">
                                {d++}. {celebritie.name}
                              </h2>
                            </div>
                          </div>
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
    </>
  );
}
 


      