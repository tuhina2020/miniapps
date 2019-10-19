import * as utils from "@/utils";
import styles from "./index.css";
import base from '@/diwali/assets/base-compressed.gif';
import InputContainer from '@/diwali/input-container';

class DiwaliContainer {
    constructor() {
      document.title = "ShareChat | Diwali 2019";
      this.state = {};
      // this.getParams();
      this.state.Authorization = utils.getAuthorization(this.state);
      this.state.appVersion = utils.getAppVersion();
      // this.getFonts();
      this.render();
      console.log(this.state);
    }

    getScripts() {
      
    }

    getInputContainer() {
      const container = utils.createNewDiv({
        type: "div",
        setAttribute: { class: "diwali-input-container" }
      });

      const input = new InputContainer(this.state);
      return { ele: input, component : input.render() };
    }

    render() {
      const appContainer = document.getElementById("app");
      const container = utils.createNewDiv({
        type: "div",
        setAttribute: { class: "diwali-container" }
      });
      const gif = utils.createNewDiv({
        type: 'img',
        setAttribute: {
          src : base
        }
      });

      const { ele, component } = this.getInputContainer();
      container.appendChild(gif);
      appContainer.appendChild(container);
      appContainer.appendChild(component);
      ele.events();
    }
}

export default DiwaliContainer;