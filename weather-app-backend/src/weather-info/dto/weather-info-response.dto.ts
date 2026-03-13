export class WeatherResponseDto {
    cityName: string;
    description: string;
    temperature: number; // Celsius
    humidity: number; // Percentage
    windSpeed: number; // m/s
    comfortScore?: number;  // calculated score
    comfortStatus?: string; // comfort status based on score
    rank?: number;  // rank based on comfort score
}