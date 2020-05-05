import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents,
	genericBigQueryEvent,
	getParams,
	setOnboardingTags,
	getDataSharechatExcel
} from "@/utils";
import { setOnboardingDisplayData, setOnboardingMetaData, setSelectedTags, setTransition, setSelectedGenres } from "@/common/actions/TemplateOnboardingData";
import { onboardingBigQueryEvent } from '@/onboarding/helper';
import ImageContainer from "@/common/components/BaseImageContainer";
import TextContainer from "@/common/components/BaseTextContainer";
import CardsContainer from '@/onboarding/Cards';
import _map from 'lodash/map';
import _each from 'lodash/each';
import _filter from 'lodash/filter';
import _difference from 'lodash/difference';
import _empty from 'lodash/isEmpty';
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
		this.renderPage2 = this.renderPage2.bind(this);
		this.selectionEvent = this.selectionEvent.bind(this);
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
		console.log(devObj, 'DEV OBJ');
		this.state.dev = devObj.dev;
	}

	getDisplayText() {
		const { displayExcelObj, Authorization } = this.state;
		return getDataSharechatExcel({ ...displayExcelObj, Authorization }).then(data => {
			const parsedData = _map(data, d => {
				const tags = d.tags.split('|');
				return { ...d, tags };
			});
			this.state.store.dispatch(setOnboardingDisplayData(parsedData));
		});
	}

	getMetaData() {
		const { displayExcelObj : { sheetId, meta }, Authorization, dev } = this.state;
		return getDataSharechatExcel({ sheetId, page: meta, columns: 2, Authorization, dev }).then(data => {
			const obj = {};
			_each(data, d => {
				obj[d.key] = parseInt(d.value) || parseInt(d.value) === 0 ?  parseInt(d.value) : d.value;
			});
			this.state.store.dispatch(setOnboardingMetaData(obj));
		});
	}

	getReduxState() {
		return this.state.store.getState();
	}

	cardClickHandler(ids) {
		const { onboarding: { displayObj, selectedGenres } } = this.getReduxState();
		const tagObjects = _filter(displayObj, d=> ids.includes(d.id));
		const tagList = tagObjects.reduce((acc, current) => [...acc, ...current.tags], []);
		const newGenres = tagObjects.reduce((acc,current) => [...acc, current.genre], []);
		const submit = document.getElementsByClassName('submit-text')[0];
		if ( tagList.length === 0 ) {
			submit.classList.remove('submit-text-valid');
			submit.classList.add('Op(0.3)');
			submit.classList.remove('ripple');
		} else {
			submit.classList.add('submit-text-valid');
			submit.classList.remove('Op(0.3)');
			submit.classList.add('ripple');
		}
		this.selectionEvent({ oldGenres: selectedGenres, newGenres })
		this.state.store.dispatch(setSelectedTags(tagList));
		this.state.store.dispatch(setSelectedGenres(newGenres));
	}

	selectionEvent({ oldGenres, newGenres }) {
		const changed = _difference(oldGenres, newGenres);
		const { Authorization, dev } = this.state
		let payload;
		if (_empty(changed)) {
			payload = {
				"topics" : newGenres,
				"action": "topicSelected",
				"changed": _difference(newGenres, oldGenres)
			}
			onboardingBigQueryEvent({ Authorization, dev, payload });
		} else {
			payload = {
				topics : newGenres,
				action: "topicUnselected",
				changed 
			}
			onboardingBigQueryEvent({ Authorization, dev, payload });
		}
	}

	onSubmit() {
		const { onboarding: { selectedTags, selectedGenres, metadata: { tagOpen } } } = this.getReduxState();
		if ( selectedTags.length === 0) return;
		const payload = {
			tagIds: selectedTags
		}
		const { Authorization, dev } = this.state;
		if (tagOpen) {
			for (let index = 0; index < tagOpen; index++) {
				setOnboardingTags({ payload, Authorization, dev });
			}
		}
		const payload2 = {
			"topics" : selectedGenres,
			"action": "submitted"
		}
		onboardingBigQueryEvent({ Authorization, dev, payload : payload2 });
		this.state.store.dispatch(setTransition(true));
		setTimeout(this.renderPage2, 1200);
	}

	renderPage2() {
		const ele = document.getElementsByClassName('all-pages-container')[0];
		ele.classList.add('moveLeft');
		ele.classList.remove('Ov(h)')
	}

	registerComponents() {
		const { onboarding: { metadata: { heading, submitCTAText, backgroundPage2, maxOptions }, displayObj } } = this.getReduxState();
		this.$header = new TextContainer({
			text: heading,
			textBoxClass: "Ff(Inter) Fw(600) Fz(5.5vw) Lh(6.6vw) C(#4a4a59)",
			wrapperClass: "M(4.4vw) Mb(0)"
		});
		this.$header = this.$header.render();
		this.$cardContainer = new CardsContainer({ cards : displayObj, cardClickHandler : this.cardClickHandler, maxOptions });
		this.$cardContainer = this.$cardContainer.render();

		let submitTextContainer = new TextContainer({
			text: submitCTAText,
			wrapperClass: 'Ta(c) Bdrs(10vw) Bd($bdblue) W(100%) Op(0.3) submit-text Bgc(#1990bf) Trsp(a) Trsdu(0.8s) Trstf(e)',
			textBoxClass: "Fz(3.8vw) Ff(Inter) Fw(600) C(white) Bgc(#1990bf) P(2.7vw) Lh(5vw) Py(2.2vw) Bdrs(10vw)"
		});

		submitTextContainer = submitTextContainer.render();
		this.$submitButtonContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'D(f) Jc(c) My(2.2vw) Mx(5.5vw)'
			}
		});
		let img = new ImageContainer({
			src: backgroundPage2,
			// clickHandler: () => this.bannerClickHandler({
			// 	url: topClickEvent
			// }),
			imgClass: ` W(100vw) H(a)`,
			wrapperClass: 'Pos(a) Start(100vw)'
		});

		this.$page2 = img.render();

		// this.$page2 = createNewDiv({
		// 	type: 'div',
		// 	setAttribute: {
		// 		class: `H(133.33vw) W(100vw) Pos(a) Start(100vw)`,
		// 		style: `background-image:url("${backgroundPage2}")`
		// 	}
		// });

		this.$submitButtonContainer.addEventListener('click', this.onSubmit);

		addComponents({ components: [submitTextContainer], container: this.$submitButtonContainer });

		const container1 = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'all-cards-container'
			}
		});

		this.$container = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'all-pages-container Pos(a) T(0) Ov(h)'
			}
		});

		addComponents({ components : [this.$header, this.$cardContainer, this.$submitButtonContainer], container : container1 });
		addComponents({ components : [this.$page2, container1], container : this.$container });
	}

	render() {
		console.log('RENDERED');
		const { Authorization, dev } = this.state;
		const payload = {
			"topics" : [],
			"action": "intialized"
		}
		onboardingBigQueryEvent({ Authorization, dev, payload });
		const appContainer = document.getElementById("app");
		appContainer.innerHTML = '';
		addComponents({ components : [this.$container], container :  appContainer});
	}
}

export default OnBoarding;