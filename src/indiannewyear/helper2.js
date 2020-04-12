import TamilBeforeBg from '@/indiannewyear/assets/background/before/tamil.png'
import TamilAfterBg from '@/indiannewyear/assets/background/after/tamil.png'
import malayalamBeforeBg from '@/indiannewyear/assets/background/before/malayalam.png'
import malayalamAfterBg from '@/indiannewyear/assets/background/after/malayalam.png'
import odiaBeforeBg from '@/indiannewyear/assets/background/before/odia.png'
import odiaAfterBg from '@/indiannewyear/assets/background/after/odia.png'
import assamBeforeBg from '@/indiannewyear/assets/background/before/assam.png'
import assamAfterBg from '@/indiannewyear/assets/background/after/assam.png'

export const LANGUAGE_WISE_INIT_BACKGROUNDS = {
	Tamil : TamilBeforeBg,
	Malayalam: malayalamBeforeBg,
	Odia: odiaBeforeBg,
	Assamese: assamBeforeBg
}

export const LANGUAGE_WISE_FINAL_BACKGROUNDS = {
	Tamil: TamilAfterBg,
	Malayalam: malayalamAfterBg,
	Odia: odiaAfterBg,
	Assamese: assamAfterBg
}

export const EXCEL_DATA = {
	sheetId: "1vsKD2gFaUtKT_kVu3XVFwlrPzyDboRtI6lmpxXEsjJ8",
	page: 1,
	columns: 3
}

export const INPUT_WRAPPER_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(55vw) Mx(25%)",
		wrapperClass: "P(10px)",
		inputBoxClass: "Bdrs(4px) Bgc(#343517) H(8vw) W(50vw) Fz(3vw) P(3vw) Ff($ffroboto) Bd C(#956304) Bxz(bb) Bd(n):h Bdc(t):h"
	}
}

export const ENTER_BUTTON_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(68vw) Mx(35%) Ta(c) W(30%)",
		wrapperClass: "P(10px)",
		textBoxClass: "C(white) Bgc(#3F270F) Fw(700) Ff($ffroboto) Py(10px) Px(20px) Bdrs(5px) Fz(3vw)"
	}
}

export const TEXT_BOX_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(38vw) W(50%) Mx(25%)",
		wrapperClass: "My(3vw) Mx(16.6vw)",
		textBoxClass: "Ff($ffroboto) Fw(500) Fz(3vw) Lh(3.8vw) C(#3F270F) Ta(c) C(#956304)"
	}
}

export const TEXT_BOX2_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(9vw) W(64%) Mx(18%)",
		wrapperClass: "My(6vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(3.8vw) C(#3F270F) Ta(c) C(#956304)"
	}
}

export const NAME_BOX_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(77vw) W(50%) Mx(25%)",
		wrapperClass: "P(10px)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(5.2vw) C(#3F270F) Ta(c)"
	}
}

