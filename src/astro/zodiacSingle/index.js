import styles from "./index.css";
import * as utils from "@/utils";
import BorderTop from "@/astro/assets/zodiac/BorderTop.svg";
import BorderBottom from "@/astro/assets/zodiac/BorderBottom.svg";

class ZodiacSingle {
  constructor(props) {
    this.state = {
      data: props
    };
  }

  events() {
    console.log("REGISTERING EVENTS");
    const parent = document.getElementsByClassName("zodiac-parent")[0];
    const ele = document.getElementsByClassName("zodiac-content-container")[0];
    parent.onscroll = e => {
      console.log(`PARENT SCROLL : ${e.target.scrollTop}`);
      ele.scroll();
    };
    ele.onscroll = e => {
      console.log(`CONTENT SCROLL : ${e.target.scrollTop}`);
      console.log("THIS IS ME : ");
    };
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

    return parent;
  }
}

export default ZodiacSingle;
