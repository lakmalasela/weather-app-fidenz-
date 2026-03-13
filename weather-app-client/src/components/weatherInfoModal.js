// src/components/weatherInfoModal.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const WeatherInfoModal = ({ show, handleClose, city, weatherData }) => {
  const { isDarkMode } = useTheme();
  
  if (!city) return null;

  if (!show) return null;

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block', backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"><i className="ri-cloud-fill"></i> {weatherData.cityName || city.CityName} Weather Details</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong><i className="ri-temp-hot-line"></i> Temperature:</strong> {weatherData.temperature}°C</p>
                <p><strong><i className="ri-cloud-line"></i> Description:</strong> {weatherData.description}</p>
                <p><strong><i className="ri-drop-line"></i> Humidity:</strong> {weatherData.humidity}%</p>
              </div>
              <div className="col-md-6">
                <p><strong><i className="ri-windy-line"></i> Wind Speed:</strong> {weatherData.windSpeed} m/s</p>
                <p><strong><i className="ri-dashboard-2-line"></i> Comfort Score:</strong> {Number(weatherData.comfortScore).toFixed(2)}</p>
                <p><strong><i className="ri-emotion-happy-line"></i> Comfort Status:</strong> {weatherData.comfortStatus || "N/A"}</p>
                {/* <p><strong><i className="ri-sort-asc"></i> Rank:</strong> #{weatherData.rank}</p> */}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoModal;