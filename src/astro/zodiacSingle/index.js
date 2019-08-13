import styles from "./index.css";
import * as utils from "@/utils";
import BorderTop from "@/astro/assets/zodiac/BorderTop.svg";
import BorderBottom from "@/astro/assets/zodiac/BorderTop.svg";

class ZodiacSingle {
  constructor(props) {
    this.state = {
      data: props
    };
  }

  events() {}

  renderContent() {
    const {
      data: { categories }
    } = this.state;

    const contentNode = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-content-container"
      }
    });

    categories.forEach(category => {
      const node = utils.createNewDiv({
        type: "div",
        setAttribute: { class: "zodiac-content" }
      });
      node.innerHTML = `<div class='category-name'>${
        category.category_name
      } </div><div class='category-description'> ${
        category.description
      } </div>`;
      contentNode.appendChild(node);
    });

    return contentNode;
  }

  render() {
    const {
      data: { Sunsign, index, categories }
    } = this.state;
    const ZODIAC_DATA = utils.zodiacData(index);
    const contentNode = this.renderContent();

    const parent = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-parent"
        // style: `background:url(${BorderTop}) no-repeat;background-size: contain;`
      }
    });

    const header = utils.createNewDiv({
      type: "div",
      setAttribute: {
        style: `background:url(${BorderTop}) no-repeat center; width: 100%;background-size: contain;height: 30vw;position: fixed;top: 11.11vw;`
      }
    });

    const footer = utils.createNewDiv({
      type: "div",
      setAttribute: {
        style: `background:url(${BorderBottom}) no-repeat center;width: 100%;height: 30vw;background-size: contain;position: fixed;top: 11.11vw;left: 0;`
      }
    });

    const zodiacContent = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-single"
        // style: `background:url(${Border}) no-repeat center;background-size: contain;`
      }
    });

    zodiacContent.innerHTML = `<div class='zodiac-title-date'>${new Date()
      .toString()
      .slice(
        4,
        10
      )}</div><div id=${Sunsign} class='zodiac-single-container' ><img src = ${
      ZODIAC_DATA.image
    } class='zodiac-single-img' ><div class='zodiac-name'>${Sunsign}</div></div>`;
    parent.appendChild(header);
    parent.appendChild(zodiacContent);
    parent.appendChild(contentNode);
    // parent.appendChild(footer);

    return parent;
  }
}

export default ZodiacSingle;
