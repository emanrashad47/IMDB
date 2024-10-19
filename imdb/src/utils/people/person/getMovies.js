import axios from 'axios';

const getMovies = async (celebrity_id) => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/person/${celebrity_id}/movie_credits?language=en-US`,
    // url: `https://api.themoviedb.org/3/person/${celebrity_id}/translations`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTc1OGI0YmZhNTE0MmVlZGMzZDZhOGQxNjFiMjFlOSIsIm5iZiI6MTcyNzA3ODgzMS4zNDA5ODYsInN1YiI6IjY2ZjA1MjYyOTJkMzk2ODUzODNiODE5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGhh--2oIN6DH5WBwR6QwZw1xUNKGUU9bJ0EbCIhONk'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    console.log(response.data.cast);
    return response.data.cast; // تعديل هنا لاستخدام axios مباشرة
  } catch (error) {
    console.error('Failed to fetch Movies:', error);
    return []; // يمكنك إرجاع مصفوفة فارغة أو التعامل مع الخطأ كما تشاء
  }
};

export default getMovies; // تصدير الدالة مباشرة



