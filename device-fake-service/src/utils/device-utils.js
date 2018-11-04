class WaterFlowUtils {
  constructor() {
    this.priceLiter = 0.00461;
  }

  calculateCost(liters) {
    return liters * this.priceLiter;
  }

  // eslint-disable-next-line class-methods-use-this
  randomInRange(min, max) {
    return Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min;
  }
}

module.exports = new WaterFlowUtils();
