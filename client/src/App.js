import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Password from './components/Password';
import PageNotFound from './components/PageNotFound'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to={'/username'} replace/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/username' element={<Login/>} />
      <Route path='/password' element={<Password/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    </BrowserRouter>
  )
};

export default App;
