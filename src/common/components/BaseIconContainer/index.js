import { createNewDiv } from "@/utils";
export default function({ wrapperClass, svgClass, iconFilePath, clickHandler = () => {} }) {
	const img = require(`@/common/assets/${iconFilePath}.svg`);
	const icon = createNewDiv({
		type: 'img',
		setAttribute: {
			src :img,
			class: svgClass
		}
	});
	const wrapper = createNewDiv({
		type: 'div',
		setAttribute: {
			class: wrapperClass
		}
	});
	wrapper.appendChild(icon);
	wrapper.addEventListener("click", clickHandler);
	return wrapper;
}