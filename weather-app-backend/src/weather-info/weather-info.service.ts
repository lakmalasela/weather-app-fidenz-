import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { WeatherResponseDto } from './dto/weather-info-response.dto';
import { WeatherCacheService } from './cache/weather-cache.service';
import { ComfortCalculationService } from './comfort-calculation/comfort-calculation.service';

@Injectable()
export class WeatherInfoService {
    private apiKey: string;
    private baseUrl: string;

    constructor(
        private configService: ConfigService,
        private cacheService: WeatherCacheService,
        private comfortService: ComfortCalculationService,
    ) {
        this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
        this.baseUrl = this.configService.get<string>('OPENWEATHER_BASE_URL') || '';
    }

    async getWeather(cityId: string): Promise<WeatherResponseDto> {
        // Check processed cache firstly
        const cachedProcessed = this.cacheService.getProcessed(cityId) as WeatherResponseDto;
        if (cachedProcessed) return cachedProcessed;

        // Check raw cache
        let rawData = this.cacheService.getRaw(cityId) as any;
        if (!rawData) {
            // Fetch from OpenWeatherMap API
            const response = await axios.get(this.baseUrl, {
                params: {
                    id: cityId,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });
            rawData = response.data;
            this.cacheService.setRaw(cityId, rawData);
        }

        //extract the values
        const temperature = rawData.main.temp;
        const humidity = rawData.main.humidity;
        const windSpeed = rawData.wind.speed;

        const comfortScore = this.comfortService.calculate(temperature, humidity, windSpeed);
        const comfortStatus = this.comfortService.getComfortStatus(comfortScore);
        

        // Process weather data
        const processed: WeatherResponseDto = {
            cityName: rawData.name,
            description: rawData.weather[0].description,
            temperature: temperature,
            humidity: humidity,
            windSpeed: windSpeed,
            comfortScore: comfortScore,
            comfortStatus: comfortStatus,
            
        };

        // Cache processed
        this.cacheService.setProcessed(cityId, processed);

        return processed;
    }


    //rank the cities based on comfort score
   async getCitiesWeatherWithRank(cityIds?: string[]): Promise<WeatherResponseDto[]> {
        // get all cached cities
        if (!cityIds) {
            const allCities = this.cacheService.getAllProcessedCities();
            
            if (allCities.length === 0) {
                return [];
            }

            // Recalculate comfort scores for all cities
            const citiesWithScores = allCities.map(city => {
                const comfortScore = this.comfortService.calculate(
                    city.temperature, 
                    city.humidity, 
                    city.windSpeed
                );
                const comfortStatus = this.comfortService.getComfortStatus(comfortScore);
                
                return {
                    ...city,
                    comfortScore: comfortScore,
                    comfortStatus: comfortStatus
                };
            });

            // Rank cities based on comfort scores
            const rankedCities = this.comfortService.getRankCities(citiesWithScores);

            // Update cache with new scores and ranks
            rankedCities.forEach(city => {
                this.cacheService.updateCityWithScoreAndRank(
                    city.cityId, 
                    city.comfortScore, 
                    city.rank
                );
            });

            // Sort by comfort score (descending) and return
            return rankedCities.sort((a, b) => b.comfortScore - a.comfortScore).map(city => ({
                cityName: city.cityName,
                description: city.description,
                temperature: city.temperature,
                humidity: city.humidity,
                windSpeed: city.windSpeed,
                comfortScore: city.comfortScore,
                comfortStatus: city.comfortStatus,
                rank: city.rank
            })) as WeatherResponseDto[];
        }

        const cities: WeatherResponseDto[] = [];

        for (const cityId of cityIds) {
            const weather = await this.getWeather(cityId); // calculates comfortScore
            cities.push(weather);
        }

        // Filter out any cities without comfortScore (Ensures each city has a comfort score)
        const citiesWithScores = cities.filter(city => city.comfortScore !== undefined);
        
        // Sort and assign rank
        const rankedCities = this.comfortService.getRankCities(citiesWithScores as any);
        
        // Map back to WeatherResponseDto with ranks
        return rankedCities.map((city: any) => ({ ...city, rank: city.rank })) as WeatherResponseDto[];
    }


    // Get cache status
    getCacheStatus(cityId: string) {
        return this.cacheService.getCacheStatus(cityId);
    }
}