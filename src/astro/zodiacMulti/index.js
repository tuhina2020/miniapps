import styles from "./index.css";
import ZodiacSingle from "@/astro/zodiacSingle";
import { zodiacData } from "@/utils";
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
    // const miniappContainer = document.getElementById("app");
    const {
      data: { index }
    } = this.state;
    const clickHandler = e => {
      window.location.href = `?zodiac=${index}`;
      // const zodiac = new ZodiacSingle(this.state.data);
      // const Single = zodiac.render();
      // miniappContainer.innerHTML = "";
      // console.log("WE ARE HERE TO CLICK : ", Single);
      // miniappContainer.appendChild(Single);
      // zodiac.events();
    };
    node.addEventListener("click", clickHandler);
  }

  render() {
    const {
      data: { Sunsign, index },
      id
    } = this.state;
    const ZODIAC_DATA = zodiacData(index);
    const node = document.createElement("div");
    node.setAttribute("class", "zodiac-multi");
    node.setAttribute("data-action", Sunsign);
    node.innerHTML = `<div id=${id} class='sunsign'><img src = ${
      ZODIAC_DATA.image
    } class='zodiac-img'><div class='outer-sign'><div class='zodiac-text'>${Sunsign}</div><div class='zodiac-date'>${
      ZODIAC_DATA.start
    } - ${ZODIAC_DATA.end}</div></div></div>`;
    return node;
  }
}

export default ZodiacMulti;
