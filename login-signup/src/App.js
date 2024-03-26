import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
} from "react-router-dom";
import Home from './Components/pages/Home';

function App() {
  return (
    <div className='h-100'>
    <Router>
                <Routes >
                    <Route
                        exact
                        path="/"
                        element={<LoginSignup/>}
                    />
 
                    <Route
                        exact
                        path="/home"
                        element={<Home/>}
                    />
                </Routes >
            </Router>
    </div>
  );
}

export default App;