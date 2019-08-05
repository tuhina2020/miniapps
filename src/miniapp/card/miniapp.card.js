import styles from "./card.css";
class Card {
  constructor(props) {
    this.state = {
      miniapp: props
    };
    this.render();
    this.registerEvent();
  }

  registerEvent() {
    const miniappContainer = document.getElementsByClassName(
      "miniapp-container"
    );

    const clickHandler = () => {
      var miniAppId = Number(e.target.getAttribute("data-action"));
      console.log("CLICK ON MINIAPP ", miniAppId);
      // TODO : Fire Android Action for open Miniapp
      /* Android.onAction(
          '{"action": "open_activity","type": "tag","referrer": "' +
            referrer_tag_opened +
            '","tagId": ' +
            tagId +
            "}'"
        );*/
    };

    Array.from(miniappContainer).forEach(element => {
      element.addEventListener("click", clickHandler);
    });
  }

  render() {
    const { miniapp } = this.state;
    const node = document.createElement("div");
    node.setAttribute("class", "miniapp");
    node.setAttribute("data-action", miniapp.id);

    node.innerHTML = `<div class="miniappHeader"><img class="miniappIcon" src="${
      miniapp.icon
    }"><div class="miniappHeading"><div class="miniappName">${
      miniapp.name
    }</div></div></div></div><img class='miniappImg' src='${miniapp.image}'>`;

    const miniappContainer = document.getElementById("app");
    miniappContainer.append(node);
  }
}

export default Card;
