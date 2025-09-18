import React from "react";
import PropTypes from 'prop-types'
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so next render shows fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log error to an error reporting service
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="w-full min-h-screen flex flex-col justify-center items-center">
                    <h1 className=" text-3xl font-bold text-red-600">Something went wrong...</h1>
                    {this.props.fallback || (
                        <p className="text-red-300">Please try again later.</p>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

ErrorBoundary.propTypes = {
    fallback: PropTypes.node,
    children: PropTypes.node.isRequired
}