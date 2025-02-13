import React, { createContext, useContext, useState } from "react";
import * as Sentry from '@sentry/react'

export function initializeSentry(config) {
    Sentry.init({
        dsn: config.sentryDsn,
        environment: config.environment,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
          ],
          // Tracing
          tracesSampleRate: 1.0, //  Capture 100% of the transactions
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: ["localhost", /^https:\/\/auctionsapp.netlify.app\/\.io\/api/],
          // Session Replay
          replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
          replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    })
}

//Logging Levels
export const LogLevel = {
    ERROR : 'ERROR',
    WARN : 'WARN',
    INFO : 'INFO',
    DEBUG : 'DEBUG',
}

class LoggingService {
    constructor(config) {
        this.config = config;
        this.localBuffer = [];
        this.MAX_LOCAL_BUFFER = 100;
        this.FLUSH_INTERVAL = 30000;
        this.initializeLogging();
    }

    initializeLogging() {
        setInterval(() => this.flushLogs(), this.FLUSH_INTERVAL);

        window.addEventListener('error', ({message, filename, lineno, colno}) => {
            this.logError('Uncaught Error', {
                message,
                filename,
                lineno,
                colno
            })
        })

        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason
            })
        })
    }

    shouldLog(level) {
        const logLevels = [
            LogLevel.ERROR,
            LogLevel.WARN,
            LogLevel.INFO,
            LogLevel.DEBUG,
        ]

        return logLevels.indexOf(level) <= logLevels.indexOf(this.config.LogLevel)
    }

    createLogEntry(level, message, context = {}) {
        return {
            timestamp: new Date().toISOString(),
            level,
            message,
            context,
            applicationId: this.config.applicationId,
            environment: this.config.environment,
        }
    }

    bufferLog(entry) {
        this.localBuffer.push(entry)
        if (this.localBuffer.length >= this.MAX_LOCAL_BUFFER) {
            this.flushLogs();
        }
    }

    async flushLogs() {
        if (this.localBuffer.length === 0) return;

        try {
            if (this.config.enableRemoteLogging) {
                // make api call to log to backend
            }

            if (this.config.environment === 'development') {
                this.localBuffer.forEach(log => {
                    console[log.level.toLowercase()](
                        `[${log.timestamp}] ${log.message}`,
                        log.context
                    )
                })
            }
            this.localBuffer = [];
        } catch (error) {
            console.error('Failed to send logs', error);
        }
    }

    log(level, message, context = {}) {
        if (!this.shouldLog(level)) return;
        const entry = this.createLogEntry(level, message, context);
    }

    logError(message, context) {
        this.log(LogLevel.ERROR, message, context)
    }

    logWarn(message, context) {
        this.log(LogLevel.WARN, message, context)
    }
    
    logInfo(message, context) {
        this.log(LogLevel.INFO, message, context)
    }

    logDebug(message, context) {
        this.log(LogLevel.DEBUG, message, context)
    }
}

const LoggingContext = createContext(null);

export function LoggingProvider({children, config}) {
    const [loggingService] = useState(() => new LoggingService(config));

    return (
        <LoggingContext.Provider value={loggingService}>
            {children}
        </LoggingContext.Provider>
    )
}

export function useLogging() {
    const loggingService = useContext(LoggingService)
    if (!loggingService) {
        throw new Error('useLogging must be user with a LoggingProvider')
    }
    return loggingService;
}


