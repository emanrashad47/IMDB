import axios from "axios";
// import { useNavigate } from "react-router-dom";

const getMovie = async (movie_id) => {
  // const navigate = useNavigate(); 
  const options = {
    method: "GET",
    url:`https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTc1OGI0YmZhNTE0MmVlZGMzZDZhOGQxNjFiMjFlOSIsIm5iZiI6MTcyNzA3ODgzMS4zNDA5ODYsInN1YiI6IjY2ZjA1MjYyOTJkMzk2ODUzODNiODE5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGhh--2oIN6DH5WBwR6QwZw1xUNKGUU9bJ0EbCIhONk",
    },
  };

  try {
    const response = await axios.request(options);
    
    return response.data; // تعديل هنا لاستخدام axios مباشرة
  } catch (error) {
    console.error("Failed to fetch Movie:", error);
    // return navigate('/error'); // يمكنك إرجاع مصفوفة فارغة أو التعامل مع الخطأ كما تشاء
  }
};

export default getMovie; // تصدير الدالة مباشرة
