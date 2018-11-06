const axios = require('axios');

class Service {
  constructor() {}

  sendDataBlockchain(data) {
    const payload = {
      userNumber: data.userNumber,
      address: data.address,
      cost: data.cost,
      anomalia: data.anomalia
    };

    axios
      .post('http://localhost:9443/api/register/', payload)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

module.exports = new Service();
