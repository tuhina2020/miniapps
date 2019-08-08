import styles from "./index.css";
import ZodiacSingle from "@/astro/zodiacSingle";

class ZodiacMulti {
  constructor(props) {
    this.state = {
      data: props
    };
  }

  events() {
    const {
      data: { Sunsign }
    } = this.state;
    const astroContainer = document.getElementsById(Sunsign);
    const miniappContainer = document.getElementById("app");
    const clickHandler = e => {
      const zodiac = new ZodiacSingle(this.state.data);
      const node = zodiac.render();
      miniappContainer.appendChild(node);
      zodiac.events();
    };

    astroContainer.addEventListener("click", clickHandler);
  }

  render() {
    const {
      data: { Sunsign }
    } = this.state;
    const node = document.createElement("div");
    node.setAttribute("class", "zodiac-multi");
    node.setAttribute("data-action", Sunsign);

    node.innerHTML = `<div id=${Sunsign}></div>`;
    return node;
  }
}

export default ZodiacMulti;
