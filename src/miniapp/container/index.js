import Card from "@/miniapp/card/miniapp.card.js";
import * as utils from "@/utils";
import styles from "./index.css";

class MiniAppContainer {
  constructor() {
    this.state = {
      apps: []
    };
    this.setAuthorization();
    this.events();
    this.getMiniApps();
  }

  setAuthorization() {
    let Authorization, appVersion;
    try {
      Authorization = Android.get("userInfo").replace(
        new RegExp("\n", "g"),
        "\\n"
      );
      appVersion = Android.get("appVersion");
    } catch (e) {
      Authorization = "Sn899vpok1xqFqzneiD+Cx+kdDIWIkxq3ANl0tZm2QvMBeyQYCzPrOn7FyuCr3uDOMTrk2z9yxTz\ntao/VWPC/tm1/DTE5G7X+TzhqAqMEX/tpKLSuWryoDL5AGJujrRz5+MxFe3+03qq9cZ+y5zpNLkP\nbyVqkLSW01q2YFWri3uWCuGMBgomarQzfElZyS0vryhgMRLBbx+kD17mbAsk2UDx9kd1aDddF18G\nhGDktsUoy6fa3oulhF8iJweP08RNNcZnAATAwPiV++B6ozMRDSIeWP6NTGLZg6npE0iVHtKlFtGQ\no8ZeXlHxxutUvWr+aTMDVZT0WtnK9Uvwv4lIvA==\n".replace(
        new RegExp("\n", "g"),
        "\\n"
      );
      appVersion = 10;
    }
    this.state.appVersion = appVersion;
    this.state.Authorization = Authorization;
  }

  getMiniApps() {
    const url = new URL(document.location.href);
    const postId = url.searchParams.get("postId");
    this.state.postId = postId;
    const { Authorization } = this.state;
    const requestObj = {
      url: `https://apis.sharechat.com/miniapp-service/v1.0.0/miniapps?type=webcard&postId=${postId}`,
      headers: { Authorization }
    };
    utils
      .request(requestObj)
      .then(res => {
        this.state = Object.assign(this.state, res);
        this.render();
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
      });
  }

  events() {}

  addHeader() {
    const body = document.getElementsByTagName("body")[0];
    const container = body.children[1];
    const { title } = this.state;
    const header = utils.createNewDiv({
      type: "div",
      setAttribute: { id: "header" }
    });
    const titleDiv = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "title" }
    });
    const title_text = utils.createNewDiv({
      type: "span",
      setAttribute: { id: "title-text" }
    });
    title_text.innerHTML = title;
    titleDiv.appendChild(title_text);
    header.appendChild(titleDiv);
    body.insertBefore(header, container);
  }

  renderSingleApp(app) {
    const single = new Single(app);
    const node = single.render();
    const miniappContainer = document.getElementById("app");
    miniappContainer.appendChild(node);
    single.events();
  }

  render() {
    const { apps, appVersion, postId } = this.state;
    const miniappContainer = document.getElementById("app");
    this.addHeader();
    Array.from(apps).forEach((miniapp, index) => {
      const miniappCard = new Card({ ...miniapp, appVersion, postId });
      const node = miniappCard.render();
      miniappContainer.appendChild(node);
      miniappCard.events();
    });
  }
}

export default MiniAppContainer;
