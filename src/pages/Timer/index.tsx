import React, { useState, useEffect } from 'react';
import { FaCircle, FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './styles.css';
import twoDigits from '../../utils/utils';

export interface TimerProperties {
  workingDefaultTime: number;
  restingDefaultTime: number;
  numberOfSections: number;
}

const Timer: React.FC<TimerProperties> = ({ workingDefaultTime, restingDefaultTime, numberOfSections}) => {
  
  const [actionButtonState, setActionButtonState] = useState('paused');
  const [buttonIcon, setButtonIcon] = useState(<FaPlay />);
  const [barStyle, setBarStyle] = useState('timer-bar timer-bar-playing');
  const [timerStatus, setTimerStatus] = useState('Ready');
  const [StatusBeforePause, setStatusBeforePause] = useState('');
  const [minutes, setMinutes] = useState(workingDefaultTime);
  const [seconds, setSeconds] = useState(0);
  const [currSection, setCurrSection] = useState(0);
  const [sectionMarkers, setSectionMarkers] = useState<Array<JSX.Element>>([]);

  const changeButtonState = () => {
    // Timer was paused
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

    if (actionButtonState === 'restart') {
      setTimerStatus('Ready');
      setActionButtonState('pause');
      setMinutes(workingDefaultTime);
      setButtonIcon(<FaPlay />);
      setCurrSection(0);
    }
  };

  const changeCurrMakerColor = () => {
    let color: string = '';
    const newMarkers = [];

    if (timerStatus === 'Working' || timerStatus === 'Ready') {
      color = '#219653';
    }

    if (timerStatus === 'Resting') {
      color = '#F2C94C';
    }

    if (timerStatus === 'Paused') {
      color = '#790105';
    }

    for (let i = 0; i < numberOfSections; i++) {
      if (i < currSection) {
        newMarkers.push(<FaCircle key={i} color='gray' />);
      }

      if (i === currSection) {
        newMarkers.push(<FaCircle key={i} color={color} />);
      }

      if (i > currSection) {
        newMarkers.push(<FaCircle key={i} />);
      }
    
    setSectionMarkers(newMarkers);
      
    }
  };

  useEffect(() => {
    changeCurrMakerColor();
  }, [timerStatus]);

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
      setButtonIcon(<FaRedo />);
      setActionButtonState('restart');
    }
  }, [currSection, numberOfSections]);

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
            {sectionMarkers}
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
