import React, { useState, useEffect, useCallback } from 'react';
import './Calculator.css';

type BinaryOperation = (a: number, b: number) => number;
type UnaryOperation = (a: number) => number;

type Operation = {
  symbol: string;
  precedence: number;
  associativity: 'left' | 'right';
  perform: BinaryOperation | UnaryOperation;
};

const operations: Record<string, Operation> = {
  '+': {
    symbol: '+', precedence: 1, associativity: 'left', perform: (a, b) => a + b,
  },
  '-': {
    symbol: '-', precedence: 1, associativity: 'left', perform: (a, b) => a - b,
  },
  '*': {
    symbol: '*', precedence: 2, associativity: 'left', perform: (a, b) => a * b,
  },
  '/': {
    symbol: '/',
    precedence: 2,
    associativity: 'left',
    perform: (a, b) => {
      if (b === 0) {
        return NaN;
      }
      return a / b;
    },
  },
  '%': {
    symbol: '%', precedence: 2, associativity: 'left', perform: (a, b) => a % b,
  },
  sqrt: {
    symbol: 'sqrt',
    precedence: 3,
    associativity: 'right',
    perform: (a: number) => {
      if (a < 0) {
        return NaN;
      }
      return Math.sqrt(a);
    },
  },
};

const isOperator = (token: string): token is keyof typeof operations => token in operations;

const Calculator: React.FC = function Calculator() {
  const [input, setInput] = useState<string>('');
  const [previousExpression, setPreviousExpression] = useState<string>('');
  const [currentExpression, setCurrentExpression] = useState<string>('');

  const handleButtonClick = useCallback((value: string) => {
    setInput((prev) => (input === 'Ошибка' ? value : prev + value));
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setCurrentExpression('');
  }, []);

  const handleBackspace = useCallback(() => {
    setInput((prev) => prev.slice(0, -1));
  }, []);

  const handleCalculate = useCallback(() => {
    try {
      const normalizedInput = input.replace(/,/g, '.');
      const outputQueue: string[] = [];
      const operatorStack: string[] = [];
      const tokens = normalizedInput.match(/(\d+(\.\d+)?|\+|-|\*|\/|\^|\(|\)|sqrt|%)/g) || [];

      tokens.forEach((token) => {
        if (/\d/.test(token)) {
          outputQueue.push(token);
        } else if (isOperator(token)) {
          while (
            operatorStack.length > 0
            && isOperator(operatorStack[operatorStack.length - 1])
            && (
              (operations[token].associativity === 'left' && operations[token].precedence <= operations[operatorStack[operatorStack.length - 1]].precedence)
              || (operations[token].associativity === 'right' && operations[token].precedence < operations[operatorStack[operatorStack.length - 1]].precedence)
            )
          ) {
            outputQueue.push(operatorStack.pop()!);
          }
          operatorStack.push(token);
        } else if (token === '(') {
          operatorStack.push(token);
        } else if (token === ')') {
          while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
            outputQueue.push(operatorStack.pop()!);
          }
          if (operatorStack.length === 0 || operatorStack.pop() !== '(') {
            throw new Error('Unmatched parentheses');
          }
        }
      });

      while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop()!);
      }

      const calculationStack: number[] = [];

      outputQueue.forEach((token) => {
        if (/\d/.test(token)) {
          calculationStack.push(parseFloat(token));
        } else if (isOperator(token)) {
          const operation = operations[token];
          if (operation.symbol === 'sqrt') {
            const a = calculationStack.pop()!;
            const result = (operation.perform as UnaryOperation)(a);
            if (Number.isNaN(result)) {
              throw new Error('Invalid square root');
            }
            calculationStack.push(result);
          } else {
            const b = calculationStack.pop()!;
            const a = calculationStack.pop()!;
            const result = (operation.perform as BinaryOperation)(a, b);
            if (Number.isNaN(result)) {
              throw new Error('Division by zero');
            }
            calculationStack.push(result);
          }
        }
      });

      if (calculationStack.length !== 1) {
        throw new Error('Invalid expression');
      }

      const result = calculationStack[0];
      setPreviousExpression(input);
      setCurrentExpression(Number.isNaN(result) ? 'Ошибка' : result.toString());
      setInput(Number.isNaN(result) ? 'Ошибка' : result.toString());
    } catch (e) {
      setCurrentExpression('Ошибка');
      setInput('Ошибка');
    }
  }, [input]);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCalculate();
    } else if (event.key === 'Escape') {
      handleClear();
    } else if (event.key === 'Backspace') {
      handleBackspace();
    } else if (/\d|\+|-|\*|\/|\^|\(|\)|\.|%/.test(event.key)) {
      handleButtonClick(event.key);
    }
  }, [handleCalculate, handleClear, handleBackspace, handleButtonClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const buttons = [
    { value: 'C', onClick: handleClear },
    { value: 'sqrt(', onClick: () => handleButtonClick('sqrt('), text: '√' },
    { value: '%', onClick: () => handleButtonClick('%') },
    { value: '/', onClick: () => handleButtonClick('/') },
    { value: '7', onClick: () => handleButtonClick('7') },
    { value: '8', onClick: () => handleButtonClick('8') },
    { value: '9', onClick: () => handleButtonClick('9') },
    { value: '*', onClick: () => handleButtonClick('*') },
    { value: '4', onClick: () => handleButtonClick('4') },
    { value: '5', onClick: () => handleButtonClick('5') },
    { value: '6', onClick: () => handleButtonClick('6') },
    { value: '-', onClick: () => handleButtonClick('-') },
    { value: '1', onClick: () => handleButtonClick('1') },
    { value: '2', onClick: () => handleButtonClick('2') },
    { value: '3', onClick: () => handleButtonClick('3') },
    { value: '+', onClick: () => handleButtonClick('+') },
    { value: '00', onClick: () => handleButtonClick('00') },
    { value: '0', onClick: () => handleButtonClick('0') },
    { value: ',', onClick: () => handleButtonClick(',') },
    { value: '=', onClick: handleCalculate },
    { value: '←', onClick: handleBackspace },
    { value: '(', onClick: () => handleButtonClick('(') },
    { value: ')', onClick: () => handleButtonClick(')') },
  ];

  return (
    <div className="calculator-wrapper">
      <div className="calculator">
        <div className="display">
          <div className="display-previous">
            {previousExpression}
          </div>
          <div className="display-result" data-testid="result">
            {input || currentExpression || '0'}
          </div>
        </div>
        <div className="buttons">
          {buttons.map((btn) => (
            <button key={btn.value} onClick={btn.onClick} type="button">
              {btn.text || btn.value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
