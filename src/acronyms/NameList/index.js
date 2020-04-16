import {
	createNewDiv,
	addComponents
} from "@/utils";
import BaseTextContainer from "@/common/components/BaseTextContainer";
import _empty from 'lodash/isEmpty';
import _startCase from 'lodash/startCase';
import _toLower from 'lodash/toLower';

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
			const pos = this.getAcronymPos({ letter });
			console.log('EACH ACRONYM ', letter, pos, acronymObj[letter.toUpperCase()]);
			const tb1 = this.textBox({ text: letter.toUpperCase(), textBoxClass: "C(#236a57) Ff(roboto) Fw(700) Fz(3.8vw)", wrapperClass: "W(7vw) Ta(l)" });
			const tb2 = this.textBox({
				text : _startCase(_toLower(
					acronymObj[letter.toUpperCase()][pos]
				)),
				textBoxClass: "C(#4f2a8b) Ff(roboto) Fw(700) Fz(3.8vw)",
				wrapperClass: "My(0.5vw)"
			});
			const container = createNewDiv({ type : 'div', setAttribute: { class : 'D(f)'} });
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
		const container = createNewDiv({ type : 'div', setAttribute: { class: "Mx(10vw)" } });
		console.log(this.state.acronymPos);
		addComponents({ components, container  });
		return container;
	}

}

export default NameList;