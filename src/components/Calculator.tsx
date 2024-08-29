import React from 'react';
import '../styles/Calculator.css';
import Display from './Display';
import Keypad from './Keypad';
import useCalculatorLogic from '../hooks/useCalculatorLogic';

function Calculator(): React.ReactElement {
  const {
    input,
    previousExpression,
    currentExpression,
    handleButtonClick,
    handleClear,
    handleBackspace,
    handleCalculate,
  } = useCalculatorLogic();

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <Display previousExpression={previousExpression} currentExpression={input || currentExpression || '0'} />
        <Keypad
          onButtonClick={handleButtonClick}
          onClear={handleClear}
          onBackspace={handleBackspace}
          onCalculate={handleCalculate}
        />
      </div>
    </div>
  );
}

export default Calculator;
