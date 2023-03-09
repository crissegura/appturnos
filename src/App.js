import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './componentes/header';
import Turnos from './componentes/turnos';
import Admin from './componentes/admin';
import VerTurnos from './componentes/verturnos';
import Ingresar from './componentes/ingresar';
import ActualizarPrecios from './componentes/actualizarprecios';
import Actualizando from './componentes/actualizando';
import VerTodosLosTurnos from './componentes/vertodoslosturnos';
import Confirmado from './componentes/confirmado';
import Eliminado from './componentes/eliminado';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Turnos />} />
        <Route path='/ingresaradmin' element={<Ingresar />} />
        <Route path='/admin=juanchobarber' element={<Admin />} />
        <Route path='/verturnosreservadosparahoy' element={<VerTurnos />} />
        <Route path='/actualizandopreciosdenavajalegendary' element={<ActualizarPrecios />} />
        <Route path='/actualizar/:id' element={<Actualizando />} />
        <Route path='/vertodoslosturnosregistrados' element={<VerTodosLosTurnos />} />
        <Route path='/confirmado/:cliente/:dia/:hora' element={<Confirmado />} />
        <Route path='/eliminado/:cliente/:dia/:hora' element={<Eliminado />} />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
