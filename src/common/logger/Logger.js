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

  static getInstanse(level = 'error') {
    if (!Logger.#instance) {
      const logger = new Logger(level);
      Logger.#instance = logger;
      console.log('New Logger instance created');
    }
    return Logger.#instance;
  }

  getCurrentLevel() {
    return this.#currentLevel;
  }
}
