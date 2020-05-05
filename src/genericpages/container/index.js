import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	registerCleverTap,
	getDataSharechatExcel,
	getDataExcel,
	addComponents,
	genericBigQueryEvent,
	getParams
} from "@/utils";
import {
	INPUT_WRAPPER_CLASS,
	EXCEL_DATA,
	ENTER_BUTTON_CLASS,
	TEXT_BOX_CLASS,
	NAME_BOX_CLASS,
	TEXT_BOX2_CLASS,
	WHATSAPP_CLASS,
	PLACEHOLDER
} from "@/genericpages/helper2"
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import BaseSharechatIcon from "@/common/components/BaseSharechatIcon";
import BaseWhatsappContainer from "@/common/components/BaseWhatsappContainer";
import { setLanguage, setText1, setText2, setTagId, setTagName, setNamePos } from '@/common/actions/TemplateUserForm';
import { setGenericData, setUsername, toggleSharedState } from '@/common/actions/TemplateGenericData';
import _each from 'lodash/each'

class GenericPage {
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
		const { generic: { data: { textPage1, textPage2, username, tagId, tagName, language, backgroundPage1, backgroundPage2, webCardName } } } = this.getReduxState();
		this.$container = createNewDiv({
			type: "div",
			setAttribute: { class: "indian-new-year-container" }
		});
		this.$content = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgi(url("${backgroundPage2}")) Bgr(nr) Bgz(ct) H(100vw)`,
				style: `background-image:url(${backgroundPage2})`
			}
		});

		this.$content2 = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgi(url("${backgroundPage1}")) Bgr(nr) Bgz(ct) H(100vw)`,
				style: `background-image:url(${backgroundPage1})`
		 }
		});
		this.$input = this.userInput();
		this.$enterButton = this.enterButton();
		this.$textBox1 = this.textBox();
		this.$sharechatIcon = BaseSharechatIcon({
			wrapperClass: "W(23%) Pos(r) T(32vw)"
		});
		this.$share = BaseWhatsappContainer({
			 ...WHATSAPP_CLASS["default"],
			// wrapperClass: "Pos(a) T(82vw) W(20vw) Mx(30vw) D(f)",
			params: {
				Authorization: this.state.Authorization,
				tagId, tagName,
				webCardName: `${webCardName}_${language}`,
				festivalName: `${webCardName}_${language}`
			},
			refreshHandler: this.refresh,
			eventHandler: this.eventHandler
		});
	}

	eventHandler(data) {
			const { Authorization } = this.state
			const { generic: { username, data: { webCardName, language } } } = this.getReduxState();
			const payload = {
				type: "shareWebCard",
				postId: data.PostDetails.postId
			};
			genericBigQueryEvent({
				Authorization,
				payload: {
					id: `${webCardName}_${language}`,
					actionType: "share",
					data: `language-${language}`,
					postId: data.PostDetails.postId,
					webcardName : `${webCardName}_${language}`,
					nameSubmitted1: username
				}
			});
			window.Android.onAction(JSON.stringify(payload));
	}
	
	getData() {
		const { displayExcelObj : { sheetId, columns, page }, Authorization } = this.state;
		return getDataSharechatExcel({ sheetId, columns, page, Authorization }).then(data => {
			const obj = {};
			_each(data, d => {
				obj[d.key] = d.value;
			});
			this.state.store.dispatch(setGenericData(obj));
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
		// this.state.sheetId = url.searchParams.get("sheetId");
		// this.state.page = parseInt(url.searchParams.get("page") || 1);
		// this.state.columns = parseInt(url.searchParams.get("columns"));
		// this.state.meta = parseInt(url.searchParams.get("meta"));
		const obj = getParams({
			paramsList: [{
				key: 'sheetId',
				defaultValue: '1qZC1kwqhNnAM8c2-rQUg1Jolk4HoULcyeKoCqHelMN0'
			}, {
				key: 'columns',
				defaultValue: 6,
				type: 'Number'
			}, {
				key: 'page',
				defaultValue: 1,
				type: 'Number'
			}, {
				key: 'dev',
				defaultValue: false,
				type: 'Boolean'
			}]
		});
		this.state.displayExcelObj = obj;
		console.log(this.state);
	}

	addStore(params) {
		return { store: this.state.store, ...params };
	}

	enterButton() {
		// console.log('this.state.textData ', this.state.textData);
		const { generic: { data: { buttonText, buttonColor, buttonFontColor } } } = this.getReduxState();
		let textBox = new BaseTextContainer(this.addStore({
			text: buttonText,
			...ENTER_BUTTON_CLASS["default"],
			inline: `background-color:${buttonColor};color:${buttonFontColor}`,
			clickHandler: this.clickHandler
		}))
		textBox = textBox.render();
		return textBox;
	}

	refresh() {
		this.state.store.dispatch(toggleSharedState());
		this.state.store.dispatch(setUsername(''));
		this.$container.remove();
		this.registerComponents();
		this.render();
	}

	clickHandler() {
		const { generic: { data: { namePosition, textPage2, language, webCardName }, username } } = this.getReduxState();
		console.log('YOYOO', username);
		const { Authorization } = this.state;
		if (!username || username && username.length == 0) return;
		console.log('CLICKED');
		this.$textBox2 = this.textBox2()

		genericBigQueryEvent({
			Authorization,
			payload: {
				id: `${webCardName}_${language}`,
				actionType: "submit",
				data: `language-${language}`,
				postId: 0,
				webcardName : `${webCardName}_${language}`,
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

	textBox() {
		const { generic: { data: { textPage1, fontStylePage1 }  }} = this.getReduxState();
		let textBox = new BaseTextContainer(this.addStore({
			text: textPage1,
			wrapperClass: "My(3vw) Mx(16.6vw)",
			textBoxClass: "Ta(c)",
			inline: fontStylePage1
		}));
		
		textBox = textBox.render();
		return textBox;
	}

	textBox2() {
		const { generic: { data: { textPage2, fontStylePage2 }, username  }} = this.getReduxState();
		const text = textPage2.replace("${username}", username)
		let textBox = new BaseTextContainer(this.addStore({
			text,
			...TEXT_BOX2_CLASS["default"],
			inline: fontStylePage2
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
		const { generic: { data : { language, themeColor, placeholder }, username } } = this.getReduxState();
		const styleClassesObj = INPUT_WRAPPER_CLASS['default'];
		let input = new InputContainer(this.addStore({
			inputHandler: this.inputHandler,
			...styleClassesObj,
			inline : `color:${themeColor};`,
			text: username,
			placeholder : placeholder
		}));
		input = input.render();
		return input;
	}

	inputHandler(e) {
		const alphaExp = /^[a-zA-Z]| +$/;
		const name = e.target.value;
    if (name.match(alphaExp)) {
			this.state.store.dispatch(setUsername(name))
		}
	}

	render() {
		const appContainer = document.getElementById("app");
		const { generic: { shared } } = this.getReduxState();
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

export default GenericPage;