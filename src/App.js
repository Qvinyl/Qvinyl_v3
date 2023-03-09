import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Qvinyl from './components/Qvinyl';
import Login from './pages/Login';
import './App.css';
import { findOrCreateUser } from './features/userService/UserAdministration';

const auth = require('./config/constraints').firebaseAuth;

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        findOrCreateUser(user);
        navigate("/qvinyl");
      }
      else {
        navigate("/login")
      }
    });
  }, [navigate]);

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
 