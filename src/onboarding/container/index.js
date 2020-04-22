import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents,
	bigQueryEvent,
	getParams
} from "@/utils";
import { setOnboardingDisplayData, setOnboardingMetaData } from "@/common/actions/TemplateOnboardingData";
import ImageContainer from "@/common/components/BaseImageContainer";
import TextContainer from "@/common/components/BaseTextContainer";
import CardsContainer from '@/onboarding/Cards';
import _map from 'lodash/map';
import _each from 'lodash/each';

class OnBoarding {
	constructor({ store }) {
		this.getFonts();
    document.title = "ShareChat | Trending TV";
    this.state = {
			store: store
		};
		this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		// this.bannerClickHandler = this.bannerClickHandler.bind(this);
		// this.refresh = this.refresh.bind(this);
	}

	getData() {
		return Promise.all([
			this.getDisplayText(),
			this.getMetaData() 
		]);
	}

	getFonts() {
		const LINKS = [{
			href: "https://fonts.googleapis.com/css2?family=Mukta:wght@600&display=swap",
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

	getParams() {
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
				key: 'meta',
				defaultValue: 2,
				type: 'Number'
			}]
		});
		this.state.displayExcelObj = obj
	}

	getDisplayText() {
		const { displayExcelObj } = this.state;
		return getDataExcel(displayExcelObj).then(data => {
			const parsedData = _map(data, d => {
				const tags = d.tags.split('|');
				return { ...d, tags };
			})
			this.state.store.dispatch(setOnboardingDisplayData(parsedData));
		});
	}

	getMetaData() {
		const { displayExcelObj :{ sheetId, meta } } = this.state;
		return getDataExcel({ sheetId, page: meta, columns: 2 }).then(data => {
			const obj = {};
			_each(data, d => {
				obj[d.key] = d.value;
			})
			this.state.store.dispatch(setOnboardingMetaData(obj));
		});
	}

	getReduxState() {
		return this.state.store.getState();
	}

	registerComponents() {
		const { onboarding: { metadata: { heading }, displayObj } } = this.getReduxState()
		this.$header = new TextContainer({
			text: heading
		});
		this.$header = this.$header.render();
		this.$cardContainer = new CardsContainer({ cards : displayObj });
		this.$cardContainer = this.$cardContainer.render();
		console.log('this. is it ', this.$cardContainer);

		this.$submitButtonContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'submit-container'
			}
		});

		this.$container = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'all-cards-container'
			}
		});

		addComponents({ components : [this.$header, this.$cardContainer, this.$submitButtonContainer], container : this.$container });
	}

	render() {
		const appContainer = document.getElementById("app");
		addComponents({ components : [this.$container], container :  appContainer});
	}
}

export default OnBoarding;