import { operations, isOperator } from './operations';

const calculateExpression = (input: string): string => {
  const normalizedInput = input.replace(/,/g, '.');
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];
  let lastTokenWasNumberOrCloseParen = false;

  const tokens = normalizedInput.match(/(\d+(\.\d+)?|[-+*/^%()]|sqrt)/g) || [];

  tokens.forEach((token, index) => {
    if (/\d/.test(token)) {
      outputQueue.push(token);
      lastTokenWasNumberOrCloseParen = true;
    } else if (token === 'sqrt') {
      operatorStack.push(token);
      lastTokenWasNumberOrCloseParen = false;
    } else if (isOperator(token)) {
      if (
        token === '-'
        && !lastTokenWasNumberOrCloseParen
        && (index === 0 || tokens[index - 1] === '(')
      ) {
        const nextToken = tokens[index + 1];
        if (nextToken && /\d/.test(nextToken)) {
          outputQueue.push(`-${nextToken}`);
          tokens.splice(index + 1, 1);
        }
      } else {
        while (
          operatorStack.length > 0
          && isOperator(operatorStack[operatorStack.length - 1])
        ) {
          const op2 = operations[operatorStack[operatorStack.length - 1]];
          const op1 = operations[token];
          if (
            op1.associativity === 'left'
            && op1.precedence <= op2.precedence
          ) {
            outputQueue.push(operatorStack.pop()!);
          } else {
            break;
          }
        }
        operatorStack.push(token);
        lastTokenWasNumberOrCloseParen = false;
      }
    } else if (token === '(') {
      operatorStack.push(token);
      lastTokenWasNumberOrCloseParen = false;
    } else if (token === ')') {
      while (
        operatorStack.length > 0
        && operatorStack[operatorStack.length - 1] !== '('
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.pop();
      lastTokenWasNumberOrCloseParen = true;
    }
  });

  while (operatorStack.length > 0) {
    outputQueue.push(operatorStack.pop()!);
  }

  const calculationStack: number[] = [];
  outputQueue.forEach((token) => {
    if (/^-?\d+(\.\d+)?$/.test(token)) {
      calculationStack.push(parseFloat(token));
    } else if (token === 'sqrt') {
      const operand = calculationStack.pop()!;
      const result = Math.sqrt(operand);
      if (Number.isNaN(result)) {
        return 'Ошибка';
      }
      calculationStack.push(result);
    } else if (isOperator(token)) {
      const secondOperand = calculationStack.pop()!;
      const firstOperand = calculationStack.pop()!;
      const operation = operations[token];
      const result = (operation.perform as (a: number, b: number) => number)(
        firstOperand,
        secondOperand,
      );
      if (Number.isNaN(result)) {
        return 'Ошибка';
      }
      calculationStack.push(result);
    }
  });

  return calculationStack.length === 1 ? calculationStack[0].toString() : 'Ошибка';
};

export default calculateExpression;
