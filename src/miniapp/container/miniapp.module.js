import Card from "@/miniapp/card/miniapp.card.js";
import * as utils from "@/utils";
import styles from "./miniapp.css";
class MiniAppContainer {
  constructor() {
    this.state = {
      miniapps: []
    };
    this.events();
    this.getMiniApps();
  }

  getMiniApps() {
    // API call to get miniapps
    // const { miniapps } = props;
    const requestObj = {
      // url: "/miniapp-service/v1.0.0/miniapps?type=webcard&postId=56"
      url: "https://jsonplaceholder.typicode.com/todos/1"
    };
    utils.request(requestObj).then(res => {
      console.log(res, "this is it");
      debugger;
      this.state = {
        apps: [
          {
            id: "Ludo",
            name: "Ludo With Friends",
            icon: "https://static.gamezop.com/SkhljT2fdgb/thumb.png",
            link: "https://www.gamezop.com/g/SkhljT2fdgb?id=peSLSV&sub=enk",
            image: "https://static.gamezop.com/SkhljT2fdgb/square.png"
          },
          {
            id: "SwayBay",
            name: "Sway Bay",
            icon: "https://static.gamezop.com/B1PMIp4XCe/thumb.png",
            link: "https://www.gamezop.com/g/B1PMIp4XCe?id=peSLSV&sub=enk",
            image: "https://static.gamezop.com/B1PMIp4XCe/square.png"
          }
        ]
      };
      this.render();
      return Promise.resolve();
    });
  }

  events() {}

  render() {
    const { apps } = this.state;
    Array.from(apps).forEach(miniapp => new Card(miniapp));
  }
}

export default MiniAppContainer;
