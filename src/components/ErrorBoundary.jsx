import { Component } from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="eb-page">
          <div className="eb-container">
            <div className="eb-icon">
              <span className="material-symbols-outlined">error_outline</span>
            </div>
            <h1 className="eb-title">Something went wrong</h1>
            <p className="eb-message">
              We encountered an unexpected error. This has been logged and our team has been notified.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="eb-details">
                <summary>Error Details</summary>
                <pre className="eb-error">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <div className="eb-actions">
              <button onClick={this.handleReset} className="btn btn-primary btn-lg">
                <span className="material-symbols-outlined">refresh</span>
                Reload Page
              </button>
              <a href="/" className="btn btn-outline btn-lg">
                <span className="material-symbols-outlined">home</span>
                Go to Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
