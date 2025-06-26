import type { MappedWeatherData } from 'app/@type/weatherDataTypes.js';

enum WeatherType {
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
}

const WeatherTypeMap = {
  '10n': WeatherType.SUNNY,
  '10d': WeatherType.SUNNY,
  '04d': WeatherType.CLOUDY,
  '04n': WeatherType.CLOUDY,
  '01n': WeatherType.CLOUDY,
};

export const sampleData = {
  currentCity: {
    date: '23 July, Sunday 12:00',
    city: 'Sydney',
    minTemp: '28',
    maxTemp: '32',
    weather: WeatherType.SUNNY,
    water: '85%',
    wind: '9km/h',
    uv: '7tug',
    something: '26',
  },
  forecast: [
    {
      day: 'Monday',
      date: '24 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
    {
      day: 'Tuesday',
      date: '25 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
    {
      day: 'Wednesday',
      date: '26 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
    {
      day: 'Thursday',
      date: '27 July',
      weather: WeatherType.CLOUDY,
      minTemp: '20',
      maxTemp: '25',
    },
  ],
  otherCities: [
    {
      city: 'Melbourne',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
    {
      city: 'Shanghai',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
    {
      city: 'New York',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
    {
      city: 'London',
      weather: WeatherType.SUNNY,
      minTemp: '25',
      maxTemp: '32',
    },
  ],
};

export const sampleCurrentData: MappedWeatherData = {
  currentCity: {
    city: 'sydney',
  },
  forecast: [
    {
      day: 'Monday',
      date: '12,2024',
      dateLong: 'dsadsa',
      weather: WeatherTypeMap['10n'],
      minTemp: 20,
      maxTemp: 30,
      humidity: '12',
      pressure: '12',
      temp: 32,
      grnd_level: 'item.main.grnd_level',
      water: '12',
      wind: '12',
    },
  ],
};
