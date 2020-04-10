import styles from './index.css';
import * as utils from '@/utils';
import whatsapp from '@/common/assets/whatsapp-text.svg';

export default class InputContainer {
    constructor(props) {
        this.state = props;
    }
    render() {
			const input = utils.createNewDiv({
					type: 'input',
					setAttribute: {
							id: 'input-username',
							type: 'text',
							maxLength: 15,
							placeholder: 'Enter your name'
					}
			});
			input.val = localStorage.getItem('name');
			const wrapper = utils.createNewDiv({
					type: 'div',
					setAttribute: {
							class: 'input-wrapper',
							id: 'input-wrapper'
					}
			});

			const w = utils.createNewDiv({
					type: 'img',
					setAttribute: {
							class: 'whatsapp',
							src: whatsapp
					}
			})

			const button = utils.createNewDiv({
					type: 'div',
					setAttribute: {
							id: 'submit',
							class: 'hide-loader'
					}
			});

			button.innerText = 'Share';
			button.appendChild(w);
			wrapper.appendChild(input);
			wrapper.appendChild(button);
			return wrapper;
    }

		
    resetText() {
        console.log('RESET ')
        const input = document.getElementById('input-username');
        input.value = null;
        this.state.name = null;
        document.getElementById('overlay1') && document.getElementById('overlay1').remove();
        document.getElementById('overlay2') && document.getElementById('overlay2').remove();
    }
}