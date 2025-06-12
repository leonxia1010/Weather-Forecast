import axios from 'axios';

export interface OpenWeatherForecastResponse {
  cod: string;
  message: string;
  cnt: string;
  list: ForecastEntry[];
  city: CityInfo;
}

export interface ForecastEntry {
  dt: string;
  main: {
    temp: string;
    feels_like: string;
    temp_min: string;
    temp_max: string;
    pressure: string;
    sea_level: string;
    grnd_level: string;
    humidity: string;
    temp_kf: string;
  };
  weather: {
    id: string;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: string;
  };
  wind: {
    speed: string;
    deg: string;
    gust: string;
  };
  visibility: string;
  pop: string;
  rain?: {
    '3h': string;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export interface CityInfo {
  id: string;
  name: string;
  coord: {
    lat: string;
    lon: string;
  };
  country: string;
  population: string;
  timezone: string;
  sunrise: string;
  sunset: string;
}

export const getCurrentCityForecastData = async (
  cityName: string = 'Sydney'
) => {
  const key = 'c22174e3561f0725e8bbc26e6ce3ad75';
  const cityData = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${key}`
  );
  if (!cityData.data) {
    return;
  }

  return axios.get<OpenWeatherForecastResponse>(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData.data[0].lat}&lon=${cityData.data[0].lon}&appid=${key}&units=metric`
  );
};

// https://api.openweathermap.org/data/3.0/onecall?lat=35&lon=139&exclude=hourly,daily，minutely&appid=c22174e3561f0725e8bbc26e6ce3ad75
// https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c22174e3561f0725e8bbc26e6ce3ad75&metric=standard
