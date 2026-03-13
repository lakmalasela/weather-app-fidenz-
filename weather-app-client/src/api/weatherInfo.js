// src/api/apiService.js
import axios from 'axios';
import { authService } from './authService';

export const weatherInfoService = {
  getWeatherInfo: async (cityId) => {
    const token = authService.getAccessToken();
    const weatherUrl = process.env.REACT_APP_WEATHER_INFO_URL || 'http://localhost:3000/weather-info';
    const res = await axios.get(`${weatherUrl}?cityId=${cityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
  getWeatherInfoWithRank: async () => {
    const token = authService.getAccessToken();
    const weatherUrl = process.env.REACT_APP_WEATHER_INFO_URL || 'http://localhost:3000/weather-info';
    const res = await axios.get(`${weatherUrl}/rank`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  },
};

