import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import MainSection from "./pages/MainSection.jsx";
import Similar from "./pages/sections/Similar.jsx";
import ShowMovie from "./pages/showMovie/showMovie";
import ShowPerson from "./pages/people/person.jsx";
import ShowCelebrity from "./pages/people/showCelebrity.jsx";
import SignIn from "./component/shared/layout/SignIn.jsx";
import SignUp from "./component/shared/layout/SignUp.jsx";
import Menu from "./component/shared/layout/Menu.jsx";
import PopularPage from "./pages/movie/popularPage.jsx";
import TopRatedPage from "./pages/movie/topRatedPage.jsx";
import TrendingPage from "./pages/movie/trendingPage.jsx";
import TrendingTVPage from "./pages/tvShows/trendingTvPage.jsx";
import TopRatedTVPage from "./pages/tvShows/topRatedTvPage.jsx";
import PopularTVPage from "./pages/tvShows/popularTvPage.jsx";
import NotPage from "./pages/notPage.jsx";
import ShowTv from "./pages/showTv/showTv.jsx";
import SimilarTv from "./pages/tvShows/similerTvPage.jsx";
import { useEffect, useState } from "react";
import i18n from "./translation/i18n.js";
import { Provider } from "react-redux";
import AllCelebrities from "./pages/people/allCelebrities.jsx";
import { store } from "./store/store";
import Watchlist from "./pages/wachList/watchList.jsx";
import ShowSeason from "./pages/showTv/showSeason.jsx";
import Episoide from "./pages/showTv/episoide.jsx";


function App() {
  const [watchListTv, setWatchListTv] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);

  useEffect(() => {
    localStorage.setItem("watchListTv", JSON.stringify(watchListTv));    
    localStorage.setItem("watchListMovies", JSON.stringify(watchListMovies));    
  }, [watchListTv,watchListMovies]);

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, []);

  return (
      <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MainSection />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/celebrities" element={<AllCelebrities />} />
            <Route path="/movie/:movie_id" element={<Similar />} />
            <Route path="/tv/:tv_id" element={<SimilarTv />} />
            <Route path="/showmovie/:movie_id" element={<ShowMovie />} />
            <Route path="/celebrity/:celebrity_name" element={<ShowCelebrity />}/>
            <Route path="/person/:celebrity_id" element={<ShowPerson />} />
            <Route path="/movie/popular" element={<PopularPage />} />
            <Route path="/movie/top rated" element={<TopRatedPage />} />
            <Route path="/movie/trending" element={<TrendingPage />} />
            <Route path="/tv/trending" element={<TrendingTVPage />} />
            <Route path="/tv/top_rated" element={<TopRatedTVPage />} />
            <Route path="/tv/popular" element={<PopularTVPage />} />
            <Route path="/:tv_id/season/:season_number" element={<ShowSeason />} >
              <Route path=":epi_number" element={< Episoide />}/>
            </Route>
            <Route path="/showtv/:tv_id" element={<ShowTv />} />
            <Route path="/watchList" element={<Watchlist />} />
            <Route path="*" element={<NotPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
 );
}

export default App;
