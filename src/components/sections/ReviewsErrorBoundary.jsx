import { Component } from 'react';

class ReviewsErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Reviews Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="reviews-error-fallback">
          <p>Unable to load reviews at this time. Please check back later.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ReviewsErrorBoundary;
