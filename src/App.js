import React from "react";
import Form from './components/Form';
import './App.css';
import {Route, Link} from 'react-router-dom';

const App = () => {
  return (
    <div className='container'>
      <Route exact path='/'>
        <Link className='link' to='/pizza'>Take me to the pizza form!</Link>
      </Route>
      <Route exact path='/pizza'>
        <h1>Lambda Eats</h1>
        <Form />
      </Route>
    </div>
  );
};
export default App;
