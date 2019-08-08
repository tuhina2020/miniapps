import ZodiacMulti from "@/astro/zodiacMulti";
import * as utils from "@/utils";
import styles from "./index.css";
class AstroAppContainer {
  constructor() {
    this.state = {};
    this.getZodiacs();
  }

  getZodiacs() {
    // API call to get zodiac data
    const requestObj = {
      url:
        "https://apis.sharechat.com/miniapp-service/v1.0.0/miniapps/274bd6ea-9fa6-4b77-8a0c-665b816c4a8b/meta"
    };
    utils.request(requestObj).then(res => {
      console.log(res, "this is it");
      this.state = res;
      this.render();
      this.events();
      return Promise.resolve();
    });
  }

  events() {}

  render() {
    const { contentItem } = this.state;
    Array.from(contentItem).forEach((sign, index) => {
      const multi = new ZodiacMulti({ ...sign, index });
      const node = multi.render();
      multi.events();
      const appContainer = document.getElementById("app");
      appContainer.append(node);
    });
  }
}

export default AstroAppContainer;
