import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents
} from "@/utils";
import { ACRONYMS_EXCEL_BY_LANGUAGE, BACKGROUND, DISPLAY_TEXT_EXCEL } from '@/acronyms/helper'
import { setUserName, toggleSharedState, setLanguage, setText1, setText2, setTagId, setTagName } from '@/common/actions/TemplateUserForm';
import { setAcronymsList } from '@/common/actions/TemplateAcronymForm';
import _compact from 'lodash/compact';
import _trim from 'lodash/trim';
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import BaseSharechatIcon from "@/common/components/BaseSharechatIcon";
import BaseWhatsappContainer from "@/common/components/BaseWhatsappContainer";
import NameList from '@/acronyms/NameList';

class AcronymsWebCard {
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
		this.shareEventHandler = this.shareEventHandler.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
		this.addStore = this.addStore.bind(this);
	}

	getData() {
		return Promise.all([
			this.getAcronymData(),
			this.getDisplayText()
		]);
	}

	getAcronymData() {
		return getDataExcel(ACRONYMS_EXCEL_BY_LANGUAGE["default"]).then(data => {
			const parsedData = {};
			data.forEach(entry => {
				parsedData[entry.letter] = _compact([ _trim(entry.acro1), _trim(entry.acro2) ]);
			});
			this.state.store.dispatch(setAcronymsList(parsedData));
		});
	}

	getDisplayText() {
		return getDataExcel(DISPLAY_TEXT_EXCEL).then(data => {
			console.log('data for dispkay', data);
			const { text1, text2, tagId, tagName } = data.filter(d => d.language === this.state.language)[0];
			this.state.store.dispatch(setText1(text1));
			this.state.store.dispatch(setText2(text2));
			this.state.store.dispatch(setTagId(tagId));
			this.state.store.dispatch(setTagName(tagName));
		});
	}

	registerComponents() {
		console.log('got data, register');
		const { user: { text1, text2, username, tagId, tagName } } = this.getReduxState();
		const { language } = this.state;
		this.$container = createNewDiv({
			type: "div",
			setAttribute: { class: "indian-new-year-container" }
		});
		this.$content = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgi(url("${BACKGROUND.AFTER}")) Bgr(nr) Bgz(ct) H(100vw)`,
				style: `background-image:url(${BACKGROUND.AFTER})`
			}
		});

		this.$content2 = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgi(url("${BACKGROUND.BEFORE}")) Bgr(nr) Bgz(ct) H(100vw)`,
				style: `background-image:url(${BACKGROUND.BEFORE})`
		 }
		});
		this.$input = this.userInput();
		this.$enterButton = this.enterButton();
		this.$textBox1 = this.textBox({
			text: text1,
			textBoxClass: "Fz(5.5vw) Lh(6.1vw) Ta(c) C(#471a8b) Fw(700) Ff(athelas)",
			wrapperClass: "Mx(8vw) My(4vw)",
			inline: 'font-family:athelas;'
		});
		this.$sharechatIcon = BaseSharechatIcon({
			wrapperClass: "W(15%) Pos(f) B(1vw)"
			// wrapperClass: 'Mt(5vw)'
		});
		this.$share = BaseWhatsappContainer({
			wrapperClass : "D(f) Mt(2vw) Jc(sb) Ai(c) W(30%) Pos(f) B(5vw)",
			params: {
				Authorization: this.state.Authorization,
				tagId, tagName,
				webCardName: `Corona_Acronym_${language}`,
				festivalName: `Corona_Acronym_${language}`
			},
			refreshClass: 'W(6vw) H(6vw) Mx(10px) Bdrs(3vw) Bd Bgc(lightgrey) P(0.5vw)',
			refreshHandler: this.refresh,
			eventHandler: this.shareEventHandler
		});
	}

	textBox({ text, wrapperClass, textBoxClass, inline }) {
		let textBox = new BaseTextContainer(this.addStore({ text, wrapperClass, textBoxClass, inline }));
		textBox = textBox.render();
		return textBox;
	}

	refresh() {
		console.log('YOYOO');
		this.state.store.dispatch(toggleSharedState());
		this.state.store.dispatch(setUserName(''));
		this.$container.remove();
		this.registerComponents();
		this.render();
	}

	clickHandler() {
		const { user: { username, text2 }, acronyms: { acronymObj } } = this.getReduxState();
		if (!this.validateUsername(username)) return;
		console.log('CLICKED');
		const textBox2 = this.textBox({
			text: username.toUpperCase(), //text2.replace("${username}", username.toUpperCase()),
			inline: 'font-family:athelas;',
			textBoxClass: "C(#3e1c76) Fw(700)",
			wrapperClass: "Ta(c)"
		});
		const textBox3 = this.textBox({
			text: text2.replace("${username}", ""),
			inline: 'font-family:athelas;',
			textBoxClass: "C(#3e1c76) Fw(700)",
			wrapperClass: "Ta(c)"
		});
		this.$textContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: "Pos(f) T(1vw)"
			}
		});
		addComponents({ components: [textBox2, textBox3], container: this.$textContainer });
		const acronymContainer = new NameList({ username, acronymObj });
		this.$acronymContainer = acronymContainer.render();

		this.state.store.dispatch(toggleSharedState());
		this.render();
	}

	shareEventHandler(data) {
		const { CleverTap, language, Authorization, webcardName } = this.state
		this.state.CleverTap.sendEvent("easter_shared_" + webcardName, {
				language,
				token : Authorization,
				name
		})
		let payload = {
				type: "shareWebCard",
				postId: data.PostDetails.postId
		};
		window.Android.onAction(JSON.stringify(payload));
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
	}

	addStore(params) {
		return { store: this.state.store, ...params };
	}

	userInput() {
		const { language } = this.state;
		let input = new InputContainer(this.addStore({
			inputHandler: this.inputHandler,
			wrapperClass: "M(2.7vw)",
			maxLength : 14,
			inputBoxClass: "Bdrs(4px) Bgc(#343517) H(8vw) W(50vw) Fz(3vw) P(3vw) Ff($ffroboto) Bd C(#4f2a8b) Bxz(bb) Bd(n):h Bdc(t):h",
			text: this.getReduxState().username
		}));
		input = input.render();
		return input;
	}

	enterButton() {
		// console.log('this.state.textData ', this.state.textData);
		const { user: { username } } = this.getReduxState();
		let textBox = new BaseTextContainer({
			text: "FIND OUT",
			wrapperClass: "M(2.7vw)",
			textBoxClass: "C(white) Bgc(#4f2a8b) Fw(700) Ff($ffroboto) Py(10px) Px(20px) Bdrs(5px) Fz(3vw)",
			clickHandler: this.clickHandler
		});
		textBox = textBox.render();
		return textBox;
	}

	inputHandler(name) {
		this.state.store.dispatch(setUserName(name))
	}

	validateUsername(username) {
		const { validateUsername } = this.state;
		const valid = !!username  && username.length <= 30 && username.length > 0;
		this.state.validateUsername = valid;
		return valid;
	}

	render() {
		const appContainer = document.getElementById("app");
		const { user: { shared } } = this.getReduxState();
		console.log('SHARED ', shared, this.$container);
		// this.update();
		if( !this.$container) return;
		this.$container.innerHTML = ''
		if (shared) {
			addComponents({ components: [this.$textContainer, this.$acronymContainer, this.$share, this.$sharechatIcon], container: this.$content })
			addComponents({ components : [ this.$content], container : this.$container });
		} else {
			addComponents({ components: [this.$textBox1, this.$input, this.$enterButton], container: this.$content2 })
			addComponents({ components : [this.$content2], container : this.$container });
		}
		addComponents({ components : [this.$container], container :  appContainer});
	}

}

export default AcronymsWebCard;