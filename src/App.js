import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Qvinyl from './components/Qvinyl';
import Login from './pages/Login';
import './App.css';
import { findOrCreateUser } from './features/userService/UserAdministration';

const auth = require('./config/constraints').firebaseAuth;

const App = () => {
  const navigate = useNavigate();
    const [user, setUser] = useState({})
  useEffect(() => {
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        findOrCreateUser(auth, setUser);
        navigate("/qvinyl");
      }
      else {
        navigate("/login")
      }
    });
  }, []);

  return (
    <div className="App">
        <Routes>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/qvinyl" element={<Qvinyl user={user} />} />
        </Routes>
    </div>
  );
}

export default App;
 