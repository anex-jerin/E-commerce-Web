import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Products';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to={'/home'} replace/>} />
      <Route path='/home' element={<Home/>} />
    </Routes>
    </BrowserRouter>
  )
};

export default App;
