import { createNewDiv } from '@/utils';
class BaseTextContainer {
	constructor(props) {
		this.state = props || {};
		this.click = this.click.bind(this);
		this.render();
	}

	render() {
		const { textBoxClass, wrapperClass, text, inline, clickHandler } = this.state;
		const wrapper = createNewDiv({
			type: 'div',
			setAttribute: {
				class: wrapperClass
			}
		});

		const textBox = createNewDiv({
			type: 'div',
			setAttribute: {
				class: textBoxClass,
				style: inline
			}
		});
		textBox.innerText = text;
		if (clickHandler) textBox.addEventListener('click', this.click);
		wrapper.appendChild(textBox);
		return wrapper;
	}

	click(e) {
		const { clickHandler } = this.state;
		clickHandler();
	}
};

export default BaseTextContainer;