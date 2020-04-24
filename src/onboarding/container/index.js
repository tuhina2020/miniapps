import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents,
	bigQueryEvent,
	getParams,
	setOnboardingTags,
	getDataSharechatExcel
} from "@/utils";
import { setOnboardingDisplayData, setOnboardingMetaData, setSelectedGenres, setTransition } from "@/common/actions/TemplateOnboardingData";
import ImageContainer from "@/common/components/BaseImageContainer";
import TextContainer from "@/common/components/BaseTextContainer";
import CardsContainer from '@/onboarding/Cards';
import _map from 'lodash/map';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import './index.css'

class OnBoarding {
	constructor({ store }) {
		this.getFonts();
    document.title = "ShareChat | Onboarding";
    this.state = {
			store: store
		};
		this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		this.cardClickHandler = this.cardClickHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
		}, {
			href: "https://fonts.googleapis.com/css2?family=Inter:wght@600&display=swap",
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
			}, {
				key: 'dev',
				defaultValue: false,
				type: 'Boolean'
			}]
		});
		this.state.displayExcelObj = obj;
		const devObj = getParams({
			paramsList: [{
				key: 'dev',
				defaultValue: false,
				type: 'Boolean'
			}]
		});
		this.state.dev = devObj.dev;
	}

	getDisplayText() {
		const { displayExcelObj, Authorization } = this.state;
		return getDataSharechatExcel({ ...displayExcelObj, Authorization }).then(data => {
			const parsedData = _map(data, d => {
				const tags = d.tags.split('|');
				return { ...d, tags };
			})
			this.state.store.dispatch(setOnboardingDisplayData(parsedData));
		});
	}

	getMetaData() {
		const { displayExcelObj : { sheetId, meta }, Authorization } = this.state;
		return getDataSharechatExcel({ sheetId, page: meta, columns: 2, Authorization }).then(data => {
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

	cardClickHandler(ids) {
		console.log('FINAL IDS ', ids);
		const { onboarding: { displayObj } } = this.getReduxState();
		const tagObjects = _filter(displayObj, d=> ids.includes(d.id));
		const tagList = tagObjects.reduce((acc, current) => [...acc, ...current.tags], []);
		if ( tagList.length === 0 ) {
			document.getElementsByClassName('submit-text')[0].classList.add('Op(0.5)');
		} else {
			document.getElementsByClassName('submit-text')[0].classList.remove('Op(0.5)');
		}
		this.state.store.dispatch(setSelectedGenres(tagList));
	}

	onSubmit() {
		const { onboarding: { selectedTags } } = this.getReduxState();
		const payload = {
			tagIds: selectedTags
		}
		for (let index = 0; index < 2; index++) {
			setOnboardingTags({ payload, Authorization: this.state.Authorization });
		}
		this.state.store.dispatch(setTransition(true));
	}

	registerComponents() {
		const { onboarding: { metadata: { heading, submitCTAText }, displayObj } } = this.getReduxState();
		this.$header = new TextContainer({
			text: heading,
			textBoxClass: "Ff(Inter) Fw(600) Fz(5.5vw) Lh(6.6vw) C(#4a4a59)",
			wrapperClass: "M(4.4vw) Mb(0)"
		});
		this.$header = this.$header.render();
		this.$cardContainer = new CardsContainer({ cards : displayObj, cardClickHandler : this.cardClickHandler });
		this.$cardContainer = this.$cardContainer.render();

		let submitTextContainer = new TextContainer({
			text: submitCTAText,
			wrapperClass: 'Ta(c) Bdrs(10vw) Bd($bdblue) W(26.67vw) Op(0.5) submit-text',
			textBoxClass: "Fz(3.8vw) Ff(Inter) Fw(600) C(#1990bf) P(2.7vw) Lh(5vw) Py(2.2vw) ripple Bdrs(10vw)"
		});

		submitTextContainer = submitTextContainer.render();
		this.$submitButtonContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'D(f) Jc(c) My(2.2vw)'
			}
		});

		this.$submitButtonContainer.addEventListener('click', this.onSubmit);

		addComponents({ components: [submitTextContainer], container: this.$submitButtonContainer });

		this.$container = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'all-cards-container'
			}
		});

		addComponents({ components : [this.$header, this.$cardContainer, this.$submitButtonContainer], container : this.$container });
	}

	render() {
		console.log('RENDERED');
		this.registerComponents();
		const appContainer = document.getElementById("app");
		appContainer.innerHTML = '';
		addComponents({ components : [this.$container], container :  appContainer});
	}
}

export default OnBoarding;