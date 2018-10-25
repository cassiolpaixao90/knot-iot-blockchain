import WaterflowPub from "../../middleware/common/WaterflowPub";
const request = require("request");

export class WaterFlowDataAgent {
  private waterflowPub: WaterflowPub;
  private waterFlow: any;

  constructor() {
    this.waterflowPub = new WaterflowPub();
  }

  async createNewWaterFlow(data: any) {
    // this.waterFlow = {
    //   uuid: data.uuid,
    //   flowRate: data.message.flowRate,
    //   anamolia: data.anamolia
    // };

    const dateTime = new Date().getTime();
    const timestamp = Math.floor(dateTime / 1000);

    const dataT = {
      userNumber:
        "dc099880ee7d2b16e956b33cbd8b71d7cf5fdb85a3d14aea434572936a0afbd7",
      address: "04f4dd31-efde-4c71-9e40-06fc5a38083b01" + timestamp,
      cost: data.cost,
      anomalia: data.anamolia
    };
    // this.waterflowPub.publish(this.waterFlow);
    request.post(
      {
        headers: { "content-type": "application/json" },
        url: "http://localhost:9443/api/register/",
        form: dataT
      },
      function(error, response, body) {
        console.log("ok");
        // console.log("response", response);
        // console.log("error", error);
      }
    );
  }
}
