import TamilBeforeBg from '@/indiannewyear/assets/background/before/tamil.png'
import TamilAfterBg from '@/indiannewyear/assets/background/after/tamil.png'
import malayalamBeforeBg from '@/indiannewyear/assets/background/before/malayalam.png'
import malayalamAfterBg from '@/indiannewyear/assets/background/after/malayalam.png'
import odiaBeforeBg from '@/indiannewyear/assets/background/before/odia.png'
import odiaAfterBg from '@/indiannewyear/assets/background/after/odia.png'
import assamBeforeBg from '@/indiannewyear/assets/background/before/assam.png'
import assamAfterBg from '@/indiannewyear/assets/background/after/assam.png'
import bengaliBeforeBg from '@/indiannewyear/assets/background/before/bengali.png'
import bengaliAfterBg from '@/indiannewyear/assets/background/after/bengali.png'

export const LANGUAGE_WISE_INIT_BACKGROUNDS = {
	Tamil : TamilBeforeBg,
	Malayalam: malayalamBeforeBg,
	Odia: odiaBeforeBg,
	Assamese: assamBeforeBg,
	Bengali: bengaliBeforeBg
}

export const LANGUAGE_WISE_FINAL_BACKGROUNDS = {
	Tamil: TamilAfterBg,
	Malayalam: malayalamAfterBg,
	Odia: odiaAfterBg,
	Assamese: assamAfterBg,
	Bengali: bengaliAfterBg
}

export const EXCEL_DATA = {
	sheetId: "1vsKD2gFaUtKT_kVu3XVFwlrPzyDboRtI6lmpxXEsjJ8",
	page: 1,
	columns: 6
}

export const INPUT_WRAPPER_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(55vw) Mx(25%)",
		wrapperClass: "M(2.7vw)",
		inputBoxClass: "Bdrs(4px) Bgc(#343517) H(8vw) W(50vw) Fz(3vw) P(3vw) Ff($ffroboto) Bd C(#956304) Bxz(bb) Bd(n):h Bdc(t):h"
	},
	Odia: {
		wrapperClass: "M(2.7vw)",
		inputBoxClass: "Bdrs(4px) Bgc(#b5687a) H(8vw) W(50vw) Fz(3vw) P(3vw) Ff($ffroboto) Bd C(#b5687a) Bxz(bb) Bd(n):h Bdc(t):h"
	},
	Malayalam: {
		// wrapperClass: "Pos(a) T(55vw) Mx(25%)",
		wrapperClass: "M(2.7vw)",
		inputBoxClass: "Bdrs(4px) Bgc(#343517) H(8vw) W(50vw) Fz(3vw) P(3vw) Ff($ffroboto) Bd C(#8ea253) Bxz(bb) Bd(n):h Bdc(t):h"
	},
}

export const ENTER_BUTTON_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(68vw) Mx(35%) Ta(c) W(30%)",
		wrapperClass: "M(2.7vw)",
		textBoxClass: "C(white) Bgc(#3f270f) Fw(700) Ff($ffroboto) Py(10px) Px(20px) Bdrs(5px) Fz(3vw)"
	},
	Odia: {
		wrapperClass: "M(2.7vw)",
		textBoxClass: "C(white) Bgc(#b5687a) Fw(700) Ff($ffroboto) Py(10px) Px(20px) Bdrs(5px) Fz(3vw)"
	},
	Malayalam: {
		wrapperClass: "M(2.7vw)",
		textBoxClass: "C(white) Bgc(#465712) Fw(700) Ff($ffroboto) Py(10px) Px(20px) Bdrs(5px) Fz(3vw)"
	}
}

export const TEXT_BOX_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(38vw) W(50%) Mx(25%)",
		wrapperClass: "My(3vw) Mx(16.6vw)",
		textBoxClass: "Ff($ffroboto) Fw(500) Fz(3vw) Lh(3.8vw) C(#3f270f) Ta(c)"
	},
	Odia: {
		// wrapperClass: "Pos(a) T(38vw) W(50%) Mx(25%)",
		wrapperClass: "My(3vw) Mx(16.6vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(4.4vw) Lh(5.2vw) C(#b5687a) Ta(c)"
	},
	Assamese: {
		// wrapperClass: "Pos(a) T(38vw) W(50%) Mx(25%)",
		wrapperClass: "Mt(17vw) Mx(16.6vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(4.4vw) Lh(5.2vw) C(#983c1a) Ta(c)"
	},
	Malayalam: {
		// wrapperClass: "Pos(a) T(38vw) W(50%) Mx(25%)",
		wrapperClass: "My(3vw) Mx(16.6vw)",
		textBoxClass: "Ff($ffroboto) Fw(500) Fz(3vw) Lh(3.8vw) C(#465712) Ta(c)"
	},
}

export const TEXT_BOX2_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(9vw) W(64%) Mx(18%)",
		wrapperClass: "My(6vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(3.8vw) C(#3f270f) Ta(c)"
	},
	Malayalam: {
		wrapperClass: "Pos(r) T(17vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.8vw) Lh(7vw) C(#465712) Ta(c)"
	},
	Odia: {
		wrapperClass: "Pos(r) T(16vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(3.8vw) C(#b5687a) Ta(c)"
	},
	Bengali: {
		// wrapperClass: "Pos(a) T(9vw) W(64%) Mx(18%)",
		wrapperClass: "Pos(r) T(21vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(3.8vw) C(#3f270f) Ta(c)"
	},
	Tamil: {
		wrapperClass: "Pos(r) T(10vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(3.8vw) C(#3f270f) Ta(c)"
	},
	Assamese: {
		wrapperClass: "Pos(r) T(17vw) Mx(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(500) Fz(4vw) Lh(3.8vw) C(#983c1a) Ta(c)"
	}
}

export const NAME_BOX_CLASS = {
	default: {
		// wrapperClass: "Pos(a) T(77vw) W(50%) Mx(25%)",
		wrapperClass: "M(2.7vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(5.2vw) C(#3f270f) Ta(c)"
	},
	Malayalam: {
		wrapperClass: "W(80%) Pos(r) T(10vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(5.2vw) C(#465712) Ta(c)"
	},
	Tamil: {
		wrapperClass: "W(80%) Pos(r) T(12vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(5.2vw) C(#956304) Ta(c)"
	},
	Odia: {
		wrapperClass: "W(80%) Pos(r) T(12vw)",
		textBoxClass: "Ff($ffroboto) Fw(700) Fz(3.3vw) Lh(5.2vw) C(#956304) Ta(c)"
	},
}

export const WHATSAPP_CLASS = {
	default: {
		wrapperClass : "D(f) Mt(2vw) Jc(sb) Ai(c) W(40%) Pos(f) B(14vw)"
	},
	Assamese: {
		wrapperClass : "D(f) Mt(2vw) Jc(sb) Ai(c) W(40%) Pos(f) B(9vw)"
	}
}

