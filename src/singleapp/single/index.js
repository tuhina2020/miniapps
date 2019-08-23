import styles from "./index.css";
import * as utils from "@/utils";
class SingleApp {
  constructor(props) {
    this.state = props;
  }

  events() {
    const { id, link, appVersion, name, icon, postId } = this.state;
    console.log(this.state, "INSIDE EVENTS");
    const button = document.getElementById(id);
    const clickHandler = e => {
      let json;
      if (appVersion >= 4731) {
        json = {
          type: "launch_mini_app",
          miniAppData: {
            miniAppId: id,
            miniAppName: name,
            miniAppReferrer: `Webpost_${postId}`,
            miniAppIconUrl: icon,
            miniAppPwaUrl: link
          }
        };
      } else
        json = {
          type: "web_post",
          webUrl: link,
          postId: "-12"
        };
      console.log(json);
      Android.onAction(JSON.stringify(json));
    };

    button.addEventListener("click", clickHandler);
  }

  render() {
    const {
      squareIcon,
      button: {
        color: { background, text: textColor },
        text
      },
      id
    } = this.state;
    const node = utils.createNewDiv({
      type: "div",
      setAttribute: { class: "single-container", id }
    });

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
        style: `background:#${background};color:#${textColor}`
      }
    });
    cta.innerText = text;
    node.appendChild(img);
    node.appendChild(cta);
    return node;
  }
}

export default SingleApp;
