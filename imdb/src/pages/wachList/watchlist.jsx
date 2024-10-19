import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./watchlist.css";
import { useSelector } from "react-redux";
import Tv from "./tv.jsx";
import Movie from "./movie.jsx";
import Footer from "../../component/shared/layout/footer.jsx";
import {t} from 'i18next'

const Watchlist = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  
  const [isEditing, setIsEditing] = useState(false);

  const togglePublic = () => {
    setIsPublic(!isPublic);
  };

  const addItem = () => {
    const newItem = `Item ${watchlist.length + 1}`;
    setWatchlist([watchlist, newItem]);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  let tvs = useSelector((state) => state.watchedTvs.watchedTvs);


  console.log(tvs);

  let movies = useSelector((state) => state.watchedMovies.watchedMovies);

  return (
    <div className="watchlist-container">
      <div className="header">
        <Container>
          <Row>
            <Col>
              <div className="flex-container">
                <div className="line"></div>
                <div className="text">
                  <h1 className="main-title fs-3">
                    {t("Your Watchlist")}
                  </h1>
                </div>
              </div>
              <p>by ------------- • Created 1 week ago • Modified 1 week ago</p>
              <p className="description">
                Your Watchlist is the place to track the titles you want to
                watch. You can sort your Watchlist by the IMDb rating,
                popularity score, and arrange your titles in the order you want
                to see them.
              </p>
            </Col>
            <Col className="text-end">
              <div className="button-group d-flex align-items-center ">
                <Button className="edit" onClick={toggleEdit}>
                  🖊️ Edit
                </Button>
                <Form.Check
                  type="switch"
                  label="Public"
                  checked={isPublic}
                  onChange={togglePublic}
                  className="me-2"
                />
                <Button className="edit"> Export</Button>
                <Button className="edit"> 🔗</Button>
              </div>

              <Button
                variant="warning"
                className="create-list-btn"
                onClick={addItem}
              >
                + Create a new list
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="content-section">
        <Row>
          <Col md={8}>
              {tvs.length==0 && movies.length == 0 && (
                <p>{t('You havent added any shows to your watch list yet')}</p>
              )}
              {tvs.length > 0 && (
                <div>
                  <div className="flex-container">
                    <div className="line"></div>
                    <div className="text">
                        <h1 className="main-title fs-3">
                          {t("Tv Shows")}
                        </h1>
                    </div>
                  </div>
                  <div className=" g-1 g-md-2 d-flex flex-wrap justify-content-center">
                    {tvs && tvs.map((tv) => 
                    <Tv id={tv} key={tv}  show={isEditing}/>)}
                  </div>
                </div>
              )}
              {movies.length > 0 && (
                <div>
                  <div className="flex-container">
                    <div className="line"></div>
                    <div className="text">
                        <h1 className="main-title fs-3">
                          {t("Movies")}
                        </h1>
                    </div>
                  </div>
                  <div className=" g-1 g-md-2 d-flex flex-wrap justify-content-center">
                    {movies != [] &&
                      movies.map((movie) => <Movie id={movie} key={movie} show={isEditing}/>)}
                  </div>
                </div>
              )}
            {/* </div> */}
          </Col>

          <Col md={4}>
            <div className="more-to-explore">
              <h4 className="text-black">
                {" "}
                <span className="color ">|</span> More to explore :
              </h4>
              <div className="explore-item">
                <a href="#"> Your Check-Ins</a>
              </div>
              <div className="explore-item">
                <a href="#">Your Ratings</a>
              </div>
              <div className="explore-item">
                <a href="#">Your Watchlist</a>
              </div>
            </div>
            <div className="feedback">
              <h5>Feedback</h5>
              <a href="#">Tell us what you think about this feature.</a>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Watchlist;
