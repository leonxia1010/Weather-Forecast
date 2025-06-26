import React from 'react';
import { getWeatherIcon } from '../WeatherHome/WeatherHome';
import type {
  ForecastDisplayItem,
  MappedWeatherData,
} from 'app/@type/weatherDataTypes';

interface IForecastCard {
  data: MappedWeatherData;
}

const OtherCityCard = (props: IForecastCard) => {
  const { currentCity, forecast } = props.data;
  const { minTemp, maxTemp, weather } = forecast[0];
  return (
    <div
      style={{ backgroundColor: '#4382f7' }}
      className='rounded-xl p-3 text-center'
    >
      <p>{getWeatherIcon(40)[weather]}</p>
      <p className='font-bold mt-2'>{currentCity.city}</p>
      <p className='text-xs'>{minTemp + '~' + maxTemp}</p>
    </div>
  );
};

export default OtherCityCard;
