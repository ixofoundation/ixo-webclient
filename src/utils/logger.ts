import * as Sentry from '@sentry/react'

interface Metadata {
  fileName?: string
  lineNumber?: number
}
interface ILogger {
  logError(error: Error, extraData?: Metadata): void
  logMessage(message: string, level?: 'info' | 'warning' | 'error'): void
}

class SentryLogger implements ILogger {
  logError(error: Error, extraData?: Record<string, any>): void {
    Sentry.captureException(error, { extra: extraData })
  }

  logMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
    Sentry.captureMessage(message, level)
  }
}

// Initialize the logger as an instance of SentryLogger
export const logger: ILogger = new SentryLogger()

export function logError(error: Error, extraData?: Record<string, any>): void {
  logger.logError(error, extraData)
}

export function logMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
  logger.logMessage(message, level)
}
