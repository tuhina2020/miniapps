import styles from "./index.css";
import * as utils from "@/utils";
import { zodiacData } from "@/astro/helpers";
import SmallBorder from "@/astro/assets/zodiac/smallborder.svg";
class ZodiacMulti {
  constructor(props) {
    const dt = new Date();
    const id = dt.setMinutes(dt.getMinutes() + Math.floor(Math.random() * 30));
    this.state = {
      data: props,
      id
    };
    document.title = "ShareChat | Astrology";
  }

  events(node) {
    const {
      data: { index }
    } = this.state;
    const clickHandler = e => utils.addOrUpdateUrlParam("zodiac", index);

    node.addEventListener("click", clickHandler);
  }

  render() {
    const {
      data: { Sunsign, index },
      id
    } = this.state;
    const ZODIAC_DATA = zodiacData(index);
    const node = utils.createNewDiv({
      type: "div",
      setAttribute: {
        class: "zodiac-multi",
        style: `background-image:url(${SmallBorder});background-size: cover;`,
        "data-action": Sunsign
      }
    });

    node.innerHTML = `<div id=${id} class='sunsign'><img src = ${
      ZODIAC_DATA.image
    } class='zodiac-img'><div class='outer-sign'><div class='zodiac-text'>${Sunsign}</div><div class='zodiac-date'>${
      ZODIAC_DATA.start
    } - ${ZODIAC_DATA.end}</div></div></div>`;

    return node;
  }
}

export default ZodiacMulti;
