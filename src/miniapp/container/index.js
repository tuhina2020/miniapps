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
    utils.request(requestObj).then(res => {
      this.state = res;
      this.render();
      return Promise.resolve();
    });
  }

  events() {}

  addHeader() {
    const { title } = this.state;
    const header = document.getElementById("header");
    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class", "title");
    const title_text = document.createElement("span");
    title_text.setAttribute("class", "title-text");
    title_text.innerHTML = title;
    titleDiv.appendChild(title_text);
    header.appendChild(titleDiv);
  }

  render() {
    const { apps } = this.state;
    const miniappContainer = document.getElementById("app");
    Array.from(apps).forEach((miniapp, index) => {
      const miniappCard = new Card(miniapp);
      const node = miniappCard.render();
      miniappContainer.appendChild(node);
      miniappCard.events();
    });
    this.addHeader();
  }
}

export default MiniAppContainer;
