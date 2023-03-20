import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Qvinyl from './components/Qvinyl';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { setUser, setLoggedIn} from './store/actions/userActions';
import './App.css';
import { findOrCreateUser } from './features/userService/UserAdministration';

const auth = require('./config/constraints').firebaseAuth;

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        try {
          getUser(auth);
          navigate("/qvinyl");
          dispatch(setLoggedIn(true));
        } catch (e) {
          console.log(e);
        }
      }
      else {
        navigate("/login")
      }
    });
  }, []);

  const getUser = async (auth) => {
    var userInfo = await findOrCreateUser(auth);
    dispatch(setUser(userInfo))
  }

  return (
    <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/qvinyl" element={<Qvinyl/>} />
        </Routes>
    </div>
  );
}

export default App;
 