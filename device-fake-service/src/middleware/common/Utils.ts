"use strict";

export class WaterFlowUtils {
  private priceLiter: any;
  constructor() {
    this.priceLiter = 0.00461;
  }

  calculateCost(liters) {
    return liters * this.priceLiter;
  }

  randomInRange(min, max) {
    return Math.random() < 0.5
      ? (1 - Math.random()) * (max - min) + min
      : Math.random() * (max - min) + min;
  }
}
