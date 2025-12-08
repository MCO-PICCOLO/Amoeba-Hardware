import axios from 'axios';

const networkApi = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_IP,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getSystemInfo = async () => {
  try {
    // console.log(
    //   'Calling getSystemInfo API...',
    //   import.meta.env.VITE_API_SERVER_IP,
    // );
    const response = await networkApi.get('/api/items/');
    // console.log('getSystemInfo response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching system info:', error);
    throw error;
  } finally {
    console.log('getSystem API call completed');
  }
};
