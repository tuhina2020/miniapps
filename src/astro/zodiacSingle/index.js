import styles from "./index.css";
import * as utils from "@/utils";
import BorderTop from "@/astro/assets/zodiac/BorderTop.svg";
import BorderBottom from "@/astro/assets/zodiac/BorderBottom.svg";

class ZodiacSingle {
  constructor(props) {
    console.log(props, " SINGLE ZODIAC");
    this.state = {
      data: props
    };
  }

  events() {}

  sendOpenEvent() {
    const {
      data: { Authorization, index }
    } = this.state;
    const requestObj = {
      method: "POST",
      url: "https://apis.sharechat.com/miniapp-service/v1.0.0/event",
      headers: { Authorization },
      body: {
        eventName: "horoscopeOpened",
        appName: "Astrology",
        appID: "274bd6ea-9fa6-4b77-8a0c-665b816c4a8b",
        ID: utils.zodiacData(index) && utils.zodiacData(index).name
      }
    };
    return utils
      .request(requestObj)
      .then(v => console.log(v))
      .catch(err => console.log(err));
  }

  renderContent() {
    const {
      data: { Sunsign, categories, index }
    } = this.state;
    const ZODIAC_DATA = utils.zodiacData(index);
    const contentParentNode = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-content-parent"
      }
    });

    const contentNode = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-content-container"
      }
    });

    const zodiacContent = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-single"
        // style: `background:url(${Border}) no-repeat center;background-size: contain;`
      }
    });

    zodiacContent.innerHTML = `<div id=${Sunsign} class='zodiac-single-container' ><img src = ${
      ZODIAC_DATA.image
    } class='zodiac-single-img' ><div class='zodiac-name'>${Sunsign}</div></div>`;

    categories.forEach((category, index) => {
      const node = utils.createNewDiv({
        type: "div",
        setAttribute: {
          class: "zodiac-content",
          style:
            index === categories.length - 1 ? "padding-bottom:25vw;" : undefined
        }
      });
      node.innerHTML = `<div class='category-name'>${
        category.category_name
      } </div><div class='category-description'> ${
        category.description
      } </div>`;
      contentNode.appendChild(node);
    });

    contentParentNode.appendChild(zodiacContent);

    contentParentNode.appendChild(contentNode);

    return contentParentNode;
  }

  renderBorders() {
    const header = utils.createNewDiv({
      type: "div",
      setAttribute: {
        id: "header-fancy",
        style: `background:url(${BorderTop}) no-repeat center; width: 100%;background-size: contain;height: 30vw;position: fixed;top: 0;`
      }
    });

    const footer = utils.createNewDiv({
      type: "div",
      setAttribute: {
        id: "footer-fancy",
        style: `background:url(${BorderBottom}) no-repeat center; width: 100%;background-size: contain;height: 30vw;position: fixed;bottom: 0;`
      }
    });

    const titleDate = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-title-date"
      }
    });

    titleDate.innerHTML = new Date().toString().slice(4, 10);

    const borderDiv = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-side-borders"
      }
    });

    const marginContainer = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "staticBars"
      }
    });

    marginContainer.appendChild(header);
    marginContainer.appendChild(titleDate);
    marginContainer.appendChild(borderDiv);
    marginContainer.appendChild(footer);
    return marginContainer;
  }

  render() {
    const contentNode = this.renderContent();

    const parent = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-parent"
        // style: `background:url(${BorderTop}) no-repeat;background-size: contain;`
      }
    });

    const marginContainer = this.renderBorders();

    parent.appendChild(marginContainer);
    parent.appendChild(contentNode);
    this.sendOpenEvent();
    return parent;
  }
}

export default ZodiacSingle;
