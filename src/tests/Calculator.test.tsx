import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from '../components/Calculator';

const setup = () => {
  render(<Calculator />);
  return {

    button1: screen.getByText('1'),
    button2: screen.getByText('2'),
    button3: screen.getByText('3'),
    button4: screen.getByText('4'),
    button5: screen.getByText('5'),
    button6: screen.getByText('6'),
    button7: screen.getByText('7'),
    button8: screen.getByText('8'),
    button9: screen.getByText('9'),
    buttonLeftParen: screen.getByText('('),
    buttonRightParen: screen.getByText(')'),
    buttonPlus: screen.getByText('+'),
    buttonMinus: screen.getByText('-'),
    buttonMultiply: screen.getByText('*'),
    buttonDivide: screen.getByText('/'),
    buttonEquals: screen.getByText('='),
    buttonClear: screen.getByText('C'),
    buttonBackspace: screen.getByText('←'),
    resultElement: screen.getByTestId('result'),
    buttonSqrt: screen.getByText('√'),
    buttonModulus: screen.getByText('%'),

  };
};

describe('Calculator Component', () => {
  test('performs addition correctly', () => {
    const {
      button1, buttonPlus, button2, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button1);
    fireEvent.click(buttonPlus);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('3');
  });

  test('performs subtraction correctly', () => {
    const {
      button5, buttonMinus, button2, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button5);
    fireEvent.click(buttonMinus);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('3');
  });

  test('performs multiplication correctly', () => {
    const {
      button3, buttonMultiply, button2, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button3);
    fireEvent.click(buttonMultiply);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('6');
  });

  test('performs division correctly', () => {
    const {
      button8, buttonDivide, button4, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button8);
    fireEvent.click(buttonDivide);
    fireEvent.click(button4);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('2');
  });

  test('performs square root correctly', () => {
    const {
      buttonSqrt, button9, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(buttonSqrt);
    fireEvent.click(button9);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('3');
  });

  test('performs modulus operation correctly', () => {
    const {
      button7, buttonModulus, button2, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button7);
    fireEvent.click(buttonModulus);
    fireEvent.click(button2);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('1');
  });

  test('handles backspace correctly', () => {
    const {
      button1, button2, buttonBackspace, resultElement,
    } = setup();

    fireEvent.click(button1);
    fireEvent.click(button2);
    fireEvent.click(buttonBackspace);

    expect(resultElement.textContent).toBe('1');
  });

  test('clears input correctly', () => {
    const {
      button1, button2, buttonClear, resultElement,
    } = setup();

    fireEvent.click(button1);
    fireEvent.click(button2);
    fireEvent.click(buttonClear);

    expect(resultElement.textContent).toBe('0');
  });

  test('displays error for invalid operations', () => {
    const {
      button1, buttonDivide, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button1);
    fireEvent.click(buttonDivide);
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('Ошибка');
  });

  test('displays "Ошибка" for sqrt(-1)', () => {
    const {
      buttonSqrt, buttonLeftParen,
      button1, buttonMinus, buttonRightParen,
      buttonEquals, resultElement,
    } = setup();

    fireEvent.click(buttonSqrt);
    fireEvent.click(buttonLeftParen);
    fireEvent.click(buttonMinus);
    fireEvent.click(button1);
    fireEvent.click(buttonRightParen);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('Ошибка');
  });

  test('', () => {
    const {
      buttonSqrt, buttonLeftParen,
      button1, buttonMinus, buttonRightParen,
      buttonEquals, resultElement,
    } = setup();

    fireEvent.click(buttonSqrt);
    fireEvent.click(buttonLeftParen);
    fireEvent.click(buttonMinus);
    fireEvent.click(button1);
    fireEvent.click(buttonRightParen);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('Ошибка');
  });

  test('comprehensive calculator test', () => {
    const {
      button2, button4,
      button6, button8,
      buttonPlus, buttonMinus,
      buttonMultiply,
      buttonLeftParen,
      buttonRightParen, buttonEquals,
      resultElement,
    } = setup();

    fireEvent.click(buttonLeftParen);
    fireEvent.click(button8);
    fireEvent.click(buttonPlus);
    fireEvent.click(button4);
    fireEvent.click(buttonRightParen);
    fireEvent.click(buttonMultiply);
    fireEvent.click(buttonLeftParen);
    fireEvent.click(button6);
    fireEvent.click(buttonMinus);
    fireEvent.click(button2);
    fireEvent.click(buttonRightParen);
    fireEvent.click(buttonMinus);
    fireEvent.click(button4);
    fireEvent.click(buttonEquals);

    expect(resultElement.textContent).toBe('44');
  });

  test('incorrect operator usage', () => {
    const {
      button3, buttonPlus, buttonEquals, resultElement,
    } = setup();

    fireEvent.click(button3);
    fireEvent.click(buttonPlus);
    fireEvent.click(buttonEquals);
    expect(resultElement.textContent).toBe('Ошибка');
  });
});
