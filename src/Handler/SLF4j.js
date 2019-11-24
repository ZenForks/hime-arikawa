/*
 *   Copyright (c) 2019 Billy Addlers (Riichi Rusdiana)<finnsonalca123@gmail.com>
 *   All rights reserved.
 */

const { EventEmitter } = require("events");
const Logger = require("../Util/Logger");
const Err = require("./Error");

/**
 * A Module to provide basic API for the logging to works
 * @module LoggingFactory
 * @author Riichi_Rusdiana#6815
 */
class LoggingFactory extends EventEmitter {
  constructor(classpath) {
    super();

    let packagename;
    if (typeof classpath === "string") packagename = classpath.toString();
    /* eslint-disable */
    this.packagename = function() {
      /* eslint-enable */
      if (typeof classpath === "function") return classpath.name;
      if (typeof classpath === "object") return classpath.constructor.name;
      return packagename;
    };
    this.pid = process.pid;

    ["info", "error", "debug"].forEach(e => {
      this[e] = log => {
        const retapi = {};
        retapi.message = log;
        this.emit(e, retapi);
      };
      this.on(e, api => {
        const data = {};
        data.level = e;
        data.message = api.message;
        data.name = this.packagename();
        data.pid = this.pid;
        switch (e) {
          case "info":
            Logger.info(data);
            break;
          case "error":
            throw new Err(data.message, data.name);
          case "debug":
            Logger.debug(data);
            break;
        }
      });
    });

    this.print = a => {
      this.info(a);
    };
  }
}

module.exports = LoggingFactory;