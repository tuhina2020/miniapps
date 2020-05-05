import BaseTextContainer from "@/common/components/BaseTextContainer";
import { createNewDiv, toggleCSSclasses } from '@/utils';
import './index.css'

class CityList {
	constructor(props) {
		this.props = props;
		this.renderLine = this.renderLine.bind(this);
		this.emptyView = this.emptyView.bind(this);
		this.delayClick = this.delayClick.bind(this);
	}

	renderLine({ city, index, last }) {
		const { statusList } = this.props;
		const filteredList = statusList.filter(obj => {
			return (obj.district === city.district);
		})[0];

		const { zone } = filteredList;

		const colorMap = {
			"Orange Zone" : "#ff6f00",
			"Red Zone" : "#d10808",
			"Green Zone": "#148707"
		}

		let textBox = new BaseTextContainer({
			text: city.district,
			wrapperClass: "",
			textBoxClass: "Ta(l) Ff($ffroboto) C(grey) Fw(700) Fz(4vw)",
		});
		textBox = textBox.render();

		const cardContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: `single-text-${index} D(f) Ai(c) Jc(sb) P(2vw) ${index === last ? '' : 'Bdb($bdGrey) Pos(r) Ov(h) Trf($trsrippleTranslate)'}`
			}
		});
		
		cardContainer.appendChild(textBox);
		textBox = createNewDiv({
			type: 'div',
			setAttribute: {
				class: `W(3vw) H(3vw) Bdrs(50%)`,
				style: `background-color:${colorMap[zone]}`
			}
		});
		cardContainer.appendChild(textBox);
		cardContainer.addEventListener('click', (e) => this.delayClick({ filteredList, index }));
		return cardContainer;
	}

	delayClick({ filteredList, index }) {
		const cardContainer = document.getElementsByClassName(`single-text-${index}`)[0];
		cardContainer.classList.add('ripple')
		const { onClick = () => {} } = this.props;
		setTimeout(() => onClick(filteredList), 500);
	}

	emptyView() {
		let textBox = new BaseTextContainer({
			text: "No Districts Found. Try Again",
			wrapperClass: "H(14vw) D(f) Jc(c) Ai(c)",
			textBoxClass: "Ta(c) Ff($ffroboto) C(grey) Fw(500) Fz(3.5vw)",
		});
		textBox = textBox.render();
		return textBox;
	}

	render() {
		const { topCities, visible = true } = this.props;
		const cardContainer = createNewDiv({
			type: 'div',
			setAttribute: {
				class: `overall W(70vw) Bgc(#f6feff) Bdrs(2vw) My(2vw) ${visible} ${visible ? '' : 'D(n)'} Bxsh($bxshcovidZone2)`
			}
		});
		if (topCities.length === 0) {
			const c = this.emptyView();
			cardContainer.appendChild(c);
		} else {
			topCities.slice(0,6).forEach((city, index) => {
				const component = this.renderLine({ city, index, last : topCities.slice(0,6).length - 1 });
				cardContainer.appendChild(component);
			});
		}
		return cardContainer;
	}
}

export default CityList;