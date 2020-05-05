import styles from './index.css';
import { createNewDiv }from '@/utils';
import _get from 'lodash/get';

export default class InputContainer {
    constructor(props) {
			this.state = props;
    }
    render() {
			const {
				wrapperClass,
				inputBoxClass,
				text,
				store,
				placeholder = 'Please Enter Your Name',
				maxLength,
				inline,
				inputHandler,
				focusHandler = () => {},
				blurHandler = () => {},
				prependIcon
			} = this.state;
			let img;
			if (prependIcon) {
				img = require(`@/common/assets/${prependIcon}.svg`);
			}
			const input = createNewDiv({
				type: 'input',
				setAttribute: {
					id: 'input-username',
					class: inputBoxClass,
					type: 'text',
					maxLength,
					placeholder,
					autocomplete: "off",
					style: inline
				}
			});
			input.innerText = text;
			input.addEventListener('input', inputHandler);
			input.addEventListener('focus', focusHandler);
			input.addEventListener('blur', blurHandler);
			const wrapper = createNewDiv({
				type: 'div',
				setAttribute: {
					class: wrapperClass,
				}
			});
			wrapper.appendChild(input);
			return wrapper;
		}
}