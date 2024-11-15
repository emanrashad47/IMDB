
import { CiCircleRemove } from 'react-icons/ci';
import './menu.css';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="menu-wrapper py-5 " style={{height: '100vh'}}>
      <div className="menu-header">
        <div className="menu-logo ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" alt="IMDb Logo" />
        </div>

        <button className="menu-close" onClick={() => { navigate('/')}}>
          <CiCircleRemove className='bg-warning text-dark rounded-5 fs-2' />
        </button>
      </div>

      <div className="menu-container">
        <div className="menu-column">
          <div className="menu-section">
            <h3><i className="fas fa-film"></i> Movies</h3>
            <ul>
              <li>Release Calendar</li>
              <li onClick={()=>{navigate('/movie/top rated')}}>Top 250 Movies</li>
              <li onClick={()=>{navigate('/movie/popular')}}>Most Popular Movies</li>
              <li>Browse Movies by Genre</li>
              <li>Top Box Office</li>
              <li>Showtimes & Tickets</li>
              <li>Movie News</li>
              <li>India Movie Spotlight</li>
            </ul>
          </div>

          <div className="menu-section">
            <h3><i className="fas fa-tv"></i> TV Shows</h3>
            <ul>
              <li>Whats on TV & Streaming</li>
              <li onClick={()=>{navigate('/tv/top_rated')}}>Top 250 TV Shows</li>
              <li onClick={()=>{navigate('/tv/popular')}}>Most Popular TV Shows</li>
              <li>Browse TV Shows by Genre</li>
              <li>TV News</li>
            </ul>
          </div>
        </div>

        <div className="menu-column">
          <div className="menu-section">
            <h3><i className="fas fa-award"></i> Awards & Events</h3>
            <ul>
              <li>Oscars</li>
              <li>Emmys</li>
              <li>TIFF</li>
              <li>Festival Season</li>
              <li>Hispanic Heritage Month</li>
              <li>STARmeter Awards</li>
              <li>Awards Central</li>
              <li>All Events</li>
            </ul>
          </div>

          <div className="menu-section">
            <h3><i className="fas fa-play"></i> Watch</h3>
            <ul>
              <li>What to Watch</li>
              <li>Latest Trailers</li>
              <li>IMDb Originals</li>
              <li>IMDb Picks</li>
              <li>IMDb Spotlight</li>
              <li>IMDb Podcasts</li>
            </ul>
          </div>
        </div>

        <div className="menu-column">
          <div className="menu-section">
            <h3><i className="fas fa-user"></i> Celebs</h3>
            <ul>
              <li>Born Today</li>
              <li>Most Popular Celebs</li>
              <li>Celebrity News</li>
            </ul>
          </div>

          <div className="menu-section">
            <h3><i className="fas fa-users"></i> Community</h3>
            <ul>
              <li>Help Center</li>
              <li>Contributor Zone</li>
              <li>Polls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Menu;
