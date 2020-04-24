import {
	createNewDiv,
	addComponents,
	bigQueryEvent
} from "@/utils";
import _maxBy from 'lodash/maxBy';
import ImageContainer from "@/common/components/BaseImageContainer";
import TextContainer from "@/common/components/BaseTextContainer";
import _map from 'lodash/map';
import _each from 'lodash/each';

class Channels {
	constructor(props) {
		this.props = props;
		this.state = {};
		this.clickHandler = this.clickHandler.bind(this);
		this.imgClickHandler = this.imgClickHandler.bind(this);
		this.getMaxImpressions();
	}

	renderLine(channel) {
		const { name, id, show, impressions, profile, tagId, picture, display, rank } = channel;
		const { maxImpressions } = this.state;
		const { channels, Authorization, sheetId, eventId } = this.props;
		const total = channels.length;
		let img = new ImageContainer({
			src: picture,
			imgClass: "W(12.69vw) H(a) Bdrs(50%) Bdw(t) Bdc(lightgrey) Bds(s)"
		});

		img = img.render();
		const width = parseInt(rank) * (76/total)

		const text = new TextContainer({ text: name, textBoxClass: "Fw(600) Fz(4.1vw) Lh(5.3vw) C(#4a4a59) Ff(Inter)" });
		const histogramText = new TextContainer({
			text: display,
			textBoxClass: "H(7vw) Bgc(#1990bf) Bdrs(3.5vw) Fw(500) Ff(Inter) Fz(2.7vw) P(1.74vw) Pstart(3.4vw) C(white) Whs(nw)",
			inline: `width:${width}vw`
		})
		const textContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: "Mstart(2vw)",
				style: "width: -webkit-fill-available;"
			}
		});

		addComponents({ components : [text.render(), histogramText.render()], container: textContainer });

		textContainer.addEventListener("click", (e) => this.clickHandler({ Authorization, tagId, sheetId, eventId }));
		img.addEventListener("click", (e) => this.imgClickHandler({ Authorization, profile, sheetId, eventId }));

		const components = [img, textContainer];


		const container = createNewDiv({
			type: 'div',
			setAttribute: {
				class: "D(f) My(4vw)"
			}
		});

		addComponents({ components, container });
		return container;
	}

	clickHandler({ tagId, Authorization, sheetId, eventId }) {
		bigQueryEvent({
			Authorization,
			payload: {
				id: eventId,
				actionType: "tagOpen",
				data: `sheetId-${sheetId}--tagId-${tagId}`,
				postId: 0,
				webcardName : `TRENDING_TV_${eventId}`
			}
		});
		const payload = {
			"action":"open_activity",
			"type":"tag",
			"referrer":"webPost",
			"tagId": tagId
		}
		console.log(payload);
		Android.onAction(JSON.stringify(payload));
	}

	imgClickHandler({ profile, Authorization, sheetId, eventId }) {
		bigQueryEvent({
			Authorization,
			payload: {
				id: eventId,
				actionType: "profileOpen",
				data: `sheetId-${sheetId}--profileId-${profile}`,
				postId: 0,
				webcardName : `TRENDING_TV_${eventId}`
			}
		});
		const payload = {
			"action":"open_activity",
			"type":"profile",
			"self":false,
			"referrer":"webPost",
			"userId": profileId
		};
		console.log(payload);
		Android.onAction(JSON.stringify(payload));
	}

	getMaxImpressions() {
		this.state.maxImpressions = parseInt(_maxBy(this.props.channels, c => parseInt(c.impressions)).impressions);
		const channels = _map(this.props.channels, c => {
			c.display = Math.floor(parseInt(c.impressions)/1000) + 'K people';
			console.log(parseInt(c.impressions)/1000);
			return c;
		});
		this.props.channels = channels;
	}

	render() {
		const container = createNewDiv({
			type: 'div'
		});
		const { channels } = this.props;
		const components = [];
		_each(channels, channel => {
			components.push(this.renderLine(channel));
		});

		addComponents({ components, container });

		return container;
	}
}

export default Channels;