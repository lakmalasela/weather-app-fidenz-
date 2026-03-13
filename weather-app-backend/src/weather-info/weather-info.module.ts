import { Module } from '@nestjs/common';
import { WeatherInfoController } from './weather-info.controller';
import { WeatherInfoService } from './weather-info.service';
import { WeatherCacheService } from './cache/weather-cache.service';
import { ConfigModule } from '@nestjs/config';
import { ComfortCalculationService } from './comfort-calculation/comfort-calculation.service';

@Module({
  imports: [ConfigModule],
  controllers: [WeatherInfoController],
  providers: [WeatherInfoService, WeatherCacheService, ComfortCalculationService]
})
export class WeatherInfoModule {}
