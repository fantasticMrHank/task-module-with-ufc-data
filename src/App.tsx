import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router';
import Home from './pages/home';
import NewFighter from './pages/add';
import WeightGroup from './pages/weightGroup';
import ContentModal from './components/modal';

function App() {



  return (
    <div className="App">
      <ContentModal />
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/weightclass/:id">
          <WeightGroup />
        </Route>
        <Route path="/add">
          <NewFighter />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
