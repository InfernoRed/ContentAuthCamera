import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

const baseURL = 'https://irt-image-upload.azurewebsites.net/v1/image/upload';
const apikey = process.env.EXPO_PUBLIC_C2PA_API_KEY;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'x-functions-key': apikey,
  },
});

const useC2PAPost = () => {
  const [response, setResponse] = useState<AxiosResponse<any, any> | null>(null);
  const [apiError, setApiError] = useState<Error | AxiosError>();
  const [loading, setLoading] = useState(false);

  const postData = async (base64Image: string) => {
    setLoading(true);

    if (!base64Image) {
      console.log('Invalid Image');
      return;
    }
    const data = {
      file: base64Image,
      filename: 'imageToSign.jpg',
      mimetype: 'image/jpeg',
      latitude: '1.234', // Hardcoded
      longitude: '1.234', // Hardcoded
      device: 'Pixel 8', // Hardcoded
    };

    try {
      const response = await axiosInstance.post('', data);
      setResponse(response);
      console.log('Image uploaded successfully:', response.data);
    } catch (err) {
      const error = err as Error | AxiosError;
      console.log(error.message);
      setApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, apiError, loading, postData };
};

export default useC2PAPost;
