import { createNewDiv, getAuthorization, getAppVersion, registerCleverTap, getDataExcel, addComponents } from "@/utils";
import {
	LANGUAGE_WISE_INIT_BACKGROUNDS,
	INPUT_WRAPPER_CLASS,
	EXCEL_DATA,
	ENTER_BUTTON_CLASS,
	TEXT_BOX_CLASS,
	NAME_BOX_CLASS,
	TEXT_BOX2_CLASS,
	FINAL_BG,
	SHARECHAT_ICON
} from "@/easter/helper"
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import BaseSharechatIcon from "@/common/components/BaseSharechatIcon";
import BaseWhatsappContainer from "@/common/components/BaseWhatsappContainer";
import { setUserName, toggleSharedState, setLanguage, setText1, setText2, setText3 } from '@/easter/actions';

class Easter {
	constructor({ store }) {
    document.title = "ShareChat | Indian New Year";
    this.state = {
			store: store
		};
		console.log('EASTER');
    this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		// this.state.CleverTap = registerCleverTap();
		this.getFonts();
		this.clickHandler = this.clickHandler.bind(this);
		this.refresh = this.refresh.bind(this);
		this.eventHandler = this.eventHandler.bind(this);
	}

	registerComponents() {
		console.log('got data, register');
		const { user: { text1, text2, text3, username } } = this.getReduxState();
		const { language } = this.state;
		this.$container = createNewDiv({
			type: "div",
			setAttribute: { class: "indian-new-year-container" }
		});
		this.$beforeBg = language && createNewDiv({
			type: 'img',
			setAttribute: {
				src : LANGUAGE_WISE_INIT_BACKGROUNDS["default"],
				class: 'W(100%) H(a)'
			}
		});
		this.$afterBg = createNewDiv({
			type: 'img',
			setAttribute: {
				src : FINAL_BG['default'],
				class: 'W(100%) H(a)'
			}
		});
		this.$content = createNewDiv({
			type: "div",
			setAttribute: { class: "Pos(a) D(f) Fld(c) Ai(c) Jc(c) T(0) Px(17%)" }
		});

		this.$content2 = createNewDiv({
			type: "div",
			setAttribute: { class: "Mt(40%) Pos(a) D(f) Fld(c) Ai(c) Jc(c) T(0) Px(17%)" }
		});
		this.$input = this.userInput();
		this.$enterButton = this.enterButton();
		this.$textBox1 = this.textBox(text1);
		this.$textBox2 = this.textBox2(text2);
		this.$textBox3 = this.textBox3(text3);
		this.$sharechatIcon = BaseSharechatIcon({
			wrapperClass: "Pos(a) T(90vw) W(20%)"
			// wrapperClass: 'Mt(5vw)'
		});
		this.$share = BaseWhatsappContainer({
			wrapperClass: "D(f) Pos(a) T(77vw)",
			// wrapperClass: "Pos(a) T(82vw) W(20vw) Mx(30vw) D(f)",
			Authorization: this.state.Authorization,
			refreshHandler: this.refresh,
			eventHandler: this.eventHandler
		});
	}

	eventHandler(data) {
			//covidc_shared event
			// const { CleverTap, language, Authorization, webcardName } = this.state
			// this.state.CleverTap.sendEvent("ceaster_shared_" + webcardName, {
			// 		language,
			// 		token : Authorization,
			// 		name
			// })
			// let payload = {
			// 		type: "shareWebCard",
			// 		postId: data.PostDetails.postId
			// };
			// window.Android.onAction(JSON.stringify(payload));
	}
	
	getData() {
		return getDataExcel(EXCEL_DATA).then(data => {
			const { text1, text2, text3, language } = data.filter(d => d.language === this.state.language)[0];
			this.state.store.dispatch(setText1(text1));
			this.state.store.dispatch(setText2(text2));
			this.state.store.dispatch(setText3(text3));
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
		this.state.webcardName = url.searchParams.get("webcardName");
	}

	addStore(params) {
		return { store: this.state.store, ...params };
	}

	enterButton() {
		// console.log('this.state.textData ', this.state.textData);
		let textBox = new BaseTextContainer(this.addStore({
			text: "ENTER",
			...ENTER_BUTTON_CLASS["default"],
			clickHandler: this.clickHandler
		}))
		textBox = textBox.render();
		return textBox;
	}

	refresh() {
		this.state.store.dispatch(toggleSharedState());
	}

	clickHandler() {
		const { user: { username } } = this.getReduxState();
		this.$nameBox = this.nameBox(username);
		this.state.store.dispatch(toggleSharedState());
		this.render();
	}

	textBox(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			...TEXT_BOX_CLASS["default"]
		}));
		textBox = textBox.render();
		return textBox;
	}

	textBox2(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			...TEXT_BOX2_CLASS["default"]
		}));
		textBox = textBox.render();
		return textBox;
	}

	textBox3(text) {
		const { language } = this.state;
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			wrapperClass: language==='Malayalam' ?  "Mt(28vw)" : "Mt(40vw)",
			textBoxClass: "Ff($ffroboto) Fw(500) Fz(12px) Lh(14px) C(#3F270F) Ta(c) C(#956304)"
		}));
		textBox = textBox.render();
		return textBox;
	}

	nameBox(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			wrapperClass: "Mt(2vw)",
			// wrapperClass: "Pos(a) T(72vw) W(50%) Mx(25%)",
			textBoxClass: "Ff($ffroboto) Fw(700) Fz(16px) Lh(19px) C(#3F270F) Ta(c)"
		}));
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
		const { user: { shared } } = this.getReduxState();
		console.log('SHARED ', shared, this.$container);
		// this.update();
		if( !this.$container) return;
		if (shared) {
			this.$container.innerHTML = ''
			addComponents({ components: [this.$textBox2, this.$textBox3, this.$nameBox, this.$share, this.$sharechatIcon], container: this.$content })
			addComponents({ components : [this.$afterBg, this.$content], container : this.$container });
		} else {
			this.$container.innerHTML = ''
			addComponents({ components: [this.$textBox1, this.$input, this.$enterButton, this.$sharechatIcon], container: this.$content2 })
			addComponents({ components : [this.$beforeBg, this.$content2], container : this.$container });
		}
		addComponents({ components : [this.$container], container :  appContainer});
	}

};

export default Easter;