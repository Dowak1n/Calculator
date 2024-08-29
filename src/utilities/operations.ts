import { Operation } from './types';

export const operations: Record<string, Operation> = {
  '+': {
    symbol: '+',
    precedence: 1,
    associativity: 'left',
    perform: (a, b = 0) => a + b,
  },
  '-': {
    symbol: '-',
    precedence: 1,
    associativity: 'left',
    perform: (a, b = 0) => a - b,
  },
  '*': {
    symbol: '*',
    precedence: 2,
    associativity: 'left',
    perform: (a, b = 1) => a * b,
  },
  '/': {
    symbol: '/',
    precedence: 2,
    associativity: 'left',
    perform: (a, b = 1) => {
      if (b === 0) {
        return NaN;
      }
      return a / b;
    },
  },
  '%': {
    symbol: '%',
    precedence: 2,
    associativity: 'left',
    perform: (a, b = 1) => a % b,
  },
  sqrt: {
    symbol: 'sqrt',
    precedence: 3,
    associativity: 'right',
    perform: (a) => (a < 0 ? NaN : Math.sqrt(a)),
  },
};

export const isOperator = (token: string): boolean => token in operations;
