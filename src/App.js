import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './componentes/header';
import Turnos from './componentes/turnos';
import Admin from './componentes/admin';
import VerTurnos from './componentes/verturnos';
import Ingresar from './componentes/ingresar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Turnos />} />
        <Route path='/ingresar' element={<Ingresar />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/verturnosreservadosparahoy' element={<VerTurnos />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
