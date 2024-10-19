import { useEffect, useState } from 'react';
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import './sty.css';
import './similar.css';
import ButtonYellow from "../../component/ui/Button";
import {useNavigate,  useParams} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import getSimilar from '../../utils/movie/getSimilar';
// import Cards from '../ss.jsx';

export default function Similar() {
  const [movies, setMovies] = useState([]);
  let { movie_id } = useParams();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() =>{
    const fetchSimilarMovies = async () => {
      const movies = await getSimilar(movie_id); 
      setMovies(movies);
      console.log(movie_id);
    };
    
    fetchSimilarMovies();
  },[movie_id])

  let d =1;
  
  return (
    <div className='container mb-5'>
        <div className="flex-container">
        <div className="line"></div>
        <div className="text">
          <h1 className="main-title fs-3"
          >
            {t('Movies Similar To Your Choice' )}
          </h1>
        </div>
      </div>

      <div className='similar-card'>
        { movies.length > 0 ?
          movies.map((movie) => {
            return(
              <div onClick={() => {navigate(`/showmovie/${movie.id}`);}} className="card bg-dark text-light m-2" style={{ width: '90%' }} key={movie.id}>
                <div  style={{height: '80%'}}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title}/>
                </div>
                <div className="card-body mt-3">
                  <p><IoStarSharp className='mb-1 me-1' style={{color: '#f5c618'}} /> {movie.vote_average}</p>
                  <h2 className="card-title title">{d++}. {(movie.title.length > 20 ) ? movie.title.substring(0, 17) + "..." : movie.title}</h2>
                  <p className='text-center watchlist mb-4'><LuPlus className='fs-5'/> Watchlist</p>
                  <h3 className="text-center trailer fs-5"><FaPlay className='fs-6 mb-1'/> Trailer</h3>
                </div>
              </div>
            )
          })
          :
          <h6 className='text-center text-danger'>{t('No similar Movies found')}</h6>
        }
      </div>
      <ButtonYellow />
    </div>
  );
}
