import { createNewDiv } from "@/utils";
class BaseImageContainer {
	constructor(props) {
		this.props = props;
	}

	render() {
		const { wrapperClass, imgClass, src, clickHandler = () => {} } = this.props;
		const img = createNewDiv({
			type: 'img',
			setAttribute: {
				src,
				class: imgClass
			}
		});

		const wrapper = createNewDiv({
			type: 'div',
			setAttribute: {
				class: wrapperClass
			}
		});

		wrapper.appendChild(img);

		wrapper.addEventListener("click", clickHandler);
		return wrapper;
	}
}

export default BaseImageContainer;