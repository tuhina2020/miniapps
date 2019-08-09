import styles from "./index.css";
// import ZodiacSingle from "@/astro/zodiacSingle";

class ZodiacMulti {
  constructor(props) {
    this.state = {
      data: props
    };
    console.log("THIS IS MULT STATE 1", this.state);
  }

  events() {
    // const {
    //   data: { Sunsign }
    // } = this.state;
    // const astroContainer = document.getElementsById(Sunsign);
    // const miniappContainer = document.getElementById("app");
    // const clickHandler = e => {
    //   const zodiac = new ZodiacSingle(this.state.data);
    //   const node = zodiac.render();
    //   miniappContainer.appendChild(node);
    //   zodiac.events();
    // };
    // astroContainer.addEventListener("click", clickHandler);
  }

  render() {
    const {
      data: { Sunsign, icon }
    } = this.state;
    console.log("CREATING MULTI CHILD 1", Sunsign);
    const node = document.createElement("div");
    node.setAttribute("class", "zodiac-multi");
    node.setAttribute("data-action", Sunsign);

    node.innerHTML = `<div id=${Sunsign} class='sunsign'><div>${Sunsign}</div><img src = ${icon}></div>`;
    return node;
  }
}

export default ZodiacMulti;
