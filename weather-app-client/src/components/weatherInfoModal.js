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
          <div className="modal-header bg-color text-white">
            <h5 className="modal-title"><i className="ri-cloud-fill"></i> {weatherData.cityName || city.CityName} Weather Details</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
              <div className="table-responsive">
              <table className={`table table-bordered ${isDarkMode ? 'table-dark' : 'table-light'}`}>
                <tbody>
                  <tr>
                    <th><i className="ri-temp-hot-line"></i> Temperature</th>
                    <td>{weatherData.temperature}°C</td>
                  </tr>
                  <tr>
                    <th><i className="ri-cloud-line"></i> Description</th>
                    <td>{weatherData.description}</td>
                  </tr>
                  <tr>
                    <th><i className="ri-drop-line"></i> Humidity</th>
                    <td>{weatherData.humidity}%</td>
                  </tr>
                  <tr>
                    <th><i className="ri-windy-line"></i> Wind Speed</th>
                    <td>{weatherData.windSpeed} m/s</td>
                  </tr>
                  <tr>
                    <th><i className="ri-dashboard-2-line"></i> Comfort Score</th>
                    <td>{Number(weatherData.comfortScore).toFixed(2)}</td>
                  </tr>
                  <tr>
                    <th><i className="ri-emotion-happy-line"></i> Comfort Status</th>
                    <td>{weatherData.comfortStatus || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
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