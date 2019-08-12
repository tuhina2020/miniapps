import styles from "./index.css";
import ZodiacSingle from "@/astro/zodiacSingle";
import { zodiacData } from "@/utils";
import SmallBorder from "@/astro/assets/zodiac/smallborder.svg";
class ZodiacMulti {
  constructor(props) {
    const dt = new Date();
    const id = dt.setMinutes(dt.getMinutes() + Math.floor(Math.random() * 30));
    this.state = {
      data: props,
      id
    };
  }

  events(node) {
    const {
      data: { index }
    } = this.state;
    const clickHandler = e => (window.location.href = `?zodiac=${index}`);
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
