import {
  WiDaySunny,
  WiCloud,
  WiStrongWind,
  WiThermometer,
  WiDust,
  WiRaindrop,
} from 'react-icons/wi';

enum WeatherType {
  SUNNY = 'sunny',
  CLOUDY = 'cloudy',
}

const getWeatherIcon = (size = 24, color = '#fff') => {
  return {
    [WeatherType.SUNNY]: (
      <WiDaySunny size={size} color={color} style={{ margin: 'auto' }} />
    ),
    [WeatherType.CLOUDY]: (
      <WiCloud size={size} color={color} style={{ margin: 'auto' }} />
    ),
  };
};

const sampleData = {
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

export function WeatherHome() {
  return (
    <main
      className='flex items-center justify-center pt-16 pb-4 text-black'
      style={{
        minHeight: '100vh',
        backgroundColor: 'purple',
      }}
    >
      <div
        className='flex gap-5 p-6 rounded-xl'
        style={{ backgroundColor: '#f2f2fc' }}
      >
        <div
          style={{ backgroundColor: '#4382f7' }}
          className='rounded-xl text-white p-4'
        >
          <p className='text-xs'>{sampleData.currentCity.date}</p>
          <p className='text-center text-2xl py-5'>
            {sampleData.currentCity.city}
          </p>
          <p className='text-center text-6xl'>
            {sampleData.currentCity.maxTemp}
          </p>
          <p className='text-center text-xs'>
            {sampleData.currentCity.minTemp +
              '~' +
              sampleData.currentCity.maxTemp}
          </p>
          <p className='text-center pt-5 pb-7'>
            {getWeatherIcon(175)[sampleData.currentCity.weather]}
          </p>
          <div className='flex justify-center bg-white text-black gap-2 p-3 rounded-lg'>
            <div>
              <WiRaindrop size={50} color={'#000'} />
              <p>{sampleData.currentCity.water}</p>
            </div>
            <div>
              <WiStrongWind size={50} color={'#000'} />
              <p>{sampleData.currentCity.wind}</p>
            </div>
            <div>
              <WiDust size={50} color={'#000'} />
              <p>{sampleData.currentCity.uv}</p>
            </div>
            <div>
              <WiThermometer size={50} color={'#000'} />
              <p>{sampleData.currentCity.something}</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-between'>
          <div className='flex justify-between'>
            {sampleData.forecast.map((item) => {
              return (
                <div key={item.date} className='text-center'>
                  <p className='font-bold'>{item.day}</p>
                  <p className='text-xs'>{item.date}</p>
                  <p className='mt-4'>
                    {getWeatherIcon(100, '#000')[item.weather]}
                  </p>
                  <p className='text-xs'>{item.minTemp + '~' + item.maxTemp}</p>
                </div>
              );
            })}
          </div>
          <div className='mt-30'>
            <div className='mb-5 relative' style={{ width: '70%' }}>
              <input
                type='text'
                placeholder='Search for a city'
                className='input-default'
              ></input>
              <button type='button' className='button-default'>
                Search
              </button>
            </div>
            <div className='flex gap-5 text-white justify-between'>
              {sampleData.otherCities.map((item) => {
                return (
                  <div
                    key={item.city}
                    style={{ backgroundColor: '#4382f7' }}
                    className='rounded-xl p-3 text-center'
                  >
                    <p>{getWeatherIcon(40)[item.weather]}</p>
                    <p className='font-bold mt-2'>{item.city}</p>
                    <p className='text-xs'>
                      {item.minTemp + '~' + item.maxTemp}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
