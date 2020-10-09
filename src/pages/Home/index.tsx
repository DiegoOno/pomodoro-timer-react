import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NumberSetter from '../../components/NumberSetter';
import { TimerProperties } from '../Timer'
import './styles.css';

const Home = () => {
  const [workingDefaultTime, setWorkingTime] = useState(0);
  const [restingDefaultTime, setRestingTime] = useState(0);
  const [numberOfSections, setSections] = useState(0);
  const [timerProps, setTimerProps] = useState<TimerProperties>();

  useEffect(() => {
    const timerProps: TimerProperties = {
      workingDefaultTime,
      restingDefaultTime,
      numberOfSections
    }
    setTimerProps(timerProps);
  }, [workingDefaultTime, restingDefaultTime, numberOfSections]);

  return (
    <div className='container'>
      <h1>Pomodoro</h1>
      <div className='pomodoro-config-field'>
        <NumberSetter 
          title='Work' 
          defaultValue={25} 
          getFieldValue={(inputValue: number) =>
             setWorkingTime(inputValue)}
        />
        <NumberSetter 
          title='Rest' 
          defaultValue={5} 
          getFieldValue={(inputValue: number) => 
            setRestingTime(inputValue)} 
        />
        <NumberSetter 
          title='Sections' 
          defaultValue={3} 
          getFieldValue={(inputValue: number) => 
            setSections(inputValue)} 
        />
      </div>
      <div className='confirm-container'>
        <Link to='/timer'>
          <button className='confirm-button'>
            Continue
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;