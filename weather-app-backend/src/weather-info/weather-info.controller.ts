import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherInfoService } from './weather-info.service';
import { WeatherResponseDto } from './dto/weather-info-response.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('weather-info')
export class WeatherInfoController {
    constructor(private weatherInfoService: WeatherInfoService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getWeather(@Query('cityId') cityId: string): Promise<WeatherResponseDto> {
        return this.weatherInfoService.getWeather(cityId);
    }

    // check the cache status 
    @Get('cache-status')
    @UseGuards(AuthGuard)
    getCacheStatus(@Query('cityId') cityId: string) {
        return this.weatherInfoService.getCacheStatus(cityId);
    }

      // All cities with rank
    @Get('rank')
    @UseGuards(AuthGuard)
    async getCitiesRank() {

        return this.weatherInfoService.getCitiesWeatherWithRank();
    }
}
