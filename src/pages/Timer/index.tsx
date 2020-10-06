import React, { useState, useEffect } from 'react';
import { FaCircle, FaPlay, FaPause } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './styles.css';
import twoDigits from '../../utils/utils';
 
const Timer = () => {
  const [actionButtonState, setActionButtonState] = useState('paused');
  const [buttonIcon, setButtonIcon] = useState(<FaPlay />);
  const [barStyle, setBarStyle] = useState('timer-bar timer-bar-playing');
  const [timerStatus, setTimerStatus] = useState('Ready');
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [sections, setSections] = useState(3);
  const [currSection, setCurrSection] = useState(0);

  const changeButtonState = () => {
    if (actionButtonState === 'play') {
      setButtonIcon(<FaPlay />);
      setActionButtonState('pause');
      setBarStyle('timer-bar timer-bar-stopped');
      setTimerStatus('Paused');
    } else {
      setActionButtonState('play');
      setButtonIcon(<FaPause />);
      setBarStyle('timer-bar timer-bar-playing');
      setTimerStatus('Playing');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <h1>Pomodoro</h1>
        <Link to='/'>
          <button>Home</button>
        </Link>
      </div>
      <div className='timer-container'>
        <div className='timer'>
          <div className={barStyle}>
            {twoDigits(minutes)}:{twoDigits(seconds)}
          </div>
        </div>
        <div className='timer-data'>
          <span>{timerStatus}</span>
          <div className='circles'>
            <FaCircle />
            <FaCircle />
            <FaCircle />
          </div>
          <button onClick={() => changeButtonState()}>
            {buttonIcon}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
