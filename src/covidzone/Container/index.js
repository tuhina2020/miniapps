import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	registerCleverTap,
	getDataSharechatExcel,
	getDataExcel,
	addComponents,
	genericBigQueryEvent,
	getParams,
	getDateFormat
} from "@/utils";
import InputContainer from "@/common/components/BaseInputContainer";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import BaseSharechatIcon from "@/common/components/BaseSharechatIcon";
import BaseWhatsappContainer from "@/common/components/BaseWhatsappContainer";
import ImageContainer from "@/common/components/BaseImageContainer";
import CityList from "@/covidzone/CityList";
import BackGround from '@/covidzone/assets/background.png';
import Group from '@/covidzone/assets/group.png';
import People from '@/covidzone/assets/people.png';
import Search from '@/common/assets/search.svg';
import {
	setGenericData,
	setUsername,
	toggleSharedState,
	setGenericMetaData,
	setGenericStatesMetaData,
	setFilteredData,
	setSelectedCity,
	setFocus
} from '@/common/actions/TemplateCovidZone';
import _filter from 'lodash/filter';

class CovidZone {
	constructor({ store }) {
    document.title = "ShareChat | Covid Zone";
    this.state = {
			store: store
		};
		this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		this.getFonts();
		this.getData = this.getData.bind(this);
		this.inputHandler = this.inputHandler.bind(this);
		this.focusHandler = this.focusHandler.bind(this);
		this.blurHandler = this.blurHandler.bind(this);
		this.renderCity = this.renderCity.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.refresh = this.refresh.bind(this);
		this.eventHandler = this.eventHandler.bind(this);
		this.sharedHandlerBefore = this.sharedHandlerBefore.bind(this);
	}

	getData() {
		return Promise.all([
			this.getAllData(),
			this.getMetaData(),
			this.getLangDisplayData()
		])
	}

	getAllData() {
		const { displayExcelObj : { sheetId }, Authorization } = this.state;
		return getDataExcel({ sheetId, columns: 3, page : 1, Authorization }).then(data => {
			const parsedData = _filter(data, d => d.district !== "*District*" && d.state !== "NULL" && d.district !== "NULL" );
			this.state.store.dispatch(setGenericData(parsedData));
		});
	}

	getMetaData() {
		const { displayExcelObj : { sheetId }, Authorization } = this.state;
		return getDataExcel({ sheetId, columns: 7, page : 4, Authorization }).then(data => {
			this.state.store.dispatch(setGenericMetaData(data));
		});
	}

