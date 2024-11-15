import { useEffect, useState } from 'react';
import { IoStarSharp } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { FaPlay } from "react-icons/fa6";
import { useNavigate, useParams} from "react-router-dom";
import getSimilarTv from '../../utils/tvShows/getSimilarTv';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { addwatchedTvs } from "../../store/slices/watchedTvs";
import Footer from "../../component/shared/layout/footer";
import Navbar from "../../component/shared/layout/Navbar";
import  ReactLoading from '../../component/ui/loading';

export default function SimilarTv() {
  let watchedTvs = useSelector(state => state.watchedTvs.watchedTvs);
  const dispatch = useDispatch();
  const [tvs, setTvs] = useState([]);
  let { tv_id } = useParams();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [done, setDone] = useState(undefined);

  useEffect(() =>{
    setTimeout(() => {
      const fetchSimilarTvs = async () => {
        const tvs = await getSimilarTv(tv_id); 
        setTvs(tvs);
        setDone(true);
      };
      
      fetchSimilarTvs();

    }, 1000);
  },[tv_id])

  
  let d =1;
  
  return (
    <>
    {!done ? (<div className="d-flex justify-content-center w-100 align-items-center" style={{height: '100vh'}}><ReactLoading/></div>) : (<>
      <Navbar />
    <div className='container px-4'>
      <div className="container mx-auto">
        <div className="flex-container">
          <div className="line"></div>
          <div className="text">
            <h1 className="main-title fs-3" style={{cursor: 'pointer'}}>
            {t('Tv Shows Similar To Your Choice')}
            </h1>
          </div>
        </div>
      </div>

      <div className='similar-card'>
        { tvs.length > 0 ?
          tvs.map((tv) => {
            return(
              <div className="card m-2 bg-dark text-light m-2 " key={tv.id}>
                <div  style={{height: '80%'}}>
                  <img src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`} className="card-img-top" alt={tv.title} onClick={() => {navigate(`/showtv/${tv.id}`);}}/>
                </div>
                <div className="card-body mt-3">
                  <p><IoStarSharp className='mb-1 me-1' style={{color: '#f5c618'}} /> {tv.vote_average}</p>
                  <h2 className="card-title title">{d++}. {tv.name}</h2>
                  <p className='text-center watchlist mb-4'
                  onClick={()=>{dispatch(addwatchedTvs(`${tv.id}`))}}
                  ><LuPlus className='fs-5'/> Watchlist</p>
                  <h3 className="text-center trailer fs-5"><FaPlay className='fs-6 mb-1'/> Trailer</h3>
                </div>
              </div>
            )
          })
          :
          <h6 className='text-center text-danger'>{t('No similar TV shows found')}</h6>
         
        }
      </div>
    </div>
    <Footer />

    </>
    )}
    </>
  );
}
