import { Component } from 'react'
import { isChunkLoadError, reportError } from '@/utils/reportError'
import { ErrorScreen } from './ErrorScreen'

/**
 * Top-level React error boundary.
 *
 * This has to be a class: `getDerivedStateFromError` / `componentDidCatch`
 * have no hook equivalent. It sits outside the router in App.jsx and is the
 * last line of defence — it catches failures the router's own errorElement
 * cannot, including errors thrown by the router or the Redux Provider
 * themselves.
 *
 * Caveat worth knowing: boundaries catch render-phase errors only. Errors in
 * event handlers and async callbacks bypass them entirely, so those paths
 * should call reportError() directly.
 */
export class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    reportError(error, {
      source: this.props.source ?? 'ErrorBoundary',
      componentStack: errorInfo?.componentStack,
    })
  }

  handleRetry = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children, fallback, variant = 'page' } = this.props

    if (!error) return children

    if (fallback) {
      return typeof fallback === 'function'
        ? fallback({ error, retry: this.handleRetry })
        : fallback
    }

    return (
      <ErrorScreen
        variant={variant}
        error={error}
        onRetry={this.handleRetry}
        isChunkError={isChunkLoadError(error)}
      />
    )
  }
}
