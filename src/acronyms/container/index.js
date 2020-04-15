import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents
} from "@/utils";
import { ACRONYMS_EXCEL_BY_LANGUAGE } from '@/acronyms/helper'
import { setUserName, toggleSharedState, setLanguage } from '@/common/actions/TemplateUserForm';
import { setAcronymsList } from '@/common/actions/TemplateAcronymForm';
import _compact from 'lodash/compact';
import _trim from 'lodash/trim';

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
		console.log();
		return getDataExcel(ACRONYMS_EXCEL_BY_LANGUAGE[this.state.language] || ACRONYMS_EXCEL_BY_LANGUAGE["default"]).then(data => {
			const parsedData = this.parseData(data);
			console.log('got data', parsedData);
			this.state.store.dispatch(setAcronymsList(parsedData));
		});
	}

	parseData(data) {
		const obj = {};
		data.forEach(entry => {
			obj[entry.letter] = _compact([ _trim(entry.acro1), _trim(entry.acro2) ]);
		});
		return obj;
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

}

export default AcronymsWebCard;