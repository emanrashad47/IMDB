import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import '../component/shared/layout/navbar.css'
import getPopular from '../utils/movie/getPopular';
import getCelebrities from '../utils/people/celebrity/getCelebrities';
import getTvPopular from '../utils/tvShows/getTvPopular';
import getPlayingNow from '../utils/movie/getPlayingNow';
import getTopRated from '../utils/movie/getTopRated';
import getTrending from '../utils/movie/getTrending';
import getTvTrending from '../utils/tvShows/getTvTrending';
import getTvTopRated from '../utils/tvShows/getTvTopRated';
import getTvOnTheAir from '../utils/tvShows/getTvOnTheAir';

const SearchIMDb = (prop) => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [celebrities, setCelebrities] = useState([]);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false); // New state to track if search has occurred
  const {t} = useTranslation();

  useEffect(() =>{
    const fetchData = async () => {
      const celebrities = await getCelebrities();
      const moviesPopular = await getPopular();
      const moviesPlayingNow = await getPlayingNow();
      const moviesTopRated = await getTopRated();
      const moviesTrending = await getTrending();
      const tvPopular = await getTvPopular();
      const tvTrending = await getTvTrending();
      const tvTopRated = await getTvTopRated();
      const tvOnTheAir = await getTvOnTheAir();

      setMovies(Array.from(new Set([...moviesPopular, ...moviesPlayingNow, ...moviesTopRated, ...moviesTrending])));
      setTv(Array.from(new Set([...tvTrending, ...tvPopular, ...tvTopRated, ...tvOnTheAir])));
      setCelebrities(celebrities);
      // setPopular(movies.concat(tv).concat(celebrities)); // Combine all the data into one array
    };

    fetchData();
  },[])
  // console.log(movies);

  const handelSelected = () => {
    const string = document.querySelector('#string')
    // console.log(string.options[string.selectedIndex].innerHTML);
    // console.log(string.selectedIndex);
    setIndex(string.selectedIndex) ;
  };
// console.log(index);

  // const handleSearch = () => {
  //   let str =  document.querySelector('#input');
  //   setQuery(str.value); // Update query based on user input
  //   setSearched(true); // Set searched to true when user types in the search input
  //   // const list = document.getElementById('search-reault');
  //   let output  ;

  //   // if(index == 0){
  //   //   if(item.title != undefined){return <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
  //   //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>}
  //   //   else{
  //   //     return item.season_number != undefined ? (<p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
  //   //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>)
  //   //   :(<p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
  //   //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>)
  //   //   }
  //   // if(index == 0){
  //   //    output = (<>{filteredCelebrities.map((item) => {
  //   //       <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
  //   //         className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
  //   //       })}</>)
  //   // }
  //   // else if(index == 1 ){ 
  //   //   output=(<>{filteredMovies.map((item) => {
  //   //       <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
  //   //         className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
  //   //       })}</>)
  //   // }
  //   // else if(index == 2 ){ 
  //   //   output=(<>{filteredTv.map((item) => { 
  //   //         <p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
  //   //         className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
  //   //       })}</>)
  //   // }
  //   // else{
  //   //   output=(<p>{t('No results found')}</p>)
  //   //   }
  //   //   console.log(output);
      
  //   //   return output ;
  // };
