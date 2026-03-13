import React, { useEffect, useState } from 'react';
import WeatherInfoModal from '../components/weatherInfoModal';
import { weatherInfoService } from '../api/weatherInfo';
import NavBar from '../components/navBar';
import { Table } from '../components/table';

const Dashboard = () => {

  const [cities, setCities] = useState([]);
  const [detailedWeather, setDetailedWeather] = useState({});
  const [rankData, setRankData] = useState([]);

  const [selectedCity, setSelectedCity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const fetchCitiyWeather = async () => {
      try {
        const res = await fetch('/cities.json');
        const data = await res.json();
        setCities(data.List);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCitiyWeather();
  }, []);

    const handleTileClick = async (city) => {
    setSelectedCity(city);
    setShowModal(true);
    
    try {
      const weatherData = await weatherInfoService.getWeatherInfo(city.CityCode);
      setDetailedWeather(weatherData);
      
      // Also fetch rank data to ensure table has complete information
      const rankDataResponse = await weatherInfoService.getWeatherInfoWithRank();
      setRankData(rankDataResponse);
      console.log('Rank data:', rankDataResponse);
    } catch (error) {
      console.error('Failed to fetch detailed weather:', error);
    }
  };



  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCity(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    window.location.href = '/';
  };

  return (
   <div className="container-fluid p-0">
    <NavBar />
    <div className="container mt-4">
    <h1 className="mb-4"><i class="ri-cloud-fill"></i> Weather Summary</h1>
    <div className="row">
      {cities.map((city) => (
        <div className="col-md-4 col-lg-3 mb-4" key={city.CityCode}>
          
          <div className="card h-100 shadow-sm border-0"  style={{ cursor: 'pointer' }}
              onClick={() => handleTileClick(city)}>
            <div className="card-body text-center">
              <h5 className="card-title text-primary">{city.CityName}</h5>
              <div className="display-4 text-warning mb-2">{city.Temp}°C</div>
              <p className="card-text badge bg-info text-white">{city.Status}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
<div className='text-center mt-4'>
    <Table tableData={rankData}/>
</div>
    </div>
    <div className="mb-4">
  <WeatherInfoModal 
      show={showModal} 
      handleClose={handleCloseModal} 
      city={selectedCity}
      weatherData={detailedWeather}
    />

    </div>
  
   </div>
  );
};

export default Dashboard;