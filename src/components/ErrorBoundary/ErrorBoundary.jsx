import React, { Component } from 'react';
import { UtensilsCrossed, RotateCcw, Home } from 'lucide-react';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('FOODLY ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card glass-panel">
            <div className="error-boundary-icon-wrap">
              <UtensilsCrossed size={48} className="error-boundary-icon" />
            </div>
            <h2 className="error-boundary-title">Something unexpected happened</h2>
            <p className="error-boundary-desc">
              We encountered a glitch in the kitchen. Don't worry, your cart and session data are safe.
            </p>
            <div className="error-boundary-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={this.handleReload}
              >
                <RotateCcw size={16} />
                <span>Reload Page</span>
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={this.handleGoHome}
              >
                <Home size={16} />
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
