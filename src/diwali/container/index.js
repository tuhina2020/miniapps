import * as utils from "@/utils";
import styles from "./index.css";
import base from '@/diwali/assets/base-compressed.gif';
import InputContainer from '@/diwali/input-container';
import Loader from '@/diwali/assets/loading.svg';
import _each from 'lodash/each';

class DiwaliContainer {
    constructor() {
      document.title = "ShareChat | Diwali 2019";
      this.state = {};
      this.setAuthorization();
      this.state.Authorization = utils.getAuthorization(this.state);
      this.state.appVersion = utils.getAppVersion();
      this.getFonts();
      this.render();
    }

    getFonts() {
      const fonts = ['Stoke', 'Noto+Sans'];
      _each(fonts, f => {
        const link = utils.createNewDiv({
          type: "link",
          setAttribute: {
            href: `https://fonts.googleapis.com/css?family=${f}&display=swap`,
            rel: "stylesheet"
          }
        });
        document.head.appendChild(link);
      });
    }

    setAuthorization() {
      let Authorization, appVersion, language;
      try {
        Authorization = Android.get("userInfo").replace(
          new RegExp("\n", "g"),
          "\\n"
        );
        appVersion = Android.get("appVersion");
        language = Android.get('userLang');
      } catch (e) {
        Authorization = "Sn899vpok1xqFqzneiD+Cx+kdDIWIkxq3ANl0tZm2QvMBeyQYCzPrOn7FyuCr3uDOMTrk2z9yxTz\ntao/VWPC/tm1/DTE5G7X+TzhqAqMEX/tpKLSuWryoDL5AGJujrRz5+MxFe3+03qq9cZ+y5zpNLkP\nbyVqkLSW01q2YFWri3uWCuGMBgomarQzfElZyS0vryhgMRLBbx+kD17mbAsk2UDx9kd1aDddF18G\nhGDktsUoy6fa3oulhF8iJweP08RNNcZnAATAwPiV++B6ozMRDSIeWP6NTGLZg6npE0iVHtKlFtGQ\no8ZeXlHxxutUvWr+aTMDVZT0WtnK9Uvwv4lIvA==\n".replace(
          new RegExp("\n", "g"),
          "\\n"
        );
        appVersion = 10;
        language = 'Default';
      }
      this.state.appVersion = appVersion;
      this.state.Authorization = Authorization;
      this.state.language = language;
    }

    handleError() {
      const Load = utils.createNewDiv({
          type: 'div',
          setAttribute: {
            // src: Loader,
            class: 'lds-circle'
          }
        });
      Load.innerHTML = `<div></div>`;
  
      const loadWrapper = utils.createNewDiv({
          type: 'div',
          setAttribute: {
              class: 'loading-wrapper hide-loader',
              id: 'loading-wrapper'
          }
      });

      loadWrapper.appendChild(Load);

      return loadWrapper;
    }

    getInputContainer() {
      const input = new InputContainer(this.state);
      return { ele: input, component : input.render() };
    }

    getInputError() {
      const error = utils.createNewDiv({
        type: 'div',
        setAttribute: {
            id: 'error-text',
            class: 'hide-loader'
        }
      });
      const errContainer = utils.createNewDiv({
        type: 'div',
        setAttribute: {
            id: 'error-wrapper',
            // class: 'hide-loader'
        }
      });
      errContainer.appendChild(error);
      return errContainer;
    }

    addToken() {
      const { Authorization } = this.state;
      const tokenDiv = document.createElement("div");
      tokenDiv.innerHTML = Authorization;
      const tokenHead = document.getElementById("token");
      tokenHead.appendChild(tokenDiv);
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
          src : base,
          class: 'background-video',
          id: 'background-video'
        }
      });

      // const error = utils.createNewDiv({
      //   type: 'div',
      //   setAttribute: {
      //     class: 'update-app',
      //     id: 'update-app'
      //   }
      // });
      // error.innerText = utils.APP_UPDATE_MESSAGES[language || 'Default']  + language + appVersion;

      const loader =  this.handleError();
      const { appVersion, language } = this.state;

      const { ele, component } = this.getInputContainer();
      const inputErr = this.getInputError();
      container.appendChild(gif);
      appContainer.appendChild(container);
      if(appVersion >= 4755) {
        appContainer.appendChild(inputErr);
        appContainer.appendChild(component);
        ele.events();
        appContainer.appendChild(loader);
      }
    }
}

export default DiwaliContainer;