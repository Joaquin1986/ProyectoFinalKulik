import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/NavBar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { CartProvider } from './contexts/CartContext';
import { Cart } from './components/Cart';

function App() {
  return (<CartProvider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<ItemListContainer />} />
        <Route exact path='/category/:id' element={<ItemListContainer />} />
        <Route exact path='/item/:itemId' element={<ItemDetailContainer />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='*' element={<h1 className='loadingTitle'>ERROR 404</h1>} />
      </Routes>
    </BrowserRouter>
  </CartProvider>
  )
}

export default App;
