export interface MappedWeatherData {
  currentCity: {
    city: string;
  };
  forecast: ForecastDisplayItem[];
}

export interface ForecastDisplayItem {
  day: string; // e.g. "Mon"
  date: string; // e.g. "23 July"
  dateLong: string; // e.g. "23 July, Sunday 12:00"
  weather: 'sunny' | 'cloudy'; // or a custom type if WeatherTypeMap has known keys
  minTemp: number;
  maxTemp: number;
  humidity: string;
  pressure: string;
  temp: number;
  grnd_level: string;
  water: string;
  wind: string;
}
