export class Logger {
  #currentLevel;
  static #instance;

  constructor(level = 'info') {
    this.levels = ['debug', 'info', 'warn', 'error'];
    this.#currentLevel = level;
  }

  shouldLog(level) {
    return (
      this.levels.indexOf(level) >= this.levels.indexOf(this.#currentLevel)
    );
  }

  log(level, message) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
    }
  }

  debug(message) {
    this.log('debug', message);
  }
  info(message) {
    this.log('info', message);
  }
  warn(message) {
    this.log('warn', message);
  }
  error(message) {
    this.log('error', message);
  }

  static getInstance(level = process.env.LOG_LEVEL || 'error') {
    if (!Logger.#instance) {
      const logger = new Logger(level);
      Logger.#instance = logger;
    }
    return Logger.#instance;
  }

  static getInstanse(level = process.env.LOG_LEVEL || 'error') {
    return Logger.getInstance(level);
  }

  getCurrentLevel() {
    return this.#currentLevel;
  }
}
