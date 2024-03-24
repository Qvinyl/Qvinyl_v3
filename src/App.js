import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom'; 
import Qvinyl from './components/Qvinyl';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { setUser, setLoggedIn, setPeerConnection} from './store/actions/userActions';
import './App.css';
import { findOrCreateUser } from './features/userService/UserAdministration';
import PageNotFound from './components/Pages/PageNotFound/PageNotFound';
import WaitingRoom from './components/Pages/WaitingRoom/WaitingRoom';
import PeerService from './features/callingService/PeerService';

const auth = require('./config/constraints').firebaseAuth;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        try {
          getUser(auth);
          navigate(`${location.pathname}`, {state: {roomId: location.pathname.replaceAll("/", "")}});
          dispatch(setLoggedIn(true));
        } catch (e) {
          navigate("/login");
        }
      }
      else {
        navigate("/login");
      }
    });
  }, [dispatch]);

  const getUser = async (auth) => {
    var userInfo = await findOrCreateUser(auth);
    dispatch(setUser(userInfo));
  }

  return (
    <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path={`:roomId`} element={<WaitingRoom/>}/>
          <Route exact path="/page-not-found" element={ <PageNotFound /> } />
          <Route path="/*" element={ <Navigate to="/page-not-found" replace />} />
        </Routes>
    </div>
  );
}

export default App;
 