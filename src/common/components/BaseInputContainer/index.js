import styles from './index.css';
import { createNewDiv }from '@/utils';
import _get from 'lodash/get';

export default class InputContainer {
    constructor(props) {
			this.state = props;
			this.usernameHandler = this.usernameHandler.bind(this)
    }
    render() {
			const {  wrapperClass, inputBoxClass, text, store, focus, placeholder = 'Please Enter Your Name', maxLength } = this.state;
			console.log('THIS IS TEXT ', text);
			const input = createNewDiv({
				type: 'input',
				setAttribute: {
					id: 'input-username',
					class: inputBoxClass,
					type: 'text',
					maxLength,
					placeholder
				}
			});
			input.innerText = text;
			focus && input.focus();
			focus && input.select();
			input.addEventListener('input', this.usernameHandler);
			const wrapper = createNewDiv({
				type: 'div',
				setAttribute: {
					class: wrapperClass,
				}
			});
			wrapper.appendChild(input);
			return wrapper;
		}

		usernameHandler(e) {
			const { inputHandler } = this.state;
			inputHandler(e.target.value);
		}
}