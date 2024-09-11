import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './component/header';
import HomePage from './pages/home';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;