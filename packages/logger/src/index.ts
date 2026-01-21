// @justdx/logger - Standardized logging for APIs/workers
import pino from "pino";

const isDev = process.env.NODE_ENV === "development";

export interface LogContext {
  requestId?: string;
  userId?: string;
  jobId?: string;
  service?: string;
  [key: string]: unknown;
}

/**
 * Create a contextualized logger instance
 */
export function createLogger(context: LogContext = {}) {
  return pino({
    level: process.env.LOG_LEVEL || "info",
    ...(isDev && {
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      },
    }),
    base: {
      env: process.env.NODE_ENV,
      ...context,
    },
  });
}

/**
 * Default logger instance
 */
export const logger = createLogger();

export type Logger = ReturnType<typeof createLogger>;
