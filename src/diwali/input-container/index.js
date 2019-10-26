import styles from './index.css';
import * as utils from '@/utils';
import whatsapp from '@/diwali/assets/whatsapp.png';
import _get from 'lodash/get';
import _each from 'lodash/each';

export default class InputContainer {
    constructor(props) {
        this.state = props;
    }

    imageToBackground(hide) {
        this.state.hide = hide;
        _each(['background-video', 'diwali-text-container'], (id) => {
            const ele1 = document.getElementById(id);
            if(hide && ele1) {
                ele1.classList.add("hide-video");
            } else if(ele1) {
                ele1.classList.remove("hide-video");
            }
        });
        this.toggleVisibility({ hide , id : 'loading-wrapper' });
        const input = document.getElementById('input-username');
        if (hide && input) {
            input.setAttribute('disabled', true);
        } else if (input) {
            input.removeAttribute('disabled');
        }
    }

    toggleVisibility({ hide , id }) {
        const ele = document.getElementById(id);
        if(hide && ele) {
            ele.classList.remove('hide-loader')
        } else if (ele) {
            ele.classList.add("hide-loader");
        }
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
              class: 'overlay1',
              id: 'overlay1'
            }
          });
        overlay1.innerText = name;
        const overlay2 = utils.createNewDiv({
            type: 'div',
            setAttribute: {
                class: 'overlay2',
                id: 'overlay2'
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
        const changeHandler = (e) => {
            const { target: { value }, keyCode } = e;
            let val;
            this.toggleVisibility({ hide : false , id : 'error-text' });
            this.sentMessage( '','error-text')
            if(value.length > 12) val = value.slice(0,12);
            if(keyCode === 13) {
                return this.getGifByName()
                .catch(err => console.log(err));
                // self.createPost()
                // .then(this.whatsappShare)
            }
            this.state.name = (val || value);
            this.removeTextOverlay();
            this.addTextOverlay();
        }
        input.addEventListener('keyup', changeHandler);
        const button = document.getElementById('submit');
        const submit = (e) => {
            this.getGifByName()
              .catch(err => console.log(err));
            // self.createPost()
            // .then(this.whatsappShare)
        };
        button.addEventListener('click', submit);
    }

    sentMessage(text, id='overlay2') {
        const ele = document.getElementById(id);
        ele.innerText = text;
    }

    getGifByName() {
        const { name, Authorization } = this.state;
        console.log('NAME ', name)
        if(!name || (name && name.length === 0)) {
            this.toggleVisibility({ hide : true , id : 'error-text' });
            this.sentMessage( 'Please Enter Your name','error-text');
            return Promise.resolve();
        } else {
            const requestObj = {
                url: 'https://apis.sharechat.com/festive-webcard-service/generateVideo',
                method: 'POST',
                headers: { Authorization },
                body: {
                    "festivalName": "Diwali",
                    "wisherName": name
                }
            };
            this.imageToBackground(true);
            return utils
                .request(requestObj)
                // .then((data) => this.createPost({ data, Authorization }))
                // .then(data => { this.sentMessage(JSON.stringify(data)); return data; })
                .then((data) => { this.imageToBackground(false); return data; })
                .then((data) => { this.resetText();  return data; })
                .then(this.whatsappShare)
                .catch((err) => { this.imageToBackground(false); })
        }
    }

    whatsappShare(data) {
        // console.log(data, 'WHATSAPP SHARE')
        const postId = _get(data, 'PostDetails.postId', 595856933);
        const json = {
            type : "shareWebCard",
            postId: postId.toString()
        };

        console.log(json);
        Android.onAction(JSON.stringify(json));
    }

    resetText() {
        console.log('RESET ')
        const input = document.getElementById('input-username');
        input.value = null;
        this.state.name = null;
        document.getElementById('overlay1') && document.getElementById('overlay1').remove();
        document.getElementById('overlay2') && document.getElementById('overlay2').remove();
    }

    createPost({ data, Authorization }) {
        const { videoDetails: { fileUrl } } = data;
        const requestObj = {
            url : "https://restapi1.sharechat.com/requestType47",
             method: 'POST',
             headers: { /*Authorization*/ },
             body: {
                "bn": "broker1",
                "client": "android",
                "deviceId": "8635fe6be2f187fd",
                "message": {
                  "webcard": true,
                  "a": "288330914",
                  "m": "Hindi",
                  "y": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Frangipani_flowers.jpg/800px-Frangipani_flowers.jpg",
                  "c": "##diwali#",
                  "captionTagsList": [
                    {
                      "bucketId": "11",
                      "bucketName": "शुभकामनाएं एवं सुविचार",
                      "isAdult": false,
                      "tagId": "845755",
                      "tagName": "#diwali#"
                    }
                  ],
                  "cd": 0,
                  "create_type": "File Manager",
                  "d": 0,
                  "encodedTextV2": "{[{845755}]} ",
                //   "e": fileUrl,
                  "liveStatus": false,
                  "q": "video/mp4",
                  "optionsPoll": [],
                  "pi": Date.now(),
                  "postCreationLatLong": "12.936936936936936,77.60959875038247",
                  "postCreationLocation": "bangalore urban, KA",
                  "h": 360,
                  "z": 2073254,
                  "t": "video",
                  "w": 360,
                  "o": Date.now(),
                  "sd": 0,
                  "ad": 1,
                  "createdVia": "web_card_diwali",
                  "tt": [
                    {
                      "i": "845755",
                      "n": "#diwali#"
                    }
                  ],
                  "i": "-1571858786412",
                  "b": "https://cdn.sharechat.com/399a61d3-1df3-4f10-b466-af970f81fc29-dce5d96c-e9ba-40cd-8c1e-f0eca6de11ef_thumb.jpg",
                  "urlList": [],
                  "n": "-",
                  "v": fileUrl
                },
                "passCode": "1573236412398651",
                "resTopic": "response/user_288330914_3aff1f244aecde3eaa86",
                "userId": "288330914"
               }
        }
        return utils
            .request(requestObj)
    }
}