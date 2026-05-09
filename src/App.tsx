import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

import { Button } from 'primereact/button';

import Homepage from './components/Homepage'
import Films from './components/Films';
import FilmDetails from './components/FilmDetails';
import Characters from './components/Characters';
import Favourites from './components/Favourites';

import 'primeicons/primeicons.css';
import "primereact/resources/themes/lara-dark-indigo/theme.css";


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <PrimeReactProvider>
      <p className="flex justify-center text-2xl text-yellow-200">Star Wars Explorer</p>
      {location.pathname !== '/' && (
        <Button
          icon="pi pi-arrow-left"
          rounded
          text
          aria-label="Back"
          onClick={() => navigate(-1)}
          style={{ color: 'white' }}
          pt={{ root: { style: { color: 'white' } } }}
          label="Back"
        />
      )}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/films" element={<Films />} />
        <Route path="/films/:id" element={<FilmDetails />} />
        <Route path="/characters" element={<Characters />} />
         <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </PrimeReactProvider>
  )
}

export default App