import styles from "./index.css";
import * as utils from "@/utils";
class SingleApp {
  constructor(props) {
    this.state = props;
  }

  events() {}

  render() {
    const {
      squareIcon,
      button: {
        color: { background },
        text
      }
    } = this.state;
    const node = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "single-container" }
    });

    // console.log(this.state, "INSIDE SINGLE MINIAPP SWQUARE");

    const img = utils.createNewDiv({
      type: "img",
      setAttribute: {
        src: squareIcon,
        style: "width:100%;"
      }
    });

    const cta = utils.createNewDiv({
      type: "button",
      setAttribute: {
        class: "cta-container",
        style: `background:#${background};`
      }
    });
    cta.innerText = text;
    node.appendChild(img);
    node.appendChild(cta);
    return node;
  }
}

export default SingleApp;