	getLangDisplayData() {
		const { displayExcelObj : { sheetId }, Authorization } = this.state;
		return getDataExcel({ sheetId, columns: 2, page : 3, Authorization }).then(data => {
			this.state.store.dispatch(setGenericStatesMetaData(data));
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

	getParams() {
    const url = new URL(document.location.href);
		const obj = getParams({
			paramsList: [{
				key: 'sheetId',
				defaultValue: '1Jp7RMwfCBMY-qtbawt268yAKKpqZM2ZJ-qyXd1E_j-I'
			}, {
				key: 'language',
				defaultValue: 'default'
			}]
		});
		this.state.displayExcelObj = {
			...obj, zones: 1, meta: 2, states: 3
		};
		this.state.language = obj.language
	}

	getReduxState() {
		return this.state.store.getState();
	}

	getCurrentLangData() {
		const { language } = this.state;
		const { covidzone: { metadata } }= this.getReduxState();
		this.state.current = _filter(metadata, m => m.language === language)[0];
	}

	registerComponents() {
		this.getCurrentLangData();
		this.getFilteredList();
		const { current : { tagId, tagString, helper }, language, Authorization } = this.state;
		const { covidzone: { states, data, filteredData } } = this.getReduxState();
		this.$container = createNewDiv({
			type: "div",
			setAttribute: { class: "covidzone-container Ov(h) W(100vw) H(100vw)" }
		});
		this.$content = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgr(nr) Bgz(ct) H(100vw) content`,
				style: `background-image:url(${BackGround})`
			}
		});

		this.$content2 = createNewDiv({
			type: "div",
			setAttribute: {
				class: `D(f) Fld(c) Ai(c) Jc(c) Bgr(nr) Bgz(ct) H(100vw) content2`,
				style: `background-image:url(${BackGround})`
		 }
		});

		this.$content3 = createNewDiv({
			type: "div",
			setAttribute: {
				class: 'content3 Pos(r) B(56vw) D(f) Ai(c) Jc(c) Fld(c) Trsp(a) Trsdu(1s) Trstf(e) content3'
		 }
		});

		this.$input = this.userInput();
		this.$textBox1 = this.textBox();
		this.$share = BaseWhatsappContainer({
			wrapperClass: "T(101vw) D(f) Ai(c) Jc(c)  Pos(f) Trsp(a) Trsdu(0.8s) Trstf(e)",
			params: {
				Authorization,
				tagId, tagName: tagString,
				webCardName: `covidzone_${language}`,
				festivalName: `covidzone_${language}`
			},
			refreshHandler: this.refresh,
			eventHandler: this.eventHandler,
			beforeShare: this.sharedHandlerBefore
		});
		this.$city = new CityList({
			topCities : filteredData,
			statusList: data,
			visible: false,
			helper,
			onClick: this.clickHandler
		});
		this.$city = this.$city.render();
		let img = new ImageContainer({
			src: Group,
			// clickHandler: () => this.bannerClickHandler({
			// 	url: topClickEvent
			// }),
			imgClass: `W(30vw) H(a)`,
			wrapperClass: 'Pos(a) T(100vw) Trsp(a) Trsdu(0.8s) Trstf(e)'
		});

		this.$earth = img.render();

		img = new ImageContainer({
			src: People,
			// clickHandler: () => this.bannerClickHandler({
			// 	url: topClickEvent
			// }),
			imgClass: `W(30vw) H(a)`,
			wrapperClass: 'Pos(a) T(83vw) D(f) Jc(c) Ai(c) Mx(35%) Trsp(a) Trsdu(0.5s) Trstf(e) people'
		});
		this.$bottomImg = img.render();
	}

	sharedHandlerBefore() {
		const { language, Authorization } = this.state;
		genericBigQueryEvent({
			Authorization,
			payload: {
				id: `covidzone_${language}`,
				actionType: "intendedShare",
				data: `language-${language}`,
				postId: 0,
				webcardName : `covidzone`
			}
		});
	}

	eventHandler(data) {
		const { language, Authorization } = this.state;
		genericBigQueryEvent({
			Authorization,
			payload: {
				id: `covidzone_${language}`,
				actionType: "share",
				data: `language-${language}`,
				postId: data.PostDetails.postId,
				webcardName : `covidzone`
			}
		});
		this.$bottomImg.classList.toggle("D(f)");
		this.$bottomImg.style.display = 'none';
		const payload = {
			type: "shareWebCard",
			postId: data.PostDetails.postId
		};
		window.Android.onAction(JSON.stringify(payload));
	}

	clickHandler(city) {
		const { covidzone: { username } } = this.getReduxState();
		const { language, Authorization } = this.state;
		genericBigQueryEvent({
			Authorization,
			payload: {
				id: `covidzone_${language}`,
				actionType: "citySelected",
				data: `language-${language}`,
				postId: 0,
				nameSubmitted1: username,
				webcardName : `covidzone`
			}
		});
		this.state.store.dispatch(setSelectedCity(city));
		this.$content3.classList.toggle('B(87vw)');
		this.$content3.classList.toggle('B(180vw)');
		this.$bottomImg.classList.toggle("D(f)");
		this.$bottomImg.style.display = 'none';
		this.$city.classList.toggle('D(n)');
		this.$earth.classList.toggle('T(100vw)')
		this.$earth.classList.toggle('T(30vw)')
		this.$textBox1.classList.toggle('Op(0)');
		this.$textBox1.firstChild.style.fontSize = '6vw';
		this.$textBox1.firstChild.classList.toggle('C(#9e9f9f)');
		this.$textBox1.firstChild.classList.toggle('C(#24565a)');
		this.$share.classList.toggle('T(101vw)');
		this.$share.classList.toggle('T(87vw)');
		this.$bottomImg.classList.toggle("D(f)");
		this.$bottomImg.style.display = 'none';
		const colorMap = {
			"Orange Zone" : "#ff6f00",
			"Red Zone" : "#d10808",
			"Green Zone": "#148707"
		}
		let ele1 = new BaseTextContainer({
			text: `${city.district}`,
			textBoxClass: "Ta(c) Ff($ffroboto) Fw(700) Fz(4.5vw) Whs(nw) C(#24565a)",
		});
		
		ele1 = ele1.render();

		let ele2 = new BaseTextContainer({
			text: `${city.zone}`,
			textBoxClass: "Ta(c) Ff($ffroboto) Fw(700) Fz(4.5vw) Whs(nw)",
			wrapperClass: 'My(2vw)',
			inline: `color:${colorMap[city.zone]};`
		});
		
		ele2 = ele2.render();
		let ele = createNewDiv({
			type: "div",
			setAttribute: {
				class: "Pos(r) T(25vw) Trsp(a) Trsdu(0.5s) Trstf(e)"
			}
		});

		let ele3 = new BaseTextContainer({
			text: 	getDateFormat(),
			textBoxClass: "Ta(c) Ff($ffroboto) Fw(700) Fz(3vw) C(#24565a)",
			wrapperClass: "My(1vw)"
		});
		
		ele3 = ele3.render();
		addComponents({ components: [ele1, ele2, ele3 ], container: ele });
		this.$content2.appendChild(ele);
	}

	refresh(e) {
		this.state.store.dispatch(toggleSharedState());
		this.state.store.dispatch(setUsername(''));
		this.state.store.dispatch(setFocus());
		this.state.store.dispatch(setSelectedCity({}));
		this.$container.remove();
		this.registerComponents();
		this.render();
	}

	renderCity() {
		console.log('RENDER CITY');
		const { covidzone: { states, data, filteredData, username } } = this.getReduxState();
		const { current : { helper } } = this.state;
		let city = new CityList({
			topCities : filteredData,
			statusList: data,
			visible : true,
			helper : username.length === 0 ? helper : false,
			onClick: this.clickHandler
		});
		city = city.render();
		const node = document.getElementsByClassName('overall')[0];
		console.log('FILTERE ', filteredData, city, node);
		if (node) {
			node.parentNode.replaceChild(city, node)
		}
	}

	textBox() {
		const { current : { text1 } } = this.state;
		let textBox = new BaseTextContainer({
			text: text1,
			wrapperClass: "Pos(a) T(8vw) Trsp(a) Trsdu(0.5s) Trstf(e) W(80vw)",
			textBoxClass: "Ta(c) Ff($ffroboto) C(#9e9f9f) Fw(700) Fz(4.5vw)",
		});
		
		textBox = textBox.render();
		return textBox;
	}

	userInput() {
		const { covidzone : { username } } = this.getReduxState();
		const { current : { placeholder } } = this.state;
		let input = new InputContainer({
			inputBoxClass: "Bgc(#5ee0d9) Bxsh($bxshcovidZone) Bdrs(5vw) Bd(n) W(70vw) H(10vw) Pstart(10vw) Ta(l):ph Op(0.4) Fz(4vw):ph O(n):f",
			inputHandler: this.inputHandler,
			text: username,
			placeholder : placeholder,
			focusHandler: this.focusHandler,
			inline: `background: url(${Search}) no-repeat scroll 3vw;background-color:#5ee0d9;`,
			// blurHandler : this.blurHandler
		});
		input = input.render();
		return input;
	}

	focusHandler() {
		const { covidzone: { username, filteredData, focussed } } = this.getReduxState();
		console.log('THIS IS INPUT ', username.length, filteredData.length);
		const { Authorization, language } = this.state;
		if (username.length !== 0 || focussed) return;
		this.$content3.classList.toggle('B(56vw)');
		this.$content3.classList.toggle('B(87vw)');
		this.$bottomImg.classList.toggle('T(83vw)');
		this.$bottomImg.classList.toggle('T(102vw)');
		this.$city.classList.toggle('D(n)');
		// this.$earth.classList.toggle('T(100vw)')
		// this.$earth.classList.toggle('T(30vw)')
		this.$textBox1.classList.toggle('Op(0)');
		this.state.store.dispatch(setFocus());
		genericBigQueryEvent({
			Authorization,
			payload: {
				id: `covidzone_${language}`,
				actionType: "tap",
				data: `language-${language}`,
				postId: 0,
				webcardName : `covidzone`
			}
		});
	}

	blurHandler(focus) {
		this.$content3.classList.toggle('B(56vw)');
		this.$content3.classList.toggle('B(87vw)');
		this.$bottomImg.classList.toggle('T(83vw)');
		this.$bottomImg.classList.toggle('T(102vw)');
		this.$city.classList.toggle('D(n)');
		this.$earth.classList.toggle('T(100vw)')
		this.$earth.classList.toggle('T(30vw)')
		this.$textBox1.classList.toggle('Op(0)');
		this.state.store.dispatch(setFocus());
	}

	getFilteredList() {
		const { covidzone: { data, username, states } } = this.getReduxState();
		const { current : { stateList = "ALL" }, language } = this.state;
		let filteredList = states.filter(obj => obj.language === language);
		if (username.length >= 1) {
			filteredList = data.filter(obj => {
				const alphaExp = new RegExp(`${username.toLowerCase()}`);
				if (stateList === "ALL") return obj.district.toLowerCase().match(alphaExp);
				else {
					return obj.district.toLowerCase().match(alphaExp) && stateList.split("|").includes(obj.state);
				}
			});
		}
		this.state.store.dispatch(setFilteredData(filteredList))
	}


	inputHandler(e) {
		const alphaExp = /^[a-zA-Z]| +$/;
		const name = e.target.value;
    if (name.match(alphaExp)) {
			this.state.store.dispatch(setUsername(name));
			this.getFilteredList();
			setTimeout(this.renderCity, 400);
		}
		if (name.length === 0) {
			this.state.store.dispatch(setUsername(""));
			this.getFilteredList();
			setTimeout(this.renderCity, 400);
		}
	}

	render() {
		const appContainer = document.getElementById("app");
		const { covidzone: { selected } } = this.getReduxState();
		console.log('SHARED ', selected, this.$container);
		// this.update();
		if( !this.$container) return;
		this.$container.innerHTML = ''
		if (selected && selected.district) {
			addComponents({ components : [ this.$content2], container : this.$container });
		} else {
			addComponents({ components: [ this.$input, this.$city], container: this.$content3 });
			addComponents({ components: [this.$textBox1, this.$content3, this.$earth, this.$share], container: this.$content2 });
			addComponents({ components : [this.$content2, this.$content3, this.$bottomImg], container : this.$container });
		}
		addComponents({ components : [this.$container], container :  appContainer});
	}

}

export default CovidZone;