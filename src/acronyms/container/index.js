import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents
} from "@/utils";
import { ACRONYMS_EXCEL_BY_LANGUAGE } from '@/acronyms/helper'
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
		// this.clickHandler = this.clickHandler.bind(this);
		// this.refresh = this.refresh.bind(this);
		// this.eventHandler = this.eventHandler.bind(this);
		// this.inputHandler = this.inputHandler.bind(this);
	}

	getData() {
		return getDataExcel(ACRONYMS_EXCEL_BY_LANGUAGE[this.state.language]).then(data => {
			console.log('got data', data, this.state.language);
			// const obj = data.filter(d => d.language === this.state.language)[0];
			// this.state.store.dispatch(setText1(text1));
			// this.state.store.dispatch(setText2(text2));
			// this.state.store.dispatch(setTagId(tagId));
			// this.state.store.dispatch(setTagName(tagName));
			// this.state.store.dispatch(setNamePos(namePosition));
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

}

export default AcronymsWebCard;