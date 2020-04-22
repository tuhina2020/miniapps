import {
	createNewDiv,
	addComponents,
	bigQueryEvent,
} from "@/utils";

import _map from 'lodash/map';
import _each from 'lodash/each';
import _sortBy from 'lodash/sortBy';

import ImageContainer from "@/common/components/BaseImageContainer";
import TextContainer from "@/common/components/BaseTextContainer";

class Cards {
	constructor(props) {
		this.props = props;
	}

	renderLine(card) {
		const { rank, genre, genreText, picture, tags } = card;
		const cardContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'single-card-container'
			}
		});

		let img = new ImageContainer({
			src: picture,
			// clickHandler: () => this.bannerClickHandler({
			// 	url: topClickEvent
			// }),
			// imgClass: "W(100%)"
		});
		img = img.render();
		let text = new TextContainer({
			text: genreText
		});
		text = text.render();
		console.log('YOYO',img, text);
		addComponents({
			components : [img, text],
			container: cardContainer
	 });
	 console.log('YOYO');
	 return cardContainer;
	}

	render() {
		const { cards } = this.props;
		const cardsContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'cards-container'
			}
		});
		const components = _map(_sortBy(cards, c => parseInt(c.rank)), this.renderLine);
		console.log('THIS IS IT ', components);
		addComponents({
			 components,
			 container: cardsContainer
		});
		return cardsContainer;
	}
}

export default Cards;