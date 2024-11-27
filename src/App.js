import React from "react";
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Membres from "./Membres";
import Contact from './Contact';
import Signup from "./Signup";
import Connexion from "./Connexion";
import Profil from "./Profil";
import Boutique from "./Boutique";
import AddPartenaires from "./AddPartenaires";

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/connexion" replace />} />
        <Route path="/membres" element={token ? <Membres /> : <Navigate to="/connexion" replace />} />
        <Route path="/contact" element={token ? <Contact /> : <Navigate to="/connexion" replace />} />
        <Route path="/contact" element={token ? <Home /> : <Navigate to="/connexion" replace />} />
        <Route path="/profil" element={token ? <Profil /> : <Navigate to="/connexion" replace />} />
        <Route path="/boutique" element={token ? <Boutique /> : <Navigate to="/connexion" replace />} />
        <Route path="/addpartenaires" element={token ? <AddPartenaires /> : <Navigate to="/connexion" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="*" element={<Navigate to="/connexion" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
