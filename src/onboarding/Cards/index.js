import {
	createNewDiv,
	addComponents,
	genericBigQueryEvent,
} from "@/utils";

import _map from 'lodash/map';
import _each from 'lodash/each';
import _sortBy from 'lodash/sortBy';
import _compact from 'lodash/compact';
import _values from 'lodash/values';
import _omitBy from 'lodash/omitBy';
import _keys from 'lodash/keys';
import TextContainer from "@/common/components/BaseTextContainer";
import IconContainer from "@/common/components/BaseIconContainer";
import './index.css'

class Cards {
	constructor(props) {
		this.props = props;
		this.state = {
			selection : this.getSelection(props.cards)
		}
		this.clickHandler = this.clickHandler.bind(this);
		this.delayClick = this.delayClick.bind(this);
		this.renderLine = this.renderLine.bind(this);
		this.updateSelection = this.updateSelection.bind(this);
	}

	getSelection(cards) {
		const obj = {};
		_each(cards, c => {
			obj[c.id] = false;
		});
		return obj;
	}

	renderLine(card) {
		const { rank, genre, genreText, picture, tags, id , selected = false} = card;
		console.log(selected);
		const cardContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: `single-card-container-${id} Mx(2.2vw) My(2.2vw) H(22.22vw) Bdrs(1.1vw) Bxsh($bxshimageOnboarding)`
			}
		});
		let text1 = new TextContainer({
			text,
			textBoxClass: "Ff(Mukta) Fw(600) Fz(4.4vw) Lh(5.5vw) C(white)",
			wrapperClass: `Ta(c) Pos(r) B(13vw) W(42.22vw) hidden-text-container-${id} D(n)`
		});
		const cornerIcon = new IconContainer({
			iconFilePath: 'check-black',
			wrapperClass: `icon-container-${id} Pos(r) B(21vw) Start(1vw) W(5vw) H(5vw) Bgc(white) Bdrs(1vw) D(f) Op(0) Trsp(a) Trsdu(0.4s) Trstf(e)` ,
			svgClass: 'H(5vw) Fill(#1990bf) C(white) Bg(n) W(5vw)'
		});
		text = text.render();
		addComponents({
			components : [text],
			container: cardContainer
		});
		cardContainer.addEventListener('click', e => this.clickHandler(id));
		return cardContainer;
	}

	clickHandler(id) {
		const flag = this.updateSelection(id);
		if ( !flag ) return;
		setTimeout(() => this.delayClick(id), 500);
	}

	delayClick(id) {
		document.getElementsByClassName(`image-container-${id}`)[0].parentNode.classList.toggle('Bgc(#1990bf)');
		document.getElementsByClassName(`image-container-${id}`)[0].parentNode.classList.toggle('imgBgripple');
		document.getElementsByClassName(`image-container-${id}`)[0].classList.toggle('imageripple');
		document.getElementsByClassName(`image-container-${id}`)[0].classList.toggle('Op(0.4)');
		document.getElementsByClassName(`text-${id}`)[0].classList.toggle('textripple');
		document.getElementsByClassName(`text-${id}`)[0].classList.toggle('C(#4a4a59)');
		document.getElementsByClassName(`text-container-${id}`)[0].classList.toggle('positionripple');
		document.getElementsByClassName(`text-container-${id}`)[0].classList.toggle('Bgc(#eaf5fe)');
		document.getElementsByClassName(`text-container-${id}`)[0].classList.toggle('B(10.3vw)');
		document.getElementsByClassName(`icon-container-${id}`)[0].classList.toggle('Op(0)');
		document.getElementsByClassName(`icon-container-${id}`)[0].classList.toggle('iconripple');
		const { cardClickHandler } = this.props;
		const { selection } = this.state;
		cardClickHandler(_keys(_omitBy(selection, k => !k)));
	}

	updateSelection(id) {
		let { selection } = this.state;
		const { maxOptions = 3 } = this.props;
		const count = _compact(_values(selection)).length;
		const selected = selection[id];
		if ( count >= maxOptions && !selected) return false;
		selection[id] = selection[id] ? !selection[id] : true;
		this.state.selection = selection;
		return true;
	}

	render() {
		const { cards } = this.props;
		const cardsContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: 'D(f) Flw(w) Mx(3.3vw)'
			}
		});
		const components = _map(_sortBy(cards, c => parseInt(c.rank)), this.renderLine);
		addComponents({
			 components,
			 container: cardsContainer
		});
		this.$cards = components;
		return cardsContainer;
	}
}

export default Cards;