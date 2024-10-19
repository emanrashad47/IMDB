import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";
import { FcLike } from "react-icons/fc";
import getMovies from "../../utils/people/person/getMovies";
import "./../sections/sty.css";
import getPerson from "../../utils/people/person/getPerson";
import { FaStar } from "react-icons/fa6";
import { t } from "i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import Navbar from "../../component/shared/layout/Navbar";
import Footer from "../../component/shared/layout/footer";

export default function ShowPerson() {
  const [celebrity, setCelebrity] = useState({});
  const [celebritymovies, setcelebritymovies] = useState([]);
  const navigate = useNavigate();
  let { celebrity_id } = useParams();
  let heights = screen.width > 820 ? "573px" : "auto";
  // console.log(heights);
  // console.log(screen.width);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchcelebrity = async () => {
      const celebritys = await getPerson(celebrity_id);
      setCelebrity(celebritys);
      console.log(celebrity);

      const celebritymovies = await getMovies(celebritys.id);
      setcelebritymovies(celebritymovies);
      console.log(celebrity_id);
    };
    fetchcelebrity();
  }, []);

  // console.log(celebritymovies);
  // console.log(celebrity);
  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-2" style={{ width: "99vw" }}>
        <Row className=" g-lg-5">
          <Col
            xs={12}
            md={4}
          >
            <Card
              className="bg-dark text-center rounded-4 overflow-hidden "
              style={{ height: `${heights}` }}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${celebrity.profile_path}`}
                alt={celebrity.name}
                className="card-img "
              />
              <div className="text-warning fw-lighter my-auto">
                {celebrity.birthday}
                {celebrity.deathday && <span> - {celebrity.deathday}</span>}
                <p>{celebrity.place_of_birth}</p>
              </div>
            </Card>
          </Col>

          <Col xs={12} lg={7} style={{ height: `${heights}` }} className="overflow-y-auto border-1 bg-black rounded-2 overflow-x-hidden" >
            <div className="p-2 p-md-0">
              <h2 className="mb-0">{celebrity.name}</h2>
              <span className="fs-4 fw-lighter text-warning mt-1 me-3 me-lg-5">
                {celebrity.known_for_department}
              </span>
              <span className="fs-4 fw-lighter text-warning d-inline-flex align-items-center">
                <FcLike className="me-2" />
                <span>{celebrity.popularity}</span>
              </span>
              {celebrity.biography != "" && (
                <div>
                  <span className="d-block h4 mt-1">{t("Biography")}</span>
                  <p className="fs-5 fw-lighter">{celebrity.biography}</p>
                </div>
              )}
            </div>
            {celebritymovies.length !=0 && (
              <div className="slider-container p-4 overflow-hidden">
                <Slider {...settings}>
                  {celebritymovies.length !=0 &&
                    celebritymovies.map((movie) => (
                      <Card
                        key={movie.id}
                        // border="dark"
                        className="bg-dark text-start text-white rounded-4 overflow-hidden"
                      >
                        <Row className="g-0 d-flex">
                          <Col xs={12} md={5} className="">
                            <div
                              onClick={() => {
                                navigate(`/showmovie/${movie.id}`);
                              }}
                            >
                              <img
                                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                alt={movie.title}
                                className=" card-img img-fluid"
                              />
                              
                            </div>
                          </Col>
                          <Col xs={12} md={6}>
                          <Card.Body>
                            <Card.Title className="text-warning  d-flex justify-content-between align-items-center">
                              <span className="fs-4 hover" onClick={() => {
                              navigate(`/showmovie/${movie.id}`);
                            }}>{movie.title}</span>
                              <span className="text-warning fs-6">
                              <FaStar className="ms-2 " />
                              {movie.vote_average.toFixed(2)}
                            </span>
                            </Card.Title>
                            <Card.Text className="fw-light fs-5 overflow-y-auto">
                              <p className="fs-6 fw-lighter">
                                {movie.release_date}
                              </p>
                              {movie.overview.substring(
                                0,
                                heights === "auto" ? 50 : 100
                              ) + "..."}
                            </Card.Text>
                          </Card.Body>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                </Slider>
              </div>
            )}
          </Col>
        </Row>
      </div>
      <Footer/>
    </>
  );
}
