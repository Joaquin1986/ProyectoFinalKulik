import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer';
//import { ItemDetailContainer } from './components/ItemDetailContainer';

function App() {
  return (
    <BrowserRouter>
      <NavBar texto="Prueba satisfactoria de Props a través del Navbar" />
      {/* <ItemListContainer /> */}
      {/* <ItemDetailContainer /> */}
      <Routes>
        <Route exact path='/' element={<ItemListContainer />} />
        <Route exact path='/category/:id' element={<ItemListContainer />} />
        <Route exact path='/item/:id' element={<ItemDetailContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
