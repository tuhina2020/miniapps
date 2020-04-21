import {
	createNewDiv,
	addComponents
} from "@/utils";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import _empty from 'lodash/isEmpty';
import _upperFirst from 'lodash/upperFirst';
import _lower from 'lodash/lowerCase';

class NameList {
	constructor(props) {
		this.props = props;
		this.state = {
			acronymPos: {}
		} // { username, acronymObj }
	}

	getAcronymPos({ letter }) {
		const { acronymPos } = this.state;
		console.log('THIS IS IT : ', acronymPos);
		if (acronymPos[letter.toUpperCase()] === 0){
			this.state.acronymPos[letter.toUpperCase()] = 1;
			return 1;
		}
		if (!acronymPos[letter.toUpperCase()]) {
			this.state.acronymPos[letter.toUpperCase()] = 0;
			return 0;
		}
		if (acronymPos[letter.toUpperCase()] === 1) {
			this.state.acronymPos[letter.toUpperCase()] = 0;
			return 0;
		}
	}

	renderLine(letter) {
		if (!_empty(letter) || letter.length != 0 || letter != ' ') {
			const { acronymObj } = this.props;
			const upLetter = letter.toUpperCase();
			const pos = this.getAcronymPos({ letter });
			console.log('EACH ACRONYM ', letter, pos, acronymObj[upLetter]);
			const tb1 = this.textBox({ text: upLetter, textBoxClass: "C(#236a57) Ff(roboto) Fw(700) Fz(3vw)", wrapperClass: "W(7vw) Ta(l)" });
			const tb2 = this.textBox({
				text : _upperFirst(
					_lower(acronymObj[upLetter][pos])
				),
				textBoxClass: "C(#4f2a8b) Ff(roboto) Fw(700) Fz(3vw) Whs(nw)",
			});
			const container = createNewDiv({ type : 'div', setAttribute: { class : 'D(f) My(1vw) W(a)'} });
			addComponents({ components: [ tb1, tb2 ], container  });
			return container;
		}
	}

	textBox({ text, wrapperClass, textBoxClass, inline }) {
		let textBox = new BaseTextContainer({ text, wrapperClass, textBoxClass, inline });
		textBox = textBox.render();
		return textBox;
	}

	render() {
		let { username } = this.props;
		const components = [];
		username = username.replace(/ |[0-9]|x/g, '')
		for (var i = 0; i < username.length; i++) {
			const letter = username.charAt(i);
			const ele = this.renderLine(letter);
			console.log(ele, 'ELE');
			if (ele) components.push(ele);
		}
		const container = createNewDiv({ type : 'div' });
		console.log(this.state.acronymPos);
		addComponents({ components, container  });
		return container;
	}

}

export default NameList;