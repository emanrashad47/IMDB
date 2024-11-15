import TopRated from './sections/TopRated';
import Popular from './sections/Popular';
import Trending from './sections/Trending';
import './sections/sty.css'
import { useNavigate } from "react-router-dom";
import FirstSection from './sections/firstSection';
import TvTrending from './sections/tvTrending';
import TvPopular from './sections/tvPopular';
import Navbar from '../component/shared/layout/Navbar';
import TvTopRated from './sections/tvTopRated';
import { useTranslation } from 'react-i18next';
import Footer from '../component/shared/layout/footer';
import ButtonYellow from '../component/ui/Button';
import { IoIosArrowForward, IoIosArrowUp} from "react-icons/io";
import Celebrities from './sections/Celebrities';
import { useEffect, useState } from "react";


export default function MainSection() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const [scrollPosition, setSrollPosition] = useState(0);
  const [showGoTop, setshowGoTop] = useState("d-none");
  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);
    if (scrollPosition > 1000) {
      setshowGoTop("d-block");
    } else {
      setshowGoTop("d-none");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
    return ()=> window.removeEventListener('scroll',handleVisibleButton);
  }),[];
  const handleScrollUp = () => {
    window.scroll(0, 0);
  };
  return (
    <>      
      <button id='topBtn' className={` bg-white start-50 rounded-5 p-1 ${showGoTop}`} onClick={handleScrollUp}>
        <IoIosArrowUp />{t('back to top')}
        </button>
      <Navbar />
      <div className="main container " style={{width:'90%'}}>
        <FirstSection/>
        <Celebrities/>
        <strong className='ps-md-3 fs-1' style={{color: '#f5c618'}}>{t('What to watch?')}</strong>
        <TopRated />
        <TvTopRated/>
        <Trending />
        <div className='mt-5'>
          <strong 
          className='ps-md-3 fs-3' 
          style={{color: '#4d80e6', cursor: 'pointer'}}
          onClick={() => navigate("/watchList")}
          >
            {t('For More WatchList')} <IoIosArrowForward className='fs-2 me-3 mb-1 icon'/>
          </strong>
          <div className='text-center mt-3'>
            <p>
              {t('Sign in to access your Watchlist')} <br/> {t('Save shows and movies to keep track of what you want to watch.')}
              <ButtonYellow />

            </p>
          </div>
        </div>
        <TvTrending/>
        <Popular />
        <TvPopular/>
        <ButtonYellow />
      </div>
      <Footer />
    </>
  )
}
