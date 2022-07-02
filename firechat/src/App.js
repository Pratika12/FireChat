import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import AuthProvider from './context/auth'
import PrivateRoute from './components/PrivateRoute';
import {Fragment} from 'react'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path='/' element={<Home/>}/>
              </Route>
              <Route path='/Register' element={<Register/>}/>
              <Route path='/Login' element={<Login/>}/>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
