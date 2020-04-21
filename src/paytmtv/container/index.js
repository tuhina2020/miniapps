import {
	createNewDiv,
	getAuthorization,
	getAppVersion,
	getDataExcel,
	addComponents,
	bigQueryEvent,
	request
} from "@/utils";
import { setTVChannels, setMetaData } from "@/common/actions/TemplateTrendingTVChannels";
import ImageContainer from "@/common/components/BaseImageContainer";
import ChannelContainer from '@/paytmtv/Channel';
import TextContainer from "@/common/components/BaseTextContainer";
import _each from 'lodash/each';

class TrendingTV {
	constructor({ store }) {
		this.getFonts();
    document.title = "ShareChat | Trending TV";
    this.state = {
			store: store
		};
		this.getParams();
    this.state.Authorization = getAuthorization(this.state);
		this.state.appVersion = getAppVersion();
		this.bannerClickHandler = this.bannerClickHandler.bind(this);
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
			href: "https://fonts.googleapis.com/css2?family=Inter:wght@500;600&display=swap",
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
		this.state.sheetId = url.searchParams.get("sheetId") || '1RxB_fAXUg5ISF6gLZHdGntxTq60GcCysuKFQjdhe7_A';
		this.state.page = parseInt(url.searchParams.get("page") || 1);
		this.state.columns = parseInt(url.searchParams.get("columns") || 6);
		this.state.meta = parseInt(url.searchParams.get("meta") || 6);
		console.log(this.state);
	}

	getDisplayText() {
		const { sheetId, page, columns } = this.state;
		return getDataExcel({ sheetId, page, columns }).then(data => {
			this.state.store.dispatch(setTVChannels(data));
		});
	}

	getMetaData() {
		const { sheetId, meta } = this.state;
		return getDataExcel({ sheetId, page: meta, columns: 2 }).then(data => {
			const obj = {};
			_each(data, d => {
				obj[d.key] = d.value;
			})
			this.state.store.dispatch(setMetaData(obj));
		});
	}

	bannerClickHandler({ url }) {
		if (url) {
			return fetch(url)
			.then(v => console.log(v))
			.catch(err => console.log(err));
		}
	}

	renderChannels(tvChannels) {
		const channels = new ChannelContainer({
			channels : tvChannels
		});
		return channels.render();
	}

	registerComponents() {
		const { trendingTV: { metadata: { top, bottom, heading, topClickEvent, bottomClickEvent, viewEvent }, tvChannels }} = this.getReduxState();
		this.bannerClickHandler({
			url: viewEvent
		});
		let img = new ImageContainer({
			src: top,
			clickHandler: () => this.bannerClickHandler({
				url: topClickEvent
			}),
			imgClass: "W(100%)"
		});
		this.$top = img.render();
		img = new ImageContainer({
			src: bottom,
			clickHandler: () => this.bannerClickHandler({
				url: bottomClickEvent
			}),
			imgClass: "W(100%)"
		});
		this.$bottom = img.render();
		const main = this.renderChannels(tvChannels);
		let header = new TextContainer({ text: heading, textBoxClass: "Fw(600) Fz(4.1vw) Lh(5.3vw) C(#4a4a59) Ff(Inter)", wrapperClass: "Mb(4vw)" });
		header = header.render();
		this.$main = createNewDiv({
			type: "div",
			setAttribute: { class: "Px(4.7vw) Py(3.2vw)" }
		});
		addComponents({ components: [header, main], container: this.$main });

		this.$container = createNewDiv({
			type: "div",
			setAttribute: { class: "trending-container" }
		});
	}

	getReduxState() {
		return this.state.store.getState();
	}

	render() {
		const appContainer = document.getElementById("app");
		console.log('THIS IS IT ', this.$container, appContainer);
		addComponents({ components : [this.$top, this.$main, this.$bottom], container : this.$container });
		addComponents({ components : [this.$container], container :  appContainer});
	}
}

export default TrendingTV;