import { useCallback, useState } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainHeader from './shared/MainHeader/MainHeader';
import Food from './Food/pages/Food/Food';
import Login from './auth/login/Login';
import Signup from './auth/signup/Signup';
import { AuthContext } from './shared/context/auth-context';
import axios from 'axios';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);

  const login = useCallback((inputs) => {
    async function log() {
      try {

        const res = await axios.post('http://localhost:5000/login', inputs);
    
        if(!res.data.message){
          setIsLoggedIn(true)
        }
        else{
          setErrorMessage(null);
          setErrorMessage(res.data.message)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    log()
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, [])


  let routes;
  if (isLoggedIn) {
    routes = (
    <Routes>
      <Route path="/" element={<Food />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>)
  } else {
    routes = (
      <Routes>
        <Route path="/login" element={<Login errorMessage={errorMessage} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>)
  }



  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
        <MainHeader />
        <div className='centered'>
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
