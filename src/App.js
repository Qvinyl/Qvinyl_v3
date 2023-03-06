import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Qvinyl from './components/Main';
import Login from './pages/Login';
import './App.css';
const firebase = require('./config/constraints').firebaseAuth;

const App = () => {
  const [authed, setAuth] = useState(true);

  useEffect(() => {
    firebase.onAuthStateChanged((user) => {
      if (user) {
        setAuth(true)
      }
      else {
        setAuth(false);
      }
    });
  }, [])

  return (
    <div className="App">
      <Router>
          <Routes>
            { authed ? 
              <Route exact path="/qvinyl" element={<Qvinyl/>}/>
            :
              <Route exact path="/login" element={<Login/>}/>
            }
            {/* <Route path="*" element={<NotFound/>}/> */}
          </Routes>
      </Router>
    </div>
  );
}

export default App;
 