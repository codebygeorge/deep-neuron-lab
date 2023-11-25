import { FC } from 'react';
import { FallbackProps } from 'react-error-boundary';

import './error-boundary-fallback.css';

const ErrorBoundaryFallback: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const refreshPage = () => {
    document.location.reload();
  };

  return (
    <div className="error-block">
      <span className="error-block-title">Something went wrong.</span>
      <span className="error-block-description">{error.toString()}</span>
      <div className="error-block-buttons">
        <button className="error-block-button" type="button" onClick={refreshPage}>
          Restart
        </button>
        {resetErrorBoundary && (
          <button className="error-block-button" type="button" onClick={resetErrorBoundary}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorBoundaryFallback;
