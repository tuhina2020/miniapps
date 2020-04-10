module.exports = lang => ({
	palette: {
		prefix: "",
		primaryDark: "#3d2156",
		primary: "#8445AE",
		primaryLight: "#9876b3",
		secondaryDark: "#4A4A59",
		white: "rgba(255, 252, 252, 1)",
		lightTextSecondary: "rgba(255, 252, 252, 0.7)",
		lightDivider: "rgba(255, 252, 252, 0.12)",
		extraLightDivider: "#ece7e7",
		lightTextDisabled: "rgba(255, 252, 252, 0.5)",
		darkText: "rgba(3, 3, 3, 0.9)",
		darkTextSecondary: "rgba(3, 3, 3, 0.7)",
		darkTextDisabled: "rgba(3, 3, 3, 0.6)",
		greyTextSecondary: "rgba(3, 3, 3, 0.4)",
		greyTextDisabled: "rgba(3, 3, 3, 0.04)",
		darkDivider: "rgba(3, 3, 3, 0.12)",
		imageBgColor: "#dddbdd",
		lightGrey: "#f3f3f3",
		grey1: "#e0dede",
		grey3: "#a0a0a0",
		white2: "#faf7f7",
		white3: "#f5f2f2",
		white4: "#eee",
		yellow: "#ffa233",
		lightYellow: "#FEC013",
		logoYellow: "#ffd700",
		red: "#ff5a7e",
		green: "#009688",
		green2: "#19AB4F",
		lightGreen: "#77C082",
		pink: "#eb7e9a",
		blue: "#1976d2",
		linkBlue: "#1a0dab",
		ampBlueLight: "#49bdf8",
		disabledGrey: "#ddd"
	},
	fontFamily: {
		prefix: "ff",
		primary:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
		pre: "monospace",
		quote: "serif",
		inter: "Inter, sans-serif"
	},
	fontWeight: {
		prefix: "fw",
		subtitle: 600,
		button: 700,
		subheading: 400,
		body: 400,
		caption: 400
	},
	fontSize: {
		prefix: "fz",
		title: "20px",
		heading: "18px",
		body: "16px",
		input: "17px"
	},
	lineHeight: {
		prefix: "lh",
		title: "24px",
		mediumCaption: "18px",
		subheading: "22px",
		body: "20px",
		caption: "16px",
		input: "24px"
	},
	spacing: {
		prefix: "",
		"3xs": "2px",
		xhs: "3px",
		xxs: "4px",
		xms: "6px",
		xs: "8px",
		xss: "10px",
		sm: "12px",
		smd: "14px",
		md: "16px",
		mmd: "20px",
		lg: "24px",
		lmg: "28px",
		xl: "32px",
		xml: "36px",
		xxl: "40px",
		"2xl": "48px",
		"3xl": "56px",
		"3xxl": "60px",
		"4xl": "64px",
		"5xl": "72px",
		"5xxl": "76px",
		"6xl": "80px",
		"7xl": "88px",
		"8xl": "96px",
		"9xl": "104px",
		"10xl": "112px",
		"11xl": "120px",
		"12xl": "128px",
		"13xl": "136px",
		"14xl": "144px",
		"15xl": "152px",
		"15xxl": "156px",
		"16xl": "160px",
		"20xl": "192px",
		"24xl": "240px",
		nxxs: "-4px",
		nxs: "-8px",
		nsmm: "-10px",
		nmd: "-16px",
		nsm: "-12px",
		nmd: "-16px",
		nlg: "-24px",
		n2xl: "-48px",
		n3xl: "-56px"
	},
	boxShadow: {
		prefix: "bxsh",
		header:
			" 0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)",
		bottomNav:
			"0 -1px 3px 0 rgba(0, 0, 0, 0.2), 0 -2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.14)",
		navBar:
			"0px 1px 5px rgba(0, 0, 0, 0.1), 0px 3px 4px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.07)",
		fab:
			"0 3px 5px 0 rgba(0, 0, 0, 0.2), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 6px 10px 0 rgba(0, 0, 0, 0.14)",
		lightInset: "inset 0 0 4px 0 rgba(0,0,0,0.1)",
		newsCard:
			"0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.14)",
		feedCard: "0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)",
		white: "0px 0px 0px 1px rgba(255, 255, 255, 0.7)"
	},
	transition: {
		prefix: "trs",
		tabslider: ".3s cubic-bezier(.25,.8,.5,1)",
		transform: "transform .3s cubic-bezier(.25,.8,.5,1)",
		generallong: ".5s cubic-bezier(.25,.8,.5,1)",
		opacity: "opacity .5s cubic-bezier(.25,.8,.5,1)",
		icon: "transform .4s cubic-bezier(.33, 1.89, .65, .67)"
	},
	background: {
		prefix: "",
		overlay: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5))",
		modal: "rgba(0, 0, 0, 0.3)",
		snackbar: "#323232",
		videoModal: "rgba(0, 0, 0, 0.6)"
	},
	border: {
		prefix: "bd",
		white: "1px solid white",
		greyWhite: "1px solid #f3f3f3",
		darkDivider: "2px solid rgba(3, 3, 3, 0.12)",
		input: "1px solid rgba(0,0,0,0.12)",
		bottom: "0 0 1px",
		left: "0 0 0 1px"
	},
	figure: {
		prefix: "fg",
		background:
			"linear-gradient(180deg, transparent, rgba(0,0,0,.5) 63%, rgba(0,0,0,.62))",
		backgroundLight:
			"linear-gradient(180deg,transparent,transparent 63%,rgba(0,0,0,0.75))",
		size: "100% 100%",
		StepShadow:
			"0px 1px 3px rgba(0, 0, 0, 0.1), 0px 2px 2px rgba(0, 0, 0, 0.06), 0px 0px 2px rgba(0, 0, 0, 0.07)"
	},
	borderRadius: {
		prefix: "bdrs",
		modal: "10px 10px 0 0"
	}
});