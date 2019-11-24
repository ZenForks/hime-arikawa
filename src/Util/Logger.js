const chalk = require("chalk");

class Logger {
  static info(data) {
    return console.info(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} [${chalk.magenta(data.name)}||${chalk.red(data.pid)}] ${chalk.green(
        " INFO : "
      )} ${data.message}`
    );
  }

  static debug(data) {
    return console.debug(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} [${chalk.magenta(data.name)}||${chalk.red(data.pid)}] ${chalk.blue(
        " DEBUG: "
      )} ${data.message}`
    );
  }

  static error(reason) {
    return console.error(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} ${chalk.red(" ERROR: ")} ${reason}`
    );
  }
}

module.exports = Logger;
