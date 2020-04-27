import { createNewDiv } from "@/utils";
export default function({ wrapperClass, svgClass, iconFilePath }) {
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
	return wrapper;
}