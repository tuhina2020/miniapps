import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	registerCleverTap,
	getDataExcel,
	addComponents,
	bigQueryEvent
} from "@/utils";
import {
	LANGUAGE_WISE_INIT_BACKGROUNDS,
	INPUT_WRAPPER_CLASS,
	EXCEL_DATA,
	ENTER_BUTTON_CLASS,
	TEXT_BOX_CLASS,
	NAME_BOX_CLASS,
	TEXT_BOX2_CLASS,
	WHATSAPP_CLASS,
	LANGUAGE_WISE_FINAL_BACKGROUNDS,
	PLACEHOLDER
} from "@/indiannewyear/helper2"
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import BaseSharechatIcon from "@/common/components/BaseSharechatIcon";
import BaseWhatsappContainer from "@/common/components/BaseWhatsappContainer";
import { setUserName, toggleSharedState, setLanguage, setText1, setText2, setTagId, setTagName, setNamePos } from '@/common/actions/TemplateUserForm';

class IndianNewYear {
	constructor({ store }) {
    document.title = "ShareChat | Indian New Year";
    this.state = {
			store: store
		};
		this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		this.getFonts();
		this.clickHandler = this.clickHandler.bind(this);
		this.refresh = this.refresh.bind(this);
		this.eventHandler = this.eventHandler.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
	}

