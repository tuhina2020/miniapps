import styles from "./index.css";
import ZodiacSingle from "@/astro/zodiacSingle";

class ZodiacMulti {
  constructor(props) {
    this.state = {
      data: props
    };
    this.events();
  }

  events() {
    const {
      data: { Sunsign }
    } = this.state;
    const astroContainer = document.getElementsById(Sunsign);
    console.log(astroContainer, "LOL ");
    const clickHandler = e => {
      var miniAppId = e.target.getAttribute("class");
      return new ZodiacSingle(this.state.data);
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
