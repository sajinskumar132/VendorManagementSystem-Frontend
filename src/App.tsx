import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './component/login/Login';
import SignUp from './component/signup/SignUp';
import Dashboard from './component/dashboard/Dashboard';


function App() {
  return (
    < >
      <Routes >
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default App;
