import * as utils from "@/utils";
import { LANGUAGE_WISE_INIT_BACKGROUNDS, INPUT_WRAPPER_CLASS, EXCEL_DATA } from "@/indiannewyear/helper"
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer"
import { setUserName, toggleSharedState } from '@/indiannewyear/actions';

class IndianNewYear {
	constructor({ store }) {
    document.title = "ShareChat | Indian New Year";
    this.state = {
			store: store
		};
		console.log(store.getState())
    this.getParams();
    this.state.Authorization = utils.getAuthorization(this.state);
		this.state.appVersion = utils.getAppVersion();
		this.state.CleverTap = utils.registerCleverTap();
		this.getData();
		this.getFonts();
		this.render();
    // this.getZodiacs();
    console.log(this.state);
	}
	
	getData() {
		utils.getDataExcel(EXCEL_DATA).then(data => {
			this.state.textData = data.filter(d => d.language === this.state.language)[0];
		});
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

	textBox1() {
		console.log('this.state.textData ', this.state.textData);
		let textBox = new BaseTextContainer({ text: this.state.textData["text1"] });
		textBox = textBox.render();
		return textBox;
	}

	render() {
		const appContainer = document.getElementById("app");
		const { language, store } = this.state;
		const bg = LANGUAGE_WISE_INIT_BACKGROUNDS[language];
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
		const styleClassesObj = INPUT_WRAPPER_CLASS[language] || INPUT_WRAPPER_CLASS['default'];
		let input = new InputContainer({ store, setUserName, ...styleClassesObj });
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
		// container.appendChild(textBox);
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