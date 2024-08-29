import React from 'react';
import Button from './Button';

interface KeypadProps {
  onButtonClick: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onCalculate: () => void;
}

const buttons = [
  { value: 'C', onClick: 'onClear', text: 'C' },
  { value: 'sqrt(', onClick: 'onButtonClick', text: '√' },
  { value: '%', onClick: 'onButtonClick', text: '%' },
  { value: '/', onClick: 'onButtonClick', text: '/' },
  { value: '7', onClick: 'onButtonClick', text: '7' },
  { value: '8', onClick: 'onButtonClick', text: '8' },
  { value: '9', onClick: 'onButtonClick', text: '9' },
  { value: '*', onClick: 'onButtonClick', text: '*' },
  { value: '4', onClick: 'onButtonClick', text: '4' },
  { value: '5', onClick: 'onButtonClick', text: '5' },
  { value: '6', onClick: 'onButtonClick', text: '6' },
  { value: '-', onClick: 'onButtonClick', text: '-' },
  { value: '1', onClick: 'onButtonClick', text: '1' },
  { value: '2', onClick: 'onButtonClick', text: '2' },
  { value: '3', onClick: 'onButtonClick', text: '3' },
  { value: '+', onClick: 'onButtonClick', text: '+' },
  { value: '00', onClick: 'onButtonClick', text: '00' },
  { value: '0', onClick: 'onButtonClick', text: '0' },
  { value: '.', onClick: 'onButtonClick', text: '.' },
  { value: '=', onClick: 'onCalculate', text: '=' },
  { value: '←', onClick: 'onBackspace', text: '←' },
  { value: '(', onClick: 'onButtonClick', text: '(' },
  { value: ')', onClick: 'onButtonClick', text: ')' },
];

function Keypad({
  onButtonClick,
  onClear,
  onBackspace,
  onCalculate,
}: KeypadProps) {
  return (
    <div className="buttons">
      {buttons.map(({ value, onClick, text }) => (
        <Button
          key={value}
          value={text}
          onClick={() => {
            if (onClick === 'onClear') onClear();
            else if (onClick === 'onBackspace') onBackspace();
            else if (onClick === 'onCalculate') onCalculate();
            else onButtonClick(value);
          }}
        />
      ))}
    </div>
  );
}

export default Keypad;
