// src/api/authService.js
import axios from 'axios';

export const authService = {
  login: async (email, password) => {
    try {
      const res = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
        grant_type: 'password',
        username: email,
        password: password,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
        scope: 'openid profile email',
      });

      const data = res.data;

      // Save token in localStorage
      localStorage.setItem('access_token', data.access_token);

      return data;
    } catch (error) {
      throw error;
    }
  },

  requestOTP: async (email) => {
    try {
      const res = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/passwordless/start`, {
     
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        connection: 'email',
        email: email,
        send: 'code',
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  verifyOTP: async (email, otp) => {
    try {
      const res = await axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
        grant_type: process.env.REACT_APP_AUTH0_PASSWORDLESS_OTP_GRANT_TYPE,
        otp,
        realm: 'email',
        username: email,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        scope: 'openid profile email',
      });
      const data = res.data;
      
      // Save token in localStorage
      localStorage.setItem('access_token', data.access_token);
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
  },

  getAccessToken: () => localStorage.getItem('access_token'),
};