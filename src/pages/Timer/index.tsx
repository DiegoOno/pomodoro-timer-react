import React, { useState, useEffect } from 'react';
import { FaCircle, FaPlay, FaPause } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './styles.css';
import twoDigits from '../../utils/utils';

export interface TimerProperties {
  workingDefaultTime: number;
  restingDefaultTime: number;
  numberOfSections: number;
}

const Timer: React.FC<TimerProperties> = ({ workingDefaultTime = 25, restingDefaultTime = 5, numberOfSections = 3 }) => {
  
  const [actionButtonState, setActionButtonState] = useState('paused');
  const [buttonIcon, setButtonIcon] = useState(<FaPlay />);
  const [barStyle, setBarStyle] = useState('timer-bar timer-bar-playing');
  const [timerStatus, setTimerStatus] = useState('Ready');
  const [StatusBeforePause, setStatusBeforePause] = useState('');
  const [minutes, setMinutes] = useState(workingDefaultTime);
  const [seconds, setSeconds] = useState(0);
  const [currSection, setCurrSection] = useState(0);

  const changeButtonState = () => {
    if (actionButtonState === 'play') {
      if (timerStatus !== 'Ready') {
        setStatusBeforePause(timerStatus);
      } else {
        setStatusBeforePause('Working');
      }
      setButtonIcon(<FaPlay />);
      setActionButtonState('pause');
      setTimerStatus('Paused');
    } else {
      setButtonIcon(<FaPause />);
      setActionButtonState('play');
      if (timerStatus === 'Ready') {
        setTimerStatus('Working');
      } else {
        setTimerStatus(StatusBeforePause);
      }
    }
  };

  // useEffect to control cronomter time;
  useEffect(() => {
    if (timerStatus === 'Working' || timerStatus === 'Resting') {
      const intervalId = setInterval(() => {
        setSeconds(seconds => seconds > 0 ? seconds - 1 : 59);
        setMinutes(minutes => seconds > 0 ? minutes : minutes - 1);
      } , 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerStatus, seconds]);

  // useEffect to control sections flow;
  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      if (timerStatus === 'Working') {
        setTimerStatus('Resting');
        setMinutes(restingDefaultTime);
        setSeconds(0);
      }

      if (timerStatus === 'Resting') {
        sectionsMarkers[currSection] = <FaCircle color='gray' />
        setCurrSection(currSection + 1);
        setTimerStatus('Working');
        setMinutes(workingDefaultTime);
        setSeconds(0);
      }
    }
  }, [minutes, seconds, timerStatus]);

  // Check if all sections were finished;
  useEffect(() => {
    if (currSection >= numberOfSections) {
      setTimerStatus(() => 'Finished');
    }
  }, [currSection]);

  // useEffect to control cronomter's style;
  useEffect(()  => {
    let barColor: string = '';
    if (timerStatus === 'Working' || timerStatus === 'Ready') {
      barColor = 'working';
    }

    if (timerStatus === 'Resting') {
      barColor = 'resting';
    }

    if (timerStatus === 'Paused') {
      barColor = 'paused';
    }

    if (timerStatus === 'Finished') {
      barColor = 'finished';
    }

    setBarStyle(`timer-bar timer-bar-${barColor}`);
  }, [timerStatus]);

  // creating sections circles
  const sectionsMarkers = [];

  for (let i = 0; i < numberOfSections; i++) {
    sectionsMarkers.push(<FaCircle key={i} />);
  }

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
            {sectionsMarkers}
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
