import { createNewDiv } from '@/utils';
class BaseTextContainer {
	constructor(props) {
		this.state = props || {};
		this.render()
	}

	render() {
		const { textBoxClass, wrapperClass } = this.state;
		const wrapper = createNewDiv({
			type: 'div',
			setAttribute: {
				class: wrapperClass
			}
		});

		const textBox = createNewDiv({
			type: 'div',
			setAttribute: {
				class: textBoxClass
			}
		});
		textBox.innerText = text;
		wrapper.appendChild(textBox);
		return wrapper;
	}
};

export default BaseTextContainer;