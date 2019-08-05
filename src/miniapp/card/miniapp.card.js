import styles from "./card.css";
class Card {
  constructor(props) {
    this.state = {
      miniapp: props
    };
    this.render();
    this.events();
  }

  events() {
    const {
      miniapp: { index }
    } = this.state;
    const miniappContainer = document.getElementsByClassName("miniapp")[index];
    console.log(miniappContainer, "LOL ");
    const clickHandler = e => {
      var miniAppId = e.target.getAttribute("class");
      console.log("CLICK ON MINIAPP ", miniAppId, e.target);
      // TODO : Fire Android Action for open Miniapp
      /* Android.onAction(
          '{"action": "open_activity","type": "tag","referrer": "' +
            referrer_tag_opened +
            '","tagId": ' +
            tagId +
            "}'"
        );*/
    };

    miniappContainer.addEventListener("click", clickHandler);
  }

  render() {
    const { miniapp } = this.state;
    const node = document.createElement("div");
    node.setAttribute("class", "miniapp");
    node.setAttribute("data-action", miniapp.index);

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
