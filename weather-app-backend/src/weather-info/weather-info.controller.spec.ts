import { Test, TestingModule } from '@nestjs/testing';
import { WeatherInfoController } from './weather-info.controller';

describe('WeatherInfoController', () => {
  let controller: WeatherInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherInfoController],
    }).compile();

    controller = module.get<WeatherInfoController>(WeatherInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
