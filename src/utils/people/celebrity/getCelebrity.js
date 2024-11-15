import axios from 'axios';
// import { useNavigate } from 'react-router-dom';



const getCelebrity = async (celebrity_name) => {
  // const navigate = useNavigate();
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/person?query=${celebrity_name}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTc1OGI0YmZhNTE0MmVlZGMzZDZhOGQxNjFiMjFlOSIsIm5iZiI6MTcyNzA3ODgzMS4zNDA5ODYsInN1YiI6IjY2ZjA1MjYyOTJkMzk2ODUzODNiODE5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGhh--2oIN6DH5WBwR6QwZw1xUNKGUU9bJ0EbCIhONk'
    }
  };

  try {
    const response = await axios.request(options);
    
    return response.data.results[0]; // تعديل هنا لاستخدام axios مباشرة
  } catch (error) {
    console.error(`Failed to find celebrity with name : ${celebrity_name} :`, error);
    // return navigate('/error'); // يمكنك إرجاع مصفوفة فارغة أو التعامل مع الخطأ كما تشاء
  }
};

export default getCelebrity; // تصدير الدالة مباشرة

