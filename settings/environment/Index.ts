import _ from 'lodash'
const env = process.env.NODE_ENV || 'development'
const setting = require(`./${env}.js`);

const all = {
  envNode: setting.envNode,
  server: {
    host: setting.server.host,
    port: setting.server.port
  }
};

export default _.assign(all, setting);