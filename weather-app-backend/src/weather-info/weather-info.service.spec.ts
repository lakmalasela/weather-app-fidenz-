import { Test, TestingModule } from '@nestjs/testing';
import { WeatherInfoService } from './weather-info.service';

describe('WeatherInfoService', () => {
  let service: WeatherInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherInfoService],
    }).compile();

    service = module.get<WeatherInfoService>(WeatherInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
