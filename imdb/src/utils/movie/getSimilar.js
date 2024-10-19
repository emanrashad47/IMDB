import axios from 'axios';

const getSimilar = async (movie_id) => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie_id}/similar?language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTc1OGI0YmZhNTE0MmVlZGMzZDZhOGQxNjFiMjFlOSIsIm5iZiI6MTcyNzA3ODgzMS4zNDA5ODYsInN1YiI6IjY2ZjA1MjYyOTJkMzk2ODUzODNiODE5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGhh--2oIN6DH5WBwR6QwZw1xUNKGUU9bJ0EbCIhONk'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.results);
    
    return response.data.results; // تعديل هنا لاستخدام axios مباشرة
  } catch (error) {
    console.error('Failed to fetch Similar Movies:', error);
    return []; // يمكنك إرجاع مصفوفة فارغة أو التعامل مع الخطأ كما تشاء
  }
};

export default getSimilar; // تصدير الدالة مباشرة
