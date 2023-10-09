import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import Landlord from './components/Landlord/Landlord';
import LandlordLogin from './components/LandlordLogin/LandlordLogin';
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/landlordpage" element={<Landlord />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/landlordlogin" element={<LandlordLogin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;