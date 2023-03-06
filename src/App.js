import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Qvinyl from './components/Qvinyl';
import Login from './pages/Login';
import './App.css';
const auth = require('./config/constraints').firebaseAuth;

const App = () => {
  const navigate = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setloggedIn(true);
        navigate("/qvinyl");
      }
      else {
        navigate("/login")
      }
    });

  }, [loggedIn, navigate]);

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
 