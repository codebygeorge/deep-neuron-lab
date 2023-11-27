import { FC } from 'react';

import './error-block.css';

const ErrorBlock: FC = () => (
  <div className="error-block" data-testid="error-block">
    <span>Something went wrong! Try again later.</span>
  </div>
);
export default ErrorBlock;
