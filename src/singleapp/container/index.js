import Single from "@/singleapp/single";
import * as utils from "@/utils";
import styles from "./index.css";

class SingleAppContainer {
  constructor() {
    this.state = {
      apps: []
    };
    // this.setAuthorization();
    this.getParams();
    this.state.Authorization = utils.getAuthorization(this.state);
    this.state.appVersion = utils.getAppVersion();
    this.events();
    this.getMiniApps();
  }

  getParams() {
    const url = new URL(document.location.href);
    this.state.postId = url.searchParams.get("postId");
    this.state.Authorization = url.searchParams.get("Authorization");
  }

  getMiniApps() {
    const { Authorization, postId } = this.state;
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

  // addToken() {
  //   const { appVersion } = this.state;
  //   const tokenDiv = document.createElement("div");
  //   tokenDiv.innerHTML = appVersion;
  //   const tokenHead = document.getElementById("token");
  //   tokenHead.appendChild(tokenDiv);
  // }

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

  renderSingleApp(app) {
    const single = new Single(app);
    const node = single.render();
    const miniappContainer = document.getElementById("app");
    // this.addToken();
    miniappContainer.appendChild(node);
    single.events();
  }

  render() {
    const { apps, appVersion, postId } = this.state;
    // const miniappContainer = document.getElementById("app");
    return this.renderSingleApp({ ...apps[0], postId, appVersion });
  }
}

export default SingleAppContainer;
