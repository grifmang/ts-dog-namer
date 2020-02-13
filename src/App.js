import React from 'react';
import { Route } from 'react-router-dom';
import Dogs from './Dogs';
import './App.css';

function App() {
  return (
      <>
      {/* <Route path='/edit' component={EditDog} /> */}
      <Route path='/' component={Dogs} />
    </>
  );
}

export default App;