	registerComponents() {
		console.log('got data, register');
		const { user: { text1, text2, username, tagId, tagName } } = this.getReduxState();
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
		this.$afterBg = createNewDiv({
			type: 'img',
			setAttribute: {
				src : LANGUAGE_WISE_FINAL_BACKGROUNDS[language],
				class: 'W(100%) H(a)'
			}
		});
		this.$content = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgi(url("${LANGUAGE_WISE_FINAL_BACKGROUNDS[language]}")) Bgr(nr) Bgz(ct) H(100vw)`,
				style: `background-image:url(${LANGUAGE_WISE_FINAL_BACKGROUNDS[language]})`
			}
		});

		this.$content2 = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgi(url("${LANGUAGE_WISE_INIT_BACKGROUNDS[language]}")) Bgr(nr) Bgz(ct) H(100vw)`,
				style: `background-image:url(${LANGUAGE_WISE_INIT_BACKGROUNDS[language]})`
		 }
		});
		this.$input = this.userInput();
		this.$enterButton = this.enterButton();
		this.$textBox1 = this.textBox(text1);
		this.$textBox2 = this.textBox2(text2);
		this.$sharechatIcon = BaseSharechatIcon({
			wrapperClass: "W(25%) Pos(f) B(2.2vw)"
			// wrapperClass: 'Mt(5vw)'
		});
		this.$share = BaseWhatsappContainer({
			// wrapperClass: "D(f) Mt(2vw) Jc(sb) Ai(c) W(40%) Pos(f) B(14vw)",
			...(WHATSAPP_CLASS[language] || WHATSAPP_CLASS["default"]),
			// wrapperClass: "Pos(a) T(82vw) W(20vw) Mx(30vw) D(f)",
			params: {
				Authorization: this.state.Authorization,
				tagId, tagName,
				webCardName: `indianNewYear_${language}`,
				festivalName: `indianNewYear_${language}`
			},
			refreshHandler: this.refresh,
			eventHandler: this.eventHandler
		});
	}

	eventHandler(data) {
			const { CleverTap, language, Authorization } = this.state
			const { user: { username } } = this.getReduxState();
			const payload = {
				type: "shareWebCard",
				postId: data.PostDetails.postId
			};
			bigQueryEvent({
				Authorization,
				payload: {
					id: `indianNewYear_${language}`,
					actionType: "share",
					data: `language-${language}`,
					postId: data.PostDetails.postId,
					webcardName : `indianNewYear_${language}`,
					nameSubmitted1: username
				}
			});
			window.Android.onAction(JSON.stringify(payload));
	}
	
	getData() {
		return getDataExcel(EXCEL_DATA).then(data => {
			console.log('got data', data, this.state.language);
			const { text1, text2, tagId, tagName, namePosition } = data.filter(d => d.language === this.state.language)[0];
			this.state.store.dispatch(setText1(text1));
			this.state.store.dispatch(setText2(text2));
			this.state.store.dispatch(setTagId(tagId));
			this.state.store.dispatch(setTagName(tagName));
			this.state.store.dispatch(setNamePos(namePosition));
		});
	}

  getFonts() {
		const LINKS = [{
			href: "https://fonts.googleapis.com/css?family=Roboto&display=swap",
			rel: "stylesheet"
		}];

		LINKS.forEach(linkObj => {
			const link = createNewDiv({
				type: "link",
				setAttribute: linkObj
			});
			document.head.appendChild(link);
		});
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
		const { user: { username } } = this.getReduxState();
		let textBox = new BaseTextContainer(this.addStore({
			text: "ENTER",
			...(ENTER_BUTTON_CLASS[this.state.language] || ENTER_BUTTON_CLASS["default"]),
			clickHandler: this.clickHandler
		}))
		textBox = textBox.render();
		return textBox;
	}

	refresh() {
		this.state.store.dispatch(toggleSharedState());
		this.state.store.dispatch(setUserName(''));
		this.$container.remove();
		this.registerComponents();
		this.render();
	}

	clickHandler() {
		console.log('YOYOO');
		const { user: { username, namePosition, text2 } } = this.getReduxState();
		const { Authorization, language } = this.state;
		if (!username || username && username.length == 0) return;
		console.log('CLICKED');
		if (namePosition === 'separate')
			this.$nameBox = this.nameBox(username);
		else {
			this.$nameBox = undefined;
			this.$textBox2 = this.textBox2(text2.replace("${username}", username))
		}

		bigQueryEvent({
			Authorization,
			payload: {
				id: `indianNewYear_${language}`,
				actionType: "submit",
				data: `language-${language}`,
				postId: 0,
				webcardName : `indianNewYear_${language}`,
				nameSubmitted1: username
			}
		});

		this.state.store.dispatch(toggleSharedState());
		this.render();
	}

	validateUsername(username) {
		const { validateUsername } = this.state;
		const valid = !!username  && username.length <= 30 && username.length > 0;
		this.state.validateUsername = valid;
		console.log('VALID USERNAME ', valid, username);
		return valid;
	}

	textBox(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			...(TEXT_BOX_CLASS[this.state.language] || TEXT_BOX_CLASS["default"])
		}));
		textBox = textBox.render();
		return textBox;
	}

	textBox2(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			...(TEXT_BOX2_CLASS[this.state.language] || TEXT_BOX2_CLASS["default"])
		}));
		textBox = textBox.render();
		return textBox;
	}

	textBox3(text) {
		const { language } = this.state;
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			wrapperClass: language==='Malayalam' ?  "Mt(33vw) W(83%)" : "Mt(44vw) W(80%)",
			textBoxClass: "Ff($ffroboto) Fw(500) Fz(3vw) Lh(3.8vw) C(#3f270f) Ta(c) C(#956304)"
		}));
		textBox = textBox.render();
		return textBox;
	}

	nameBox(text) {
		let textBox = new BaseTextContainer(this.addStore({
			text: text,
			...(NAME_BOX_CLASS[this.state.language] || NAME_BOX_CLASS["default"])
		}));
		textBox = textBox.render();
		return textBox;
	}

	userInput() {
		const { language } = this.state;
		const styleClassesObj = INPUT_WRAPPER_CLASS[language] || INPUT_WRAPPER_CLASS['default'];
		let input = new InputContainer(this.addStore({
			inputHandler: this.inputHandler,
			...styleClassesObj,
			text: this.getReduxState().user.username,
			placeholder : PLACEHOLDER[language] || PLACEHOLDER['default']
		}));
		input = input.render();
		return input;
	}

	inputHandler(e) {
		const alphaExp = /^[a-zA-Z]| +$/;
		const name = e.target.value;
    if (name.match(alphaExp)) {
			this.state.store.dispatch(setUserName(name))
		}
	}

	render() {
		const appContainer = document.getElementById("app");
		const { user: { shared } } = this.getReduxState();
		console.log('SHARED ', shared, this.$container);
		// this.update();
		if( !this.$container) return;
		this.$container.innerHTML = ''
		if (shared) {
			addComponents({ components: [this.$textBox2, this.$textBox3, this.$nameBox, this.$share, this.$sharechatIcon], container: this.$content })
			addComponents({ components : [ this.$content], container : this.$container });
		} else {
			addComponents({ components: [this.$textBox1, this.$input, this.$enterButton], container: this.$content2 })
			addComponents({ components : [this.$content2], container : this.$container });
		}
		addComponents({ components : [this.$container], container :  appContainer});
	}

};

export default IndianNewYear;