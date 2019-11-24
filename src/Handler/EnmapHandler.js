const Enmap = require('enmap');

class TippyDatabase extends Enmap {
    constructor(...args) { // eslint-disable-line
      super(...args);
    } 

    got(key){
        const userprof = this.get(key) || this.config;
        userprof.id = key;
        return userprof;
    }
  
  get config() {
    return {
        invite: [{
            guildId: 0,
            count: 0
        }],
        guild: [{
            guildId: 0,
            invitedBy: 0
        }]
    } 
  } 
}

module.exports = TippyDatabase;