import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import { useState, useEffect } from 'react';

function App() {
  return (
    <div>
     <Header></Header>
     <SearchForm></SearchForm>
    </div>
  );
}

export default App;
