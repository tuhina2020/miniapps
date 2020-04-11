import { createNewDiv, getAuthorization, getAppVersion, registerCleverTap, getDataExcel, addComponents } from "@/utils";
import { LANGUAGE_WISE_INIT_BACKGROUNDS, INPUT_WRAPPER_CLASS, EXCEL_DATA, ENTER_BUTTON_CLASS } from "@/indiannewyear/helper"
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer"
import { setUserName, toggleSharedState, setLanguage, setText1, setText2 } from '@/indiannewyear/actions';

class IndianNewYear {
	constructor({ store }) {
    document.title = "ShareChat | Indian New Year";
    this.state = {
			store: store
		};
    this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		this.state.CleverTap = registerCleverTap();
		this.getFonts();
	}

	registerComponents() {
		console.log('got data, register');
		const { text1, text2, username } = this.getReduxState();
		const { language } = this.state;
		this.$container = createNewDiv({
			type: "div",
			setAttribute: { class: "indian-new-year-container" }
		});
		this.$beforeBg = language && createNewDiv({
			type: 'img',
			setAttribute: {
				src : LANGUAGE_WISE_INIT_BACKGROUNDS[language],
				class: 'W(100%) H(a)'
			}
		});
		this.$input = this.userInput();
		this.$enterButton = this.enterButton();
		this.$textBox1 = this.textBox(text1);
		// this.$textBox2 = this.textBox(text2);
	}

	// updateStore(store) {
	// 	this.state.store = store;
	// }
	
	getData() {
		return getDataExcel(EXCEL_DATA).then(data => {
			const { text1, text2, language } = data.filter(d => d.language === this.state.language)[0];
			this.state.store.dispatch(setText1(text1));
			this.state.store.dispatch(setText2(text2));
			console.log('got data');
		});
	}

  getFonts() {
    const link = createNewDiv({
      type: "link",
      setAttribute: {
        href: "https://fonts.googleapis.com/css?family=Roboto&display=swap",
        rel: "stylesheet"
      }
    });
    document.head.appendChild(link);
	}

	getReduxState() {
		return this.state.store.getState();
	}

  getParams() {
    const url = new URL(document.location.href);
		this.state.language = url.searchParams.get("language") || 'Tamil';
	}

	addStore(params) {
		return { store: this.state.store, ...params };
	}

	enterButton() {
		// console.log('this.state.textData ', this.state.textData);
		let textBox = new BaseTextContainer(this.addStore({ text: "ENTER", ...ENTER_BUTTON_CLASS["default"], clickHandler: toggleSharedState }));
		textBox = textBox.render();
		return textBox;
	}

	textBox(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			focus: true,
			...ENTER_BUTTON_CLASS["default"],
			clickHandler: () => {}
		}));
		console.log('this.state.textData ', text);
		textBox = textBox.render();
		return textBox;
	}

	userInput() {
		const { language } = this.state;
		const styleClassesObj = INPUT_WRAPPER_CLASS[language] || INPUT_WRAPPER_CLASS['default'];
		let input = new InputContainer(this.addStore({ inputHandler: setUserName, ...styleClassesObj, text: this.getReduxState().username }));
		input = input.render();
		return input;
	}

	render() {
		const appContainer = document.getElementById("app");
		addComponents({ components : [this.$beforeBg, this.$textBox1, this.$input, this.$enterButton], container : this.$container });
		addComponents({ components : [this.$container], container :  appContainer});
	}

	update() {
		input.update();
		enterButton.update();
		textBox1.update()
	}
};

export default IndianNewYear;