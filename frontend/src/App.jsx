import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';
import HeaderNav from './components/HeaderNav';
import SignToTextPage from "./components/SignToTextPage"
import AboutUs from './components/AboutUs';

function App() {
  return (
    <BrowserRouter>
      <HeaderNav/>
      <Routes>
        <Route path="/signtotext" element={<SignToTextPage />}>
        </Route>
        <Route path="/about" element={<AboutUs />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;