import whatsapp from "@/common/assets/whatsapp-text.svg";
import refresh from "@/common/assets/refresh.svg"
import { createNewDiv, uploadFile } from "@/utils";
export default function({ wrapperClass, svgClass, Authorization, refreshHandler, eventHandler}) {
	const icon = createNewDiv({
		type: 'img',
		setAttribute: {
			src : whatsapp,
			class: 'W(100%) H(a)'
		}
	});
	const reficon = createNewDiv({
		type: 'img',
		setAttribute: {
			src : refresh,
			style:'width: 16vw;',
			class:'W(100%) H(a) Mx(10px)'
		}
	});
	const wrapper = createNewDiv({
		type: 'div',
		setAttribute: {
			class: wrapperClass
		}
	});
	const clickHandler = (e, Authorization) => {
		uploadFile({ Authorization, hide:  e.target.parentNode }).then(eventHandler)
	}
	wrapper.appendChild(reficon);
	wrapper.appendChild(icon);
	reficon.addEventListener('click',  refreshHandler)
	icon.addEventListener("click", (e) => clickHandler(e, Authorization));
	return wrapper;
}