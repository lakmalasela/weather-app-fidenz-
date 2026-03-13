import { useEffect, useState, useMemo } from "react";

import { weatherInfoService } from "../api/weatherInfo";
import { useTheme } from "../contexts/ThemeContext";
import "../components/css/table.css";
import { FilterInput } from "./filterInput";
import { SortableHeader } from "./SortableHeader";

export const Table = ({tableData}) => {
const [weatherList,setWeatherList] = useState([]);
const [selectedCities, setSelectedCities] = useState([]);
const { isDarkMode } = useTheme();
 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [filterText, setFilterText] = useState("");
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await weatherInfoService.getWeatherInfoWithRank();
        
        // Handle different response structures
        const data = response.data || response;
        setWeatherList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setWeatherList([]); // Set empty array on error
      }
    };

    fetchWeather();
  }, []);

  // Use rankData from props if available, otherwise use fetched weatherList
  useEffect(() => {
    if (tableData && Array.isArray(tableData) && tableData.length > 0) {
      setWeatherList(tableData);
    }
  }, [tableData]);

    // Filter + Sort
  const sortedData = useMemo(() => {
    let data = [...weatherList];

    // Filter
    if (filterText) {
      data = data.filter((item) =>
        item.cityName.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Sort
    if (sortConfig.key) {
      data.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (typeof aVal === "string") {
          return sortConfig.direction === "ascending"
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sortConfig.direction === "ascending" ? aVal - bVal : bVal - aVal;
        }
      });
    }

    return data;
  }, [weatherList, sortConfig, filterText]);

  // Filter out empty or invalid entries from sorted data
  const validData = sortedData.filter(weather => 
    weather && 
    weather.cityName
  );

  //pagination
    // pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = validData.slice(indexOfFirstRow, indexOfLastRow);

    const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };
  const totalPages = Math.ceil(validData.length / rowsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

    return (
        <div className="table-responsive">
          <FilterInput filterText={filterText} onFilterChange={setFilterText} />
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        {[
                            { key: "cityName", label: "City Name" },
                            { key: "description", label: "Description" },
                            { key: "temperature", label: "Temperature (°C)" },
                            { key: "humidity", label: "Humidity (%)" },
                            { key: "windSpeed", label: "Wind Speed (m/s)" },
                            { key: "comfortScore", label: "Comfort Score" },
                            { key: "comfortStatus", label: "Comfort Status" },
                            { key: "rank", label: "Rank" },
                        ].map((col) => (
                            <SortableHeader
                                key={col.key}
                                columnKey={col.key}
                                label={col.label}
                                sortConfig={sortConfig}
                                onSort={handleSort}
                            />
                        ))}
                    </tr>
                </thead>
                <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((weather) => (
              <tr key={weather.cityName}>
                <td data-label="City Name">{weather.cityName}</td>
                <td data-label="Description">{weather.description}</td>
                <td data-label="Temperature">{weather.temperature}</td>
                <td data-label="Humidity">{weather.humidity}</td>
                <td data-label="Wind Speed">{weather.windSpeed}</td>
                <td data-label="Comfort Score">
                  {weather.comfortScore !== undefined &&
                  weather.comfortScore !== null
                    ? Number(weather.comfortScore).toFixed(2)
                    : "N/A"}
                </td>
                <td data-label="Comfort Status">
                  {weather.comfortStatus || "N/A"}
                </td>
                <td data-label="Rank">
                  {weather.rank !== undefined && weather.rank !== null
                    ? weather.rank
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No weather data available
              </td>
            </tr>
          )}
        </tbody>
            </table>
             {/* Pagination */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button
          className="btn btn-primary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-primary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
        </div>
    );
};