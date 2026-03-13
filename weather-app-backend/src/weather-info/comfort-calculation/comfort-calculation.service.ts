import { Injectable } from "@nestjs/common";

@Injectable()
export class ComfortCalculationService {
    

    calculate(temp: number, humidity: number, windSpeed: number): number {

    const tempScore = this.getTemperatureScore(temp);
    const humidityScore = this.getHumidityScore(humidity);
    const windScore = this.getWindScore(windSpeed);

    // weighted score
    const comfortScore =
      0.5 * tempScore +
      0.3 * humidityScore +
      0.2 * windScore;

    return Math.round(comfortScore);
  }

  getTemperatureScore(temp: number): number {

    if (temp >= 20 && temp <= 25) return 100;
    if (temp >= 15 && temp <= 30) return 70;
    if (temp >= 10 && temp <= 35) return 40;
    return 10;
  }

  getHumidityScore(humidity: number): number {

    if (humidity >= 40 && humidity <= 60) return 100;
    if (humidity >= 30 && humidity <= 70) return 70;
    if (humidity >= 20 && humidity <= 80) return 40;
    return 10;
  }

  getWindScore(windSpeed: number): number {

    if (windSpeed <= 3) return 100;
    if (windSpeed <= 7) return 70;
    if (windSpeed <= 12) return 40;
    return 10;
  }

  getComfortStatus(score: number): string {

    if (score >= 85) return "Very Comfortable";
    if (score >= 65) return "Comfortable";
    if (score >= 45) return "Moderate";
    if (score >= 25) return "Uncomfortable";
    return "Very Uncomfortable";
  }

  getRankCities(cities: { cityName: string; comfortScore: number; [key: string]: any }[]) {

    cities.sort((a, b) => b.comfortScore - a.comfortScore);

    cities.forEach((city, index) => {
      city.rank = index + 1;
    });

    return cities;
  }
}