import React, { useState, useEffect } from 'react';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';

import './styles.css';

interface NumberSetterProps {
  title: String,
  defaultValue: number,
  getFieldValue: Function,
  fieldMaxValue: number
};

const NumberSetter: React.FC<NumberSetterProps> = ({ 
  title,
  defaultValue, 
  getFieldValue, 
  fieldMaxValue
  }) => {

  const buttonColor = '#FFFFFF'

  const [inputValue, setInputValue] = useState(defaultValue);

  const increment = () => {
    if (inputValue < fieldMaxValue) {
      setInputValue(inputValue + 1);
    } else {
      setInputValue(1);
    }
  }

  const decrement = () => {
    if (inputValue > 1) {
      setInputValue(inputValue - 1);
    } else {
      setInputValue(fieldMaxValue);
    }
  }

  useEffect(() => {
    getFieldValue(Number(inputValue));
  }, [inputValue])
  

  return (
    <div className='wrapper'>
      <div className='data-field'>
        <div className='button-wrapper'>
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
            size={2}
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