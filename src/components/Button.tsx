import React from 'react';

interface ButtonProps {
  value: string;
  onClick: () => void;
}

function Button({ value, onClick }: ButtonProps): React.ReactElement {
  return (
    <button type="button" onClick={onClick}>
      {value}
    </button>
  );
}

export default Button;
