import * as utils from "@/utils";
import { LANGUAGE_WISE_INIT_BACKGROUNDS } from "@/indiannewyear/helper"
import InputContainer from "@/common/components/BaseInputContainer";
class IndianNewYear {
	constructor() {
    document.title = "ShareChat | Indian New Year";
    this.state = {};
    this.getParams();
    this.state.Authorization = utils.getAuthorization(this.state);
		this.state.appVersion = utils.getAppVersion();
		this.state.CleverTap = utils.registerCleverTap();
		this.getFonts();
		this.render();
    // this.getZodiacs();
    console.log(this.state);
  }

  getFonts() {
    const link = utils.createNewDiv({
      type: "link",
      setAttribute: {
        href: "https://fonts.googleapis.com/css?family=Roboto&display=swap",
        rel: "stylesheet"
      }
    });
    document.head.appendChild(link);
	}

  getParams() {
    const url = new URL(document.location.href);
    this.state.language = url.searchParams.get("language") || 'Tamil';
	}

	getInputContainer() {
		
	}
	
	render() {
		const appContainer = document.getElementById("app");
		const bg = LANGUAGE_WISE_INIT_BACKGROUNDS[this.state.language];
		const container = utils.createNewDiv({
			type: "div",
			setAttribute: { class: "indian-new-year-container" }
		});
		const beforeBg = utils.createNewDiv({
			type: 'img',
			setAttribute: {
				src : bg,
				class: 'W(100%) H(a)'
			}
		});
		let input = new InputContainer();
		input = input.render();


		// const error = utils.createNewDiv({
		//   type: 'div',
		//   setAttribute: {
		//     class: 'update-app',
		//     id: 'update-app'
		//   }
		// });
		// error.innerText = utils.APP_UPDATE_MESSAGES[language || 'Default']  + language + appVersion;

		// const loader =  this.handleError();
		// const { appVersion, language } = this.state;

		// const { ele, component } = this.getInputContainer();
		// const inputErr = this.getInputError();
		container.appendChild(beforeBg);
		container.appendChild(input);
		appContainer.appendChild(container);
		// if(appVersion >= 4755) {
		// 	appContainer.appendChild(inputErr);
		// 	appContainer.appendChild(component);
		// 	ele.events();
		// 	appContainer.appendChild(loader);
		// }
	}
};

export default IndianNewYear;