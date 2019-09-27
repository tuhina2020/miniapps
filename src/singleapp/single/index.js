import styles from "./index.css";
import * as utils from "@/utils";
class SingleApp {
  constructor(props) {
    this.state = props;
  }

  events() {
    const { id, link, appVersion, name, icon, postId, referrer } = this.state;
    console.log(this.state, "INSIDE EVENTS");
    const button = document.getElementById(id);
    const clickHandler = e => {
      let json;
      if (appVersion >= 4698) {
        json = {
          type: "launch_mini_app",
            // id === "4349eaf0-b308-4ba1-9b9b-c3d8c4a220ee"
            //   ? "launch_wallpaper_app"
            //   : "launch_mini_app",
          miniAppData: {
            miniAppId: id,
            miniAppName: name,
            miniAppReferrer: referrer,
            miniAppIconUrl: icon,
            miniAppPwaUrl: link
          }
        };
      } else {
        json = {
          type: "web_post",
          webUrl: link,
          postId: "-12"
        };
        this.sendOpenEvent();
      }
      console.log(json);
      Android.onAction(JSON.stringify(json));
    };

    button.addEventListener("click", clickHandler);
  }

  sendOpenEvent() {
    const { id, postId, name, Authorization, referrer } = this.state;
    const requestObj = {
      method: "POST",
      url: "https://apis.sharechat.com/miniapp-service/v1.0.0/event",
      headers: { Authorization },
      body: {
        eventName: "MiniAppOpened",
        appName: name,
        appId: id,
        referrer: referrer ? referrer : `Webpost_${postId}`
      }
    };

    return utils
      .request(requestObj)
      .then(v => console.log(v))
      .catch(err => console.log(err));
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
