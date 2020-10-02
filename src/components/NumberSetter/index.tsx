import React, { useState } from 'react';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';

import './styles.css';

interface NumberSetterProps {
  title: String,
  defaultValue: number
};

const NumberSetter: React.FC<NumberSetterProps> = ({ title, defaultValue }) => {
  const buttonColor = '#FFFFFF'

  const [inputValue, setInputValue] = useState(defaultValue);

  const increment = () => {
    if (inputValue < 60) {
      setInputValue(inputValue + 1);
    } else {
      setInputValue(0);
    }
  }

  const decrement = () => {
    if (inputValue > 0) {
      setInputValue(inputValue - 1);
    } else {
      setInputValue(60);
    }
  }

  return (
    <div className='wrapper'>
      <div className='data-field'>
        <div className="button-wrapper">
          <button onClick={increment}>
            <FaArrowUp size={20} color={buttonColor}/>
          </button>
          <button onClick={decrement}>
            <FaArrowDown size={20} color={buttonColor}/>
          </button>
        </div>
        <div className='input-field'>
          <input 
            type='number' 
            max='59' 
            min='00' 
            value={inputValue}
            disabled
          />
        </div>
      </div>
      <span>
        {title}
      </span>
    </div>
  );
};

export default NumberSetter;