const axios = require('axios');

class Service {
  constructor() {}

  sendDataBlockchain(data, cb) {
    axios
      .post('http://localhost:9343/api/register/', data)
      .then(response => {
        console.log(response.data);
        cb(true);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

module.exports = new Service();
