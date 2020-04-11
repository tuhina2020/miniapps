import { createNewDiv } from '@/utils';
class BaseTextContainer {
	constructor(props) {
		this.state = props || {};
		this.click = this.click.bind(this);
		this.render();
	}

	render() {
		const { textBoxClass, wrapperClass, text } = this.state;
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
		textBox.addEventListener('click', this.click);
		wrapper.appendChild(textBox);
		return wrapper;
	}

	click(e) {
		const { clickHandler, store } = this.state;
		store.dispatch(clickHandler());
	}
};

export default BaseTextContainer;