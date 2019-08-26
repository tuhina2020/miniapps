import styles from "./card.css";
class Card {
  constructor(props) {
    this.state = {
      miniapp: props
    };
  }

  events() {
    const {
      miniapp: { id, link, appVersion, name, icon, postId, fullScreen }
    } = this.state;
    const miniappContainer = document.getElementById(id);
    const clickHandler = e => {
      let json;
      if (fullScreen === "1") {
        json = {
          type: "launch_mini_app",
          miniAppData: {
            miniAppId: id,
            miniAppName: name,
            miniAppReferrer: `Trending_discovery_${postId}`,
            miniAppIconUrl: icon,
            miniAppPwaUrl: link
          }
        };
      } else
        json = {
          type: "web_post",
          webUrl: link,
          postId: "-11"
        };
      console.log(json);
      Android.onAction(JSON.stringify(json));
    };

    miniappContainer.addEventListener("click", clickHandler);
  }

  render() {
    const { miniapp } = this.state;
    const node = document.createElement("div");
    node.setAttribute("class", "miniapp");
    node.setAttribute("id", miniapp.id);

    node.innerHTML = `<div class="miniappHeader"><img class="miniappIcon" src="${miniapp.icon}"><div class="miniappHeading"><div class="miniappName">${miniapp.name}</div></div></div></div><img class='miniappImg' src='${miniapp.image}'>`;

    return node;
  }
}

export default Card;
