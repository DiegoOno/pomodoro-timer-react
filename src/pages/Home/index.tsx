import React from 'react';
import { Link } from 'react-router-dom';

import NumberSetter from '../../components/NumberSetter';
import './styles.css';

const Home = () => {
  return (
    <div className='container'>
      <h1>Pomodoro</h1>
      <div className='pomodoro-config-field'>
        <NumberSetter title='Trabalho' defaultValue={25}/>
        <NumberSetter title='Pausa' defaultValue={5}/>
        <NumberSetter title='Sessões' defaultValue={3}/>
      </div>
      <div className='confirm-container'>
        <Link to='/timer'>
          <button className='confirm-button'>Continuar</button>
        </Link>
      </div>
      
    </div>
  );
};

export default Home;