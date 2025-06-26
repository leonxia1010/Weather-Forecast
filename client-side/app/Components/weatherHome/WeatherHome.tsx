import { fromUnixTime, format } from 'date-fns';
import {
  WiDaySunny,
  WiCloud,
  WiStrongWind,
  WiThermometer,
  WiDust,
  WiRaindrop,
} from 'react-icons/wi';
import { useState, useEffect } from 'react';
import {
  getCurrentCityForecastData,
  type ForecastEntry,
  type OpenWeatherForecastResponse,
} from '../../api/openWeatherApi.js';
import { Bounce, toast } from 'react-toastify';
import ForecastCard from '../ForecastCard/ForecastCard.js';
import OtherCityCard from '../OtherCityCard/OtherCityCard.js';
import CurrentWeatherCard from '../CurrentWeatherCard/CurrentWeatherCard.js';
import { sampleCurrentData } from '../../api/sampleData.js';
import type {
  ForecastDisplayItem,
  MappedWeatherData,
} from 'app/@type/weatherDataTypes.js';
import InputSection from '../InputSection/InputSection.js';
import { WeatherTypeMap, WeatherType } from 'app/@enum/weatherTypes.js';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation.js';

export const getWeatherIcon = (size = 24, color = '#fff') => {
  return {
    [WeatherType.SUNNY]: (
      <WiDaySunny size={size} color={color} style={{ margin: 'auto' }} />
    ),
    [WeatherType.CLOUDY]: (
      <WiCloud size={size} color={color} style={{ margin: 'auto' }} />
    ),
  };
};

export function WeatherHome() {
  const [data, setData] = useState<MappedWeatherData | undefined>(undefined);
  const [searchCity, setSearchCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = async (city: string = 'Sydney') => {
    setIsLoading(true);
    const weatherData = await getCurrentCityForecastData(city).catch((err) => {
      toast.error('City not found', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      return;
    });
    if (!weatherData?.data) {
      return;
    }
    const resultData = mapData(weatherData.data);
    setData(resultData);
    setIsLoading(false);
  };

  const mapData = (data: OpenWeatherForecastResponse): MappedWeatherData => {
    // return 5 days data from now on
    const filteredData = data.list
      .filter((item) => {
        return item.dt_txt.includes('12:00:00');
      })
      .map((item: ForecastEntry): ForecastDisplayItem => {
        const date = fromUnixTime(Number(item.dt));

        return {
          day: format(date, 'EEEE'),
          date: format(date, 'dd LLLL'),
          dateLong: format(date, 'hh:mm a'),
          weather: WeatherTypeMap[item.weather[0].icon],
          minTemp: parseInt(item.main.temp_min),
          maxTemp: parseInt(item.main.temp_max),
          humidity: item.main.humidity,
          pressure: item.main.pressure,
          temp: parseInt(item.main.temp),
          grnd_level: item.main.grnd_level,
          water: item.main.sea_level,
          wind: item.wind.speed,
        };
      });

    return {
      currentCity: {
        city: data.city.name,
      },
      forecast: filteredData,
    };
  };

  const onSearchCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('fire');
    getWeatherData(searchCity);
  };

  return (
    <main
      className='flex items-center justify-center pt-16 pb-4 text-black'
      style={{
        minHeight: '100vh',
        backgroundColor: '#624adc',
      }}
    >
      <div
        className={`w-full max-w-[800px] h-[500px] sm:h-[600px] flex gap-5 p-6 rounded-xl ${
          isLoading ? 'items-center justify-center' : ''
        }`}
        style={{ backgroundColor: '#f2f2fc' }}
      >
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {data && <CurrentWeatherCard data={data} />}
            <div className='flex flex-col justify-between'>
              <div className='flex justify-between'>
                {data?.forecast?.slice(1, 5)?.map((item) => {
                  return <ForecastCard key={item.date} data={item} />;
                })}
              </div>
              <div className='mt-30'>
                <InputSection
                  inputValue={searchCity}
                  onChangeCity={(city: string) => setSearchCity(city)}
                  onSearchCity={onSearchCity}
                />
                <div className='flex gap-5 text-white justify-between'>
                  {/* {sampleData.otherCities.map((item) => {
                return <OtherCityCard key={item.city} data={item} />;
              })} */}
                  <OtherCityCard
                    key={sampleCurrentData.currentCity.city}
                    data={sampleCurrentData}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