//  
//  
 
  // const handleBlur = () => {
  //   const result = document.getElementById('search-reault');
  //   result.style.display = 'none';
  //   const input = document.querySelector('input');
  //   input.style.marginBottom = '1rem';
  //   input.style.marginTop = '0rem';
  // };

  const handelFocus = searched && (() => {
    const result = document.getElementById('search-reault');
    result.style.display = 'block !important';
  })();

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredTv = tv.filter((tv) =>
    tv.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCelebrities = celebrities.filter((celebrity) =>
    celebrity.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Update query based on user input
    e.target.value != '' ? setSearched(true) : setSearched(false) ; // Set searched to true when user types in the search input
    console.log(query);
  };

  
  // const filteredPopular = [filteredMovies , filteredTv , filteredCelebrities];
  // console.log(filteredPopular);
  
  const handleSearch = searched && query!= '' && (() => { 
    if(index === 0 ){
      return(
         (filteredCelebrities.length > 0 && 
          filteredCelebrities.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
            )))
            &&
        (filteredMovies.length > 0 && 
          filteredMovies.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
            )))
            // &&
        // (filteredTv.length > 0 &&
        //   filteredTv.map((item) => (
        //     <p key={item.id}  onClick={() => navigate(`/showtv/${item.id}`)}
        //       className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
        //     )))
         )
      }
  
    if(index === 1 ){ 
      console.log(filteredCelebrities);
      if(filteredCelebrities.length > 0){
        return filteredCelebrities.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
            ))
      }
      else{
        return <p>{t('No results found')}</p>
      }  
    }
    else if(index === 2 ){ 
      if(filteredMovies.length > 0){
        console.log(filteredMovies);
          return filteredMovies.map((item) => (
                <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
                  className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
            ))
      } 
      else{
        return <p>{t('No results found')}</p>
      }
    }
    else if(index === 3 ){ 
      console.log(filteredTv);
      if(filteredTv.length > 0 ){
          return filteredTv.map((item) => ( 
              <p key={item.id}  onClick={() => navigate(`/showtv/${item.id}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
              ))
        }
      else{
        return <p>{t('No results found')}</p>
      }
    }
    else return ;
  })();
  
  return (
    <div className='mt-3'>
     <div className=' d-flex'>
        {/* Search input */}
        <select id='string' onClick={handelSelected} onChange={handelSelected } className ={`search-category btn  mx-1 ${prop.theme === 'dark' ? 'btn-outline-warning': 'btn-dark'}`}
        >
          <option>{t('All')}</option>
          <option>{t('Celebrities')}</option>
          <option>{t('Movies')}</option>
          <option>{t('Tv Shows')}</option>
        </select>
        <input
        id='input'
          type="search"
          placeholder={t('Search IMDb')}
          className={`search-input form-control ${prop.theme ==='dark' ? 'outline' : 'shadow-black'}`}
          value={query}
          style={{position : 'relative'}}
          onChange={handleSearchChange}
          // onBlur={()=>{if(!searched){handleBlur()}}}
          onFocus={handelFocus}
        />
     </div>

      {/* Show loading indicator while fetching */}
      {(
       <ul id='search-reault' className=' position-absolute z-2  w-25 h-75 overflow-auto'> 
          
          {/* Display f(iltered items or a message if none are found only if searched */}
          {/* { searched && (filteredCelebrities || filteredMovies || filteredTv) ?

          index == 1 
          // && filteredMovies.length > 0 
          ?
            (<>{filteredMovies.map((item) => {
              <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
                className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
              })}</>)
          : 

            index == 0  
            // && filteredCelebrities.length > 0 
             ? 
              (<>{filteredCelebrities.map((item) => (
                <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
                  className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
              ))}</>)
             : 
          
            index == 2 
            // && filteredTv.length > 0 
            &&
            (<>{filteredTv.map((item) => { 
                <p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
                className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
              })}</>)
            : searched && <p>{t("No results foundl")}</p>
          

        } */}
          <>{handleSearch}</>
          {/* {searched && query &&(()=>{ 
    if(index === 0 ){
      return(
         filteredCelebrities.length > 0 && 
          filteredCelebrities.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
            ))
            &&
        filteredMovies.length > 0 && 
          filteredMovies.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
            ))
            &&
        filteredTv.length > 0 &&
          filteredTv.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/showtv/${item.id}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
            ))
         )
      }
  
    if(index === 1 ){ 
      console.log(filteredCelebrities);
      if(filteredCelebrities.length > 0){
        return(
        <>
          {filteredCelebrities.map((item) => (
            <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
            ))
          }
        </>
        )
      }
      else{
        return <p>{t('No results found')}</p>
      }  
    }
    if(index === 2 ){ 
      if(filteredMovies.length > 0){
        console.log(filteredMovies);
          return(
          <>
            {filteredMovies.map((item) => (
                <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
                  className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
            ))
            }
          </>
          )
      } 
      else{
        return <p>{t('No results found')}</p>
      }
    }
    if(index === 3 ){ 
      console.log(filteredTv);
      if(filteredTv.length > 0 ){
          return (
          <>
            {filteredTv.map((item) => ( 
              <p key={item.id}  onClick={() => navigate(`/showtv/${item.id}`)}
              className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
              ))
            }
          </>
          )
        }
      else{
        return <p>{t('No results found')}</p>
      }
    }
  })()} */}
          
        </ul> 
        )}
    </div>
  );
};

export default SearchIMDb;


// import { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from 'react-i18next';
// import '../component/shared/layout/navbar.css'
// import getPopular from '../utils/movie/getPopular';
// import getCelebrities from '../utils/people/celebrity/getCelebrities';
// import getTvPopular from '../utils/tvShows/getTvPopular';
// import getPlayingNow from '../utils/movie/getPlayingNow';
// import getTopRated from '../utils/movie/getTopRated';
// import getTrending from '../utils/movie/getTrending';
// import getTvTrending from '../utils/tvShows/getTvTrending';
// import getTvTopRated from '../utils/tvShows/getTvTopRated';
// import getTvOnTheAir from '../utils/tvShows/getTvOnTheAir';
// import { use } from 'i18next';

// const SearchIMDb = (prop) => {
//   const navigate = useNavigate();
//   const [movies, setMovies] = useState([]);
//   const [tv, setTv] = useState([]);
//   const [celebrities, setCelebrities] = useState([]);
//   const [query, setQuery] = useState('');
//   const [index, setIndex] = useState(-1);
//   // const [loading, setLoading] = useState(true);
//   const [searched, setSearched] = useState(false); // New state to track if search has occurred
//   const {t} = useTranslation();

//   useEffect(() =>{
//     const fetchData = async () => {
//       const celebrities = await getCelebrities();
//       const moviesPopular = await getPopular();
//       const moviesPlayingNow = await getPlayingNow();
//       const moviesTopRated = await getTopRated();
//       const moviesTrending = await getTrending();
//       const tvPopular = await getTvPopular();
//       const tvTrending = await getTvTrending();
//       const tvTvTopRated = await getTvTopRated();
//       const tvTvOnTheAir = await getTvOnTheAir();

//       setMovies(Array.from(new Set([...moviesPopular, ...moviesPlayingNow, ...moviesTopRated, ...moviesTrending])));
//       setTv(Array.from(new Set([...tvPopular, ...tvTrending, ...tvTvTopRated, ...tvTvOnTheAir])));
//       setCelebrities(celebrities);
//       // setPopular(movies.concat(tv).concat(celebrities)); // Combine all the data into one array
//     };

//     fetchData();
//   },[])
//   // console.log(movies);

//   const handelSelected = () => {
//     const string = document.querySelector('#string')
//     // console.log(string.options[string.selectedIndex].innerHTML);
//     console.log(string.selectedIndex);
//     setIndex(string.selectedIndex) ;
//   }

//   // const handleSearch = () => {
//   //   let str =  document.querySelector('#input');
//   //   setQuery(str.value); // Update query based on user input
//   //   setSearched(true); // Set searched to true when user types in the search input
//   //   const index = handelSelected()
//   //   console.log(index);
//   //   // const list = document.getElementById('search-reault');
//   //   // let output = document.createElement('p') ;
//   //   // let output  ;

//   //   // if(index == 0){
//   //   //   if(item.title != undefined){return <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
//   //   //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>}
//   //   //   else{
//   //   //     return item.season_number != undefined ? (<p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
//   //   //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>)
//   //   //   :(<p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
//   //   //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>)
//   //   //   }
//   //   // if(index == 0){
//   //   //   return filteredCelebrities.map((item) => {
//   //   //       <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
//   //   //         className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
//   //   //       })
//   //   // }
//   //   // else if(index == 1 ){ 
//   //   //   return  filteredMovies.map((item) => {
//   //   //       <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
//   //   //         className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
//   //   //       })
//   //   // }
//   //   // else if(index == 2 ){ 
//   //   //   return filteredTv.map((item) => { 
//   //   //         <p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
//   //   //         className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
//   //   //       })
//   //   // }
//   //   // else{
//   //   //   return <p>{t('No results found')}</p>
//   //   //   }
      
//   //     // return output ;
//   // };
 
 
//   // const handleSearchChange = () => {
//   //   const {items , index} = handleSearch();
//   //   console.log(items, index);
    
//   //   if(items.length > 0){
//   //       items.map((item) => {
//   //         // if(index == 0){
//   //         //   if(item.title != undefined){return <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
//   //         //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>}
//   //         //   else{
//   //         //     return item.season_number != undefined ? (<p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
//   //         //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>)
//   //         //   :(<p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
//   //         //   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>)
//   //         //   }
//   //         if(index == 0 ){ 
//   //           return <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
//   //           className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
//   //         }
//   //         else if(index == 1 ){ 
//   //           return <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
//   //           className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
//   //         }
//   //         else if(index == 2 ){ 
//   //           return <p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
//   //           className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
//   //         }
//   //         })
//   //       }
//   //     else{
//   //       return (
//   //         <p>{t('No results found')}</p>
//   //       )}

//   // };
  

//   const handleBlur = () => {
//     const result = document.getElementById('search-reault');
//     result.style.display = 'none';
//     const input = document.querySelector('input');
//     input.style.marginBottom = '1rem';
//     input.style.marginTop = '0rem';
//   };

//   const handelFocus = () => {
//     const result = document.getElementById('search-reault');
//     result.style.display = 'block !important';
//   };

//   const handleSearchChange = (e) => {
//     setQuery(e.target.value); // Update query based on user input
//     setSearched(true); // Set searched to true when user types in the search input
//   };

//   const filteredMovies = movies && movies.filter((movie) =>
//     movie.title.toLowerCase().includes(query.toLowerCase())
//   );

//   const filteredTv = tv && tv.filter((tv) =>
//     tv.name.toLowerCase().includes(query.toLowerCase())
//   );

//   const filteredCelebrities = celebrities && celebrities.filter((celebrity) =>
//     celebrity.name.toLowerCase().includes(query.toLowerCase())
//   );
//   // const filteredPopular = [filteredMovies , filteredTv , filteredCelebrities];
//   // console.log(filteredPopular);
  
 

//   return (
//     <div className='mt-3'>
//      <div className=' d-flex'>
//         {/* Search input */}
//         <select id='string' className ={`search-category btn  mx-1 ${prop.theme === 'dark' ? 'btn-outline-warning': 'btn-dark'}`}
//           onChange={handelSelected}
//         >
//           {/* <option>{t('All')}</option> */}
//           <option>{t('Celebrities')}</option>
//           <option>{t('Movies')}</option>
//           <option>{t('Tv Shows')}</option>
//         </select>
//         <input
//         id='input'
//           type="search"
//           placeholder={t('Search IMDb')}
//           className={`search-input form-control ${prop.theme ==='dark' ? 'outline' : 'shadow-black'}`}
//           value={query}
//           style={{position : 'relative'}}
//           onChange={handleSearchChange}
//           // onBlur={()=>{if(!searched){handleBlur()}}}
//           onFocus={handelFocus}
//         />
//      </div>

//       {/* Show loading indicator while fetching */}
//       { (
//        <ul id='search-reault' className=' position-absolute z-2  w-25 h-75 overflow-auto'> 
//           {/* Display filtered items or a message if none are found only if searched */}
//           { searched ?
//             index == 0  &&  filteredCelebrities.length > 0 ? 
//               filteredCelebrities.map((item) => {
//                 <p key={item.id}  onClick={() => navigate(`/celebrity/${item.name}`)}
//                   className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
//                 })
//              : 

          
//             index == 1 && filteredMovies.length > 0 ?
//               filteredMovies.map((item) => {
//                 <p key={item.id}  onClick={() => navigate(`/showmovie/${item.id}`)}
//                   className='bg-warning rounded-2 text-black p-1 w-100'>{item.title}</p>
//                 })
//             : 

          
//             index == 3 && filteredTv.length > 0 ?
//               filteredTv.map((item) => { 
//                 <p key={item.id}  onClick={() => navigate(`/showtv/${item.name}`)}
//                 className='bg-warning rounded-2 text-black p-1 w-100'>{item.name}</p>
//               })
//              : <p>{t("No results found")}</p>
//           :''

//         }
          
//         </ul> 
//        )} 

//     </div>
//   );
// };

// export default SearchIMDb;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import getPopular from "../utils/movie/getPopular";
// import "../component/shared/layout/navbar.css";

// const SearchIMDb = (prop) => {
//   const navigate = useNavigate();
//   const [movies, setMovies] = useState([]);
//   const [query, setQuery] = useState("");
//   // const [loading, setLoading] = useState(true);
//   const [searched, setSearched] = useState(false); // New state to track if search has occurred
//   const { t } = useTranslation();

//   useEffect(() => {
//     const fetchPopularMovies = async () => {
//       const movies = await getPopular();
//       setMovies(movies);
//       // setLoading(false);
//       console.log(movies);
//     };

//     fetchPopularMovies();
//   }, []);

//   const handelSelected = () => {
//     const string = document.querySelector("#string");
//     console.log(string.options[string.selectedIndex].innerHTML);
//     console.log(string.selectedIndex);
//     return string.selectedIndex;
//   };
  // const handleSearchChange = (e) => {
  //   setQuery(e.target.value); // Update query based on user input
  //   setSearched(true); // Set searched to true when user types in the search input
  // };

//   // const handleSearchChange = (e) => {
//   //   setQuery(e.target.value); // Update query based on user input
//   //   if(query.length > 0){setSearched(true);} // Set searched to true when user types in the search input
//   // };

//   const handleBlur = () => {
//     const result = document.getElementById("search-reault");
//     result.style.display = "none";
//     const input = document.querySelector("input");
//     input.style.marginBottom = "1rem";
//     input.style.marginTop = "0rem";
//   };

//   const handelFocus = () => {
//     const result = document.getElementById("search-reault");
//     result.style.display = "block !important";
//   };

//   const filteredMovies = movies.filter((movie) =>
//     movie.title.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div className="mt-3">
//       <div className=" d-flex">
//         {/* Search input */}
//         <select
//         id= 'string'
//         onChange={handelSelected}
//           className={`search-category btn  mx-1 ${
//             prop.theme === "dark" ? "btn-outline-warning" : "btn-dark"
//           }`}
//           // onChange={handelSelecyed()}
//         >
//           <option
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             {t("All")}
//           </option>
//           <option
//             onClick={() => {
//               navigate("/tv/top_rated");
//             }}
//           >
//             {t("Top Rated")}
//           </option>
//           <option
//             onClick={() => {
//               navigate("/movie/top rated");
//             }}
//           >
//             {t("Celebrities")}
//           </option>
//           <option
//             onClick={() => {
//               navigate("/movie/popular");
//             }}
//           >
//             {t("Most Popular")}
//           </option>
//         </select>
//         <input
//           type="search"
//           placeholder={t("Search IMDb")}
//           className={`search-input form-control ${
//             prop.theme === "dark" ? "outline" : "shadow-black"
//           }`}
//           value={query}
//           style={{ position: "relative" }}
//           onChange={handleSearchChange}
//           // onBlur={()=>{if(!searched){handleBlur()}}}
//           onFocus={handelFocus}

//           // Add onBlur handler
//         />
//       </div>

//       {/* Show loading indicator while fetching */}
//       {
//         <ul
//           id="search-reault"
//           className=" position-absolute z-2  w-25 h-75 overflow-auto"
//         >
//           {/* Display filtered movies or a message if none are found only if searched */}
//           {searched &&
//             (filteredMovies.length > 0 ? (
//               filteredMovies.map((movie) => (
//                 <p
//                   key={movie.id}
//                   onClick={() => {
//                     navigate(`/showmovie/${movie.id}`);
//                     handleBlur();
//                   }}
//                   className="bg-warning rounded-2 text-black p-1 w-100"
//                 >
//                   {movie.title}
//                 </p>
//               ))
//             ) : (
//               <p>{t("No results found")}</p>
//             ))}
//         </ul>
//       }
//     </div>
//   );
// };

// export default SearchIMDb;
