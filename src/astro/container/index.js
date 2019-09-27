import ZodiacMulti from "@/astro/zodiacMulti";
import ZodiacSingle from "@/astro/zodiacSingle";
import * as utils from "@/utils";
import styles from "./index.css";
import Border from "@/astro/assets/zodiac/Border.svg";
class AstroAppContainer {
  constructor() {
    document.title = "ShareChat | Astrology";
    this.state = {};
    this.getParams();
    this.state.Authorization = utils.getAuthorization(this.state);
    this.state.appVersion = utils.getAppVersion();
    this.getFonts();
    this.getZodiacs();
    // console.log(this.state);
  }

  getFonts() {
    const link = utils.createNewDiv({
      type: "link",
      setAttribute: {
        href: "https://fonts.googleapis.com/css?family=Quicksand&display=swap",
        rel: "stylesheet"
      }
    });
    document.head.appendChild(link);
  }

  getParams() {
    const url = new URL(document.location.href);
    this.state.zodiac = parseInt(
      url.searchParams.get("zodiac") && url.searchParams.get("zodiac")
    );
    const postId = url.searchParams.get("postId");
    this.state.Referrer = `Trending_discovery_${postId}`;
    this.state.Authorization = url.searchParams.get("Authorization");
  }

  sendOpenEvent() {
    const { Authorization, Referrer } = this.state;
    const requestObj = {
      method: "POST",
      url: "https://apis.sharechat.com/miniapp-service/v1.0.0/event",
      headers: { Authorization },
      body: {
        eventName: "MiniAppOpened",
        appName: "Astrology",
        appID: "274bd6ea-9fa6-4b77-8a0c-665b816c4a8b",
        Referrer
      }
    };

    return utils
      .request(requestObj)
      .then(v => console.log(v))
      .catch(err => console.log(err));
  }

  createError(err) {
    const errContainer = utils.createNewDiv({
      type: "div",
      setAttribute: { style: "color:red;" }
    });
    errContainer.innerHTML = err;
    const container = document.getElementById("app");
    container.appendChild(errContainer);
  }

  getZodiacs() {
    // API call to get zodiac data
    const { Authorization } = this.state;

    const requestObj = {
      url:
        "https://apis.sharechat.com/miniapp-service/v1.0.0/miniapp/274bd6ea-9fa6-4b77-8a0c-665b816c4a8b/meta",
      headers: {
        Authorization
      }
    };

    utils
      .request(requestObj)
      .then(res => {
        this.state = Object.assign(this.state, res);
        this.render();
        return Promise.resolve();
      })
      .catch(err => {});
  }

  renderSingleZodiac(data) {
    const zodiac = new ZodiacSingle(data);
    const miniappContainer = document.getElementById("app");
    const Single = zodiac.render();
    miniappContainer.innerHTML = "";
    miniappContainer.appendChild(Single);
    zodiac.events();
  }

  renderMultipleZodiac(data) {
    const multi = new ZodiacMulti(data);
    const childnode = multi.render();
    multi.events(childnode);
    return childnode;
  }

  renderTitle(lang) {
    const node = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "zodiac-title" }
    });
    const SELECTION_TEXT = {
      hindi: "दैनिक राशिफल",
      english: "Select Your SunSign",
      default: "Select Your SunSign"
    };
    node.innerText =
      SELECTION_TEXT[lang.toLowerCase()] || SELECTION_TEXT["default"];
    return node;
  }

  renderZodiacGroup() {
    const {
      DailyHoroscope: { contentItem }
    } = this.state;

    const node = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "zodiac-group" }
    });

    Array.from(contentItem).forEach((sign, index) => {
      const childnode = this.renderMultipleZodiac({ ...sign, index });
      node.appendChild(childnode);
    });

    return node;
  }

  render() {
    const {
      DailyHoroscope: { contentItem, lang },
      zodiac,
      Authorization
    } = this.state;

    if (zodiac || zodiac === 0) {
      return this.renderSingleZodiac({
        ...contentItem[zodiac],
        index: zodiac,
        Authorization
      });
    }
    const appContainer = document.getElementById("app");
    const container = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "zodiac-group-container" }
    });
    const title = this.renderTitle(lang);
    const zodiacGroup = this.renderZodiacGroup();
    container.appendChild(title);
    container.appendChild(zodiacGroup);
    appContainer.appendChild(container);
    // this.sendOpenEvent();
  }
}

export default AstroAppContainer;
