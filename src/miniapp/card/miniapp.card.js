import styles from "./card.css";
class Card {
  constructor(props) {
    console.log("APPS ARE HERE 1", props);
    this.state = {
      miniapp: props
    };
    console.log("APPS ARE HERE 2", this.state);
    this.events();
  }

  events() {
    console.log("APPS ARE HERE 3", this.state.miniapp);
    const {
      miniapp: { id }
    } = this.state;
    console.log("APPS ARE HERE 4", miniapp);
    const miniappContainer = document.getElementsById(id);
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
    node.setAttribute("id", miniapp.id);

    node.innerHTML = `<div class="miniappHeader"><img class="miniappIcon" src="${
      miniapp.icon
    }"><div class="miniappHeading"><div class="miniappName">${
      miniapp.name
    }</div></div></div></div><img class='miniappImg' src='${miniapp.image}'>`;

    return node;
  }
}

export default Card;
