import type { Route } from './+types/home';
import { WeatherHome } from '../Components/WeatherHome/WeatherHome';
import { ToastContainer } from 'react-toastify';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <>
      <WeatherHome />
      <ToastContainer />
    </>
  );
  {
    /* {typeof window !== 'undefined' && <ToastContainer />} */
  }
}
