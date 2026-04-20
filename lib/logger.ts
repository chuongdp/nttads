export type LogLevelName = "debug" | "info" | "warn" | "error";

const RANK: Record<LogLevelName, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

function parseLevel(raw: string | undefined): LogLevelName | null {
  if (!raw) return null;
  const l = raw.trim().toLowerCase();
  if (l === "debug" || l === "info" || l === "warn" || l === "error") return l;
  return null;
}

function defaultLevel(): LogLevelName {
  if (typeof window !== "undefined") {
    return process.env.NODE_ENV === "production" ? "warn" : "debug";
  }
  return process.env.NODE_ENV === "production" ? "info" : "debug";
}

function minRank(): number {
  const isBrowser = typeof window !== "undefined";
  const raw = isBrowser
    ? process.env.NEXT_PUBLIC_LOG_LEVEL
    : (process.env.LOG_LEVEL ?? process.env.NEXT_PUBLIC_LOG_LEVEL);
  const parsed = parseLevel(raw);
  return RANK[parsed ?? defaultLevel()];
}

function stringifyMeta(meta?: Record<string, unknown>): string {
  if (meta == null || Object.keys(meta).length === 0) return "";
  try {
    return ` ${JSON.stringify(meta, (_k, v) =>
      v instanceof Error
        ? { name: v.name, message: v.message, stack: v.stack }
        : v,
    )}`;
  } catch {
    return " [meta]";
  }
}

function emit(
  level: LogLevelName,
  scope: string,
  message: string,
  meta?: Record<string, unknown>,
): void {
  if (RANK[level] < minRank()) return;
  const line = `[${new Date().toISOString()}] [${level.toUpperCase()}] [${scope}] ${message}${stringifyMeta(meta)}`;
  switch (level) {
    case "debug":
      console.debug(line);
      break;
    case "info":
      console.info(line);
      break;
    case "warn":
      console.warn(line);
      break;
    case "error":
      console.error(line);
      break;
    default:
      console.log(line);
  }
}

export type Logger = {
  debug: (message: string, meta?: Record<string, unknown>) => void;
  info: (message: string, meta?: Record<string, unknown>) => void;
  warn: (message: string, meta?: Record<string, unknown>) => void;
  error: (message: string, meta?: Record<string, unknown>) => void;
};

export function createLogger(scope: string): Logger {
  return {
    debug: (message, meta) => emit("debug", scope, message, meta),
    info: (message, meta) => emit("info", scope, message, meta),
    warn: (message, meta) => emit("warn", scope, message, meta),
    error: (message, meta) => emit("error", scope, message, meta),
  };
}

/** Logger mặc định không scope con — dùng khi không cần phân nhánh. */
export const log = createLogger("app");
