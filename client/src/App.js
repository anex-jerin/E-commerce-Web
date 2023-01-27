import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to={'/login'} replace/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
  )
};

export default App;
