import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    watchedTvs: JSON.parse(localStorage.getItem('watchListTv'))|| [],
};

export const watchedTvsSlice = createSlice({
    name: 'watchedTvs',
    initialState,
    reducers: {
        addwatchedTvs: (state , action) => {
            if(!state.watchedTvs.includes(action.payload)){
                state.watchedTvs.push(action.payload);
                localStorage.setItem("watchListTv", JSON.stringify(state.watchedTvs ))
                }else{
                 console.log('Tv show already added')
                }
            
        },
        removeTv: (state, action) => {
            if( state.watchedTvs.length > 0 ){
            state.watchedTvs.splice( state.watchedTvs.indexOf(`${action.payload}`),1);
            localStorage.setItem("watchListTv", JSON.stringify(state.watchedTvs ))
            }else{
             console.log('No TV shows to remove');
         
         }
        },
    },
});
export const { addwatchedTvs , removeTv } = watchedTvsSlice.actions;

export default watchedTvsSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     watchedTvs:[],
// }
// export const watchedTvsSlice = createSlice({
//     name: 'watchedTvs',
//     initialState,
//     reducers: {
//         addwatchedTvs: (state , action) => {
//             if(!state.watchedTvs.includes(action.payload)){
//                 state.watchedTvs .push(action.payload);
//                 console.log(state.watchedTvs);
//                 }else{
//                  console.log('Tv show already added')
//                 }
            
//         },
//         removeTv: (state, action) => {
//             if( state.watchedTvs.length > 0 ){
//                 // console.log(state.watchedTvs);
//                 // console.log(state.watchedTvs.indexOf(action.payload));
//             state.watchedTvs.splice( state.watchedTvs.indexOf(`${action.payload}`),1);
//             console.log(state.watchedTvs);
//             }else{
//              console.log('No TV shows to remove');
         
//          }
//         },
//     },
// });
// export const { addwatchedTvs , removeTv } = watchedTvsSlice.actions;

// export default watchedTvsSlice.reducer;


