import styles from './index.css';
import * as utils from '@/utils';
import _get from 'lodash/get';

export default class InputContainer {
    constructor(props) {
			this.state = props;
			this.usernameHandler = this.usernameHandler.bind(this)
    }
    render() {
			const {  wrapperClass, inputBoxClass, text, store } = this.state;
			const input = utils.createNewDiv({
				type: 'input',
				setAttribute: {
					id: 'input-username',
					class: inputBoxClass,
					type: 'text',
					maxLength: 15,
					placeholder: 'Please Enter Your Name'
				}
			});
			input.addEventListener('input', this.usernameHandler);
			const wrapper = utils.createNewDiv({
				type: 'div',
				setAttribute: {
					class: wrapperClass,
				}
			});
			wrapper.appendChild(input);
			return wrapper;
		}

		usernameHandler(e) {
			const { setUserName, store } = this.state;
			store.dispatch(setUserName(e.target.value));
		}
}