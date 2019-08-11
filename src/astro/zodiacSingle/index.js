import styles from "./index.css";
import { zodiacData } from "@/utils";

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
    const contentNode = document.createElement("div");
    contentNode.setAttribute("class", "zodiac-content-container");
    categories.forEach(category => {
      const node = document.createElement("div");
      node.setAttribute("class", "zodiac-content");
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
    const ZODIAC_DATA = zodiacData(index);
    console.log("CREATING SINGLE : ", index, ZODIAC_DATA);
    const node = document.createElement("div");
    const contentNode = this.renderContent();
    node.setAttribute("class", "zodiac-single");
    node.innerHTML = `<div id=${Sunsign} class='zodiac-single-container' ><img src = ${
      ZODIAC_DATA.image
    } class='zodiac-single-img'><div class='zodiac-name'>${Sunsign}</div></div>`;
    node.appendChild(contentNode);
    return node;
  }
}

export default ZodiacSingle;
