import { useEffect, useState } from 'react';
import { IoStarSharp } from "react-icons/io5";
import { CiBookmarkPlus } from "react-icons/ci";
import '../movie/specific.css'
import { useNavigate } from 'react-router-dom';
import getTvTopRated from '../../utils/tvShows/getTvTopRated';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { addwatchedTvs } from "../../store/slices/watchedTvs";
import Footer from "../../component/shared/layout/footer";
import Navbar from "../../component/shared/layout/Navbar";


export default function TopRatedTVPage() {
  let watchedTvs = useSelector(state => state.watchedTvs.watchedTvs);
  console.log(watchedTvs);
  const dispatch = useDispatch();
  const [tv, setTv] = useState([]);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() =>{
    const fetchSimilartv = async () => {
      const tvs = await getTvTopRated(); 
      setTv(tvs);
    };
    
    fetchSimilartv();
  },[])

  return (
    <>
      <Navbar />
    <div className="container mx-auto">
      <div className="container mx-auto">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3" style={{cursor: 'pointer'}}>
            {t('Top Rated Tv Shows')}
            </h1>
          </div>
        </div>
      </div>

      <div>
        {
          tv.map((tv) => {
            return(
              <div className="movie-card mb-3 w-100" key={tv.id}>
                <div className="d-flex">
                <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} alt="Tv Show Poster" onClick={() => {navigate(`/showtv/${tv.id}`);}}/>
                <div className="movie-info">
                  <p className="movie-name">{tv.name}</p>
                  <p className="movie-genre">{t('Views')}: {tv.popularity} {('times')}</p>
                  <p className="movie-cast"><IoStarSharp className='mb-1 me-1' style={{color: '#f5c618'}} /> {tv.vote_average}</p>
                </div></div>
                <div className="bookmark rounded-circle">
                  <span className="fs-5 mt-2"
                  onClick={()=>{dispatch(addwatchedTvs(`${tv.id}`))}}
                  ><CiBookmarkPlus /></span>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
      <Footer />
      </>
  );
}
