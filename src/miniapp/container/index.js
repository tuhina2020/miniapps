import Card from "@/miniapp/card/miniapp.card.js";
import * as utils from "@/utils";
import styles from "./index.css";
class MiniAppContainer {
  constructor() {
    this.state = {
      apps: []
    };
    this.events();
    this.getMiniApps();
  }

  getMiniApps() {
    const url = new URL(document.location.href);
    const postId = url.searchParams.get("postId");
    const requestObj = {
      url: `https://apis.sharechat.com/miniapp-service/v1.0.0/miniapps?type=webcard&postId=${postId}`
    };
    utils
      .request(requestObj)
      .then(res => {
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
      })
      .catch(() => {
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
    console.log("APPS ARE HERE ", apps);
    Array.from(apps).forEach((miniapp, index) => {
      console.log("INDIVAI : vv", miniapp);
      const miniappCard = new Card(miniapp);
      console.log("INDIVAI : vvv", miniapp);
      const node = miniappCard.render();
      console.log("INDIVAI : vvvv :", node);
      const miniappContainer = document.getElementById("app");
      miniappContainer.appendChild(node);
      miniappCard.events();
    });
  }
}

export default MiniAppContainer;
