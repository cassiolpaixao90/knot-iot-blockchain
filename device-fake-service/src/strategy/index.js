const DeviceStrategy = require('./device')

class Init {
  /**
   * @param {*} strategy
   */
  constructor (strategy = '') {
    this.strategy = DeviceStrategy[strategy]
  }

  changeStrategy (newStrategy) {
    this.strategy = DeviceStrategy[newStrategy]
  }

  water () {
    this.strategy()
  }

  anomalia () {
    this.strategy()
  }

  noValue () {
    this.strategy()
  }
}

module.exports = new Init('water')
