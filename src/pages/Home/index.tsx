import React from 'react';

import NumberSetter from '../../components/NumberSetter';
import './styles.css';

const Home = () => {
  return (
    <div className='container'>
      <h1>Pomodoro</h1>
      <div className='pomodoro-config-field'>
        <NumberSetter />
        <NumberSetter />
        <NumberSetter />
      </div>
      <button className='confirm-button'><h1>Continuar</h1></button>
    </div>
  );
};

export default Home;