import styles from './index.css';
import * as utils from '@/utils';

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
        const wrapper = utils.createNewDiv({
            type: 'div',
            setAttribute: {
                class: 'input-wrapper',
                id: 'input-wrapper'
            }
        });

        const button = utils.createNewDiv({
            type: 'button',
            setAttribute: {
                id: 'submit',
            }
        });

        button.innerText = 'Share';

        wrapper.appendChild(input);
        wrapper.appendChild(button);
        return wrapper;
    }

    addTextOverlay() {
        const { name } = this.state;
        if(!name) return;
        const textContainer = utils.createNewDiv({
            type: "div",
            setAttribute: { class: "diwali-text-container", id: 'diwali-text-container' }
        });
        const overlay1 = utils.createNewDiv({
            type: 'div',
            setAttribute: {
              class: 'overlay1'
            }
          });
        overlay1.innerText = name;
        const overlay2 = utils.createNewDiv({
            type: 'div',
            setAttribute: {
                class: 'overlay2'
            }
        });
        overlay2.innerText = 'Wishes';
        textContainer.appendChild(overlay1);
        textContainer.appendChild(overlay2);
        const appContainer = document.getElementById("app");
        appContainer.appendChild(textContainer);
    }

    removeTextOverlay() {
       const node = document.getElementById('diwali-text-container')
       if(node) node.remove();
    }

    events() {
        const input = document.getElementById('input-wrapper');
        const self = this;
        const changeHandler = (e) => {
            const { target: { value } } = e;
            self.state.name = value;
            this.removeTextOverlay();
            this.addTextOverlay();
            console.log('THIS IS IT : ', self.state);
        };
        input.addEventListener('keyup', changeHandler);
    }
}