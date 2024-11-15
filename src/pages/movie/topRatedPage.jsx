import { useEffect, useState } from 'react';
import { IoStarSharp } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";
import './specific.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../../component/shared/layout/footer'
import { t } from 'i18next';
import { useDispatch, useSelector } from "react-redux";
import { addwatchedMovies } from "../../store/slices/watchedMovies.js";
import getTopRated from '../../utils/movie/getTopRated.js';
import Navbar from '../../component/shared/layout/Navbar.jsx';
import  ReactLoading from '../../component/ui/loading';


export default function TopRatedPage() {
  let watchedMovies = useSelector(state => state.watchedMovies.watchedMovies);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [done, setDone] = useState(undefined);
  const navigate = useNavigate();


  useEffect(() =>{
    setTimeout(() => {
      const fetchSimilarMovies = async () => {
        const movies = await getTopRated(); 
        setMovies(movies);
        setDone(true);
      };
      
      fetchSimilarMovies();
      
    }, 1000);
  },[])

  return (
    <>
    {!done ? (<div className="d-flex justify-content-center w-100 align-items-center" style={{height: '100vh'}}><ReactLoading/></div>) : (<>
    <Navbar/>  {/* Import Navbar component */}
      <div className="container mx-auto ">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3">
            {t('Top Rated Movies')}
            </h1>
          </div>
        </div>
        <div>
          {
            movies.map((movie) => {
              return(
                <div className="movie-card mb-3 w-100" key={movie.id}>
                  <div className="d-flex">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} onClick={() => {navigate(`/showmovie/${movie.id}`);}} alt="Movie Poster" />
                  <div className="movie-info">
                    <p className="movie-name" onClick={() => {navigate(`/showmovie/${movie.id}`);}}>{movie.title}</p>
                    <p className="movie-genre">{t('Views')}: {movie.popularity} {t('times')}</p>
                    <p className="movie-cast"><IoStarSharp className='mb-1 me-1' style={{color: '#f5c618'}} /> {movie.vote_average}</p>
                  </div></div>
                  <div className="bookmark rounded-circle">
                    <span className="fs-5 mt-2"
                    onClick={()=>{dispatch(addwatchedMovies(`${movie.id}`))}}
                    ><CiBookmarkPlus /></span>
                  </div>
                </div>
              )
            })
            
          }
        </div>
      </div>
      <Footer/>
      </>
    )}
    </>
  );
}
