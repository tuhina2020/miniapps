import whatsapp from "@/common/assets/whatsapp-text.svg";
import refresh from "@/common/assets/refresh.svg"
import { createNewDiv, uploadFile } from "@/utils";
export default function({ wrapperClass, svgClass, Authorization, refreshHandler, eventHandler, params}) {
	const icon = createNewDiv({
		type: 'img',
		setAttribute: {
			src : whatsapp,
			class: 'W(100%) H(a)',
			style: "width: 28vw;"
		}
	});
	const reficon = createNewDiv({
		type: 'img',
		setAttribute: {
			src : refresh,
			class:'W(8vw) H(8vw) Mx(10px) Bdrs(4vw) Bd Bgc(lightgrey) P(0.5vw)'
		}
	});
	const wrapper = createNewDiv({
		type: 'div',
		setAttribute: {
			class: wrapperClass
		}
	});
	// const clickHandler = (e, Authorization) => {
	// 	uploadFile({ Authorization, hide:  e.target.parentNode }).then(eventHandler)
	// }

	const clickHandler = (e, params) => {
		uploadFile({ params, hide:  e.target.parentNode }).then(eventHandler)
	}
	wrapper.appendChild(reficon);
	wrapper.appendChild(icon);
	reficon.addEventListener('click',  refreshHandler)
	icon.addEventListener("click", (e) => clickHandler(e, params));
	return wrapper;
}