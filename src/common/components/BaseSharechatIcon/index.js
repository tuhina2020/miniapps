import { createNewDiv } from "@/utils";
import sharechatLight from "@/common/assets/sharechat-icon-light.svg";
import sharechatDark from "@/common/assets/sharechat-icon-dark.svg";
export default function({ wrapperClass, svgClass, dark = true }) {
	const icon = createNewDiv({
		type: 'img',
		setAttribute: {
			src : dark ? sharechatDark : sharechatLight,
			class: 'W(100%) H(a)'
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