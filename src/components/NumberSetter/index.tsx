import React from 'react';
import {FaArrowUp, FaArrowDown} from 'react-icons/fa';

import './styles.css';

const NumberSetter = () => {
  const buttonColor = '#333853'

  return (
    <div className='wrapper'>
      <div className='data-field'>
        <div className="button-wrapper">
          <button>
            <FaArrowUp size={20} color={buttonColor}/>
          </button>
          <button>
            <FaArrowDown size={20} color={buttonColor}/>
          </button>
        </div>
        <div className='input-field'>
          <input type='number' max='59' min='00'/>
        </div>
      </div>
      type
    </div>
  );
};

export default NumberSetter;