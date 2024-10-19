import axios from "axios";

const getTvTrans = async (movie_id) => {
  const options = {
    method: "GET",
    url:`https://api.themoviedb.org/3/tv/${movie_id}?language=ar-SA`,
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTc1OGI0YmZhNTE0MmVlZGMzZDZhOGQxNjFiMjFlOSIsIm5iZiI6MTcyNzA3ODgzMS4zNDA5ODYsInN1YiI6IjY2ZjA1MjYyOTJkMzk2ODUzODNiODE5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGhh--2oIN6DH5WBwR6QwZw1xUNKGUU9bJ0EbCIhONk",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    
    return response.data; // تعديل هنا لاستخدام axios مباشرة
  } catch (error) {
    console.error("Failed to fetch Arabic Tv :", error);
    // return navigate('/error'); // يمكنك إرجاع مصفوفة فارغة أو التعامل مع الخطأ كما تشاء
  }
};

export default getTvTrans; // تصدير الدالة مباشرة
