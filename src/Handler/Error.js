module.exports = class Err extends Error {
    constructor(message, name = null) {
      super();
      Error.captureStackTrace(this, this.constructor);
      this.name = name || "HIME_ERROR";
      this.message = message;
    }
  };
  