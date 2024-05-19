import { Header, Heading } from 'components';
import { lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserInfo } from './service';

const Home = lazy(() => import('pages/Home'))
const Rates = lazy(()=> import('pages/Rates'))

export const App = () => {

useEffect(() => {
  navigator.geolocation.getCurrentPosition((pos) => {
    const latitude = pos.coords.latitude
    const longitude = pos.coords.longitude

    getUserInfo({ latitude, longitude })
  })
}, []);

  return (
    <Routes>
      <Route path='/' element={<Header />}>
        <Route index element={<Home />} />      <Route path='/rates' element={<Rates />} />
        <Route path='*' element={<Navigate to='/'/> } />
      </Route>
    </Routes>
  )
};
