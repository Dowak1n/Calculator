import { useState, useCallback, useEffect } from 'react';
import calculateExpression from '../utilities/calculations';

const useCalculatorLogic = () => {
  const [input, setInput] = useState<string>('');
  const [previousExpression, setPreviousExpression] = useState<string>('');
  const [currentExpression, setCurrentExpression] = useState<string>('');
  const [isResult, setIsResult] = useState<boolean>(false);

  const handleButtonClick = useCallback(
    (value: string) => {
      setInput((prev) => {
        if (prev === 'Ошибка') {
          return value;
        }
        if (isResult) {
          setIsResult(false);
          return /\d/.test(value) ? value : prev + value;
        }
        return prev + value;
      });
    },
    [isResult],
  );

  const handleClear = useCallback(() => {
    setInput('');
    setCurrentExpression('');
    setIsResult(false);
  }, []);

  const handleBackspace = useCallback(() => {
    setInput((prev) => {
      if (prev === 'Ошибка') {
        return '';
      }
      return prev.slice(0, -1);
    });
  }, []);

  const handleCalculate = useCallback(() => {
    const result = calculateExpression(input);
    setPreviousExpression(input);
    setCurrentExpression(result);
    setInput(result);
    setIsResult(true);
  }, [input]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleCalculate();
      } else if (event.key === 'Escape') {
        handleClear();
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (/\d|\+|-|\*|\/|\^|\(|\)|\.|%/.test(event.key)) {
        handleButtonClick(event.key);
      }
    },
    [handleCalculate, handleClear, handleBackspace, handleButtonClick],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return {
    input,
    previousExpression,
    currentExpression,
    handleButtonClick,
    handleClear,
    handleBackspace,
    handleCalculate,
  };
};

export default useCalculatorLogic;
