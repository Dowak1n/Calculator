import React from 'react';

interface DisplayProps {
  previousExpression: string;
  currentExpression: string;
}

function Display({ previousExpression, currentExpression }: DisplayProps): React.ReactElement {
  return (
    <div className="display">
      <div className="display-previous">{previousExpression}</div>
      <div className="display-result" data-testid="result">{currentExpression}</div>
    </div>
  );
}

export default Display;
