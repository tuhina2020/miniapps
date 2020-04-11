// import domtoimage from 'dom-to-image';
import _each from 'lodash/each';
import _compact from 'lodash/compact';

export const request = ({ url, headers, method = "GET", body, mode, string = true }) => {
  console.log('HEADERS : ', headers)
  headers = Object.assign(headers, { "content-type": "application/json" });
  return fetch(url, {
    method,
    headers,
    body: body && string ? JSON.stringify(body) : (body ? body : undefined),
    mode
  }).then(response => response.json());
};

export const createNewDiv = ({ type, setAttribute }) => {
  let property;
  const container = document.createElement(type);
  for (property in setAttribute) {
    container.setAttribute(property, setAttribute[property]);
  }
  return container;
};

export const addComponents = ({ components = [], container }) => {
	_each(_compact(components), c=> {
		container.appendChild(c);
	})
}

const DEFAULT_TOKEN =
  "PnZsF1v6xZx91gFaCvqmB33dC1XSNYBRFz9JvEWRhFM88EhZKEvA5/YvsTywK0tQMrsaP402HqL3qQmfC235X2QxozFfmhWTbyQW1eincL2C9Bxry/yg1E/8j3E5st5Qt6N6QA8PU29v8AbxmUV+zaK28il0hZ8H6KZWtCoVVWY6dG2LtxH/C8uNOdyWueF112djOFh6Cgi46SxYTGExq5od+3qpUr8G3DXTW9DfRRB1vb3mAOTDpcbIyK1NycNXXehOaflxWWZEHzUSPQvTCuDcgAHipPAFxFIs9n8yhX38cet3wa8qwwrZzr6ifBzWoKyBjOD0NDzTx2pYo8+2/g==";

const handleToken = token => token.replace(new RegExp("\n", "g"), "\\n");

export const getAuthorization = state => {
  let Authorization;
  console.log(state);
  if (state.Authorization) {
    Authorization = handleToken(state.Authorization);
  } else {
    try {
      Authorization = handleToken(Android.get("userInfo"));
    } catch (e) {
      Authorization = handleToken(DEFAULT_TOKEN);
    }
  }

  return Authorization;
};

export const getAppVersion = () => {
  let appVersion;
  try {
    appVersion = Android.get("appVersion");
  } catch (e) {
    appVersion = 5000;
  }
  return appVersion;
};

export const addOrUpdateUrlParam = (name, value) => {
  var href = window.location.href;
  var regex = new RegExp("[&\\?]" + name + "=");
  if (regex.test(href)) {
    regex = new RegExp("([&\\?])" + name + "=\\d+");
    window.location.href = href.replace(regex, "$1" + name + "=" + value);
  } else {
    if (href.indexOf("?") > -1)
      window.location.href = href + "&" + name + "=" + value;
    else window.location.href = href + "?" + name + "=" + value;
  }
};

export const uploadFile = ({ imgData = document.getElementById("app"), Authorization, hide }) => {
	hide.style.display = "none";
	console.log('MOMOMO 1', imgData);
	// return createImagePost({ imageData: { fileUrl : "https://cdn.sharechat.com/254fb513_1586630436058.png"} , Authorization });
	return domtoimage.toBlob(imgData).then((blob) => {
		const formData = new FormData();
		formData.append("userfile", blob);
		return fetch("https://mediaupload.sharechat.com/uploadFile", {
			method: "POST",
			body: formData,
			mode: "cors"
		})
		.then(res => {
				if (!res.ok) {
						throw new Error(res.statusText);
				}
				return res.json();
		})
		.then(data => {
			console.log(data, "dooon sdsd ")
				// if ("fileUrl" in data) {
				// 		createImagePost({ imageData: data, Authorization });
				// 		// console.log(data, "dooon")
				// }
		})
		.catch(err => {
				console.log(err);
		});
	})
	.catch(err => {
		console.log(err, 'MIND BLOWN')
	})
}

export const createImagePost = ({ imageData, Authorization }) => {
	// let encryptedUserInfo =
	//     "PnZsF1v6xZx91gFaCvqmB33dC1XSNYBRFz9JvEWRhFM88EhZKEvA5/YvsTywK0tQMrsaP402HqL3qQmfC235X2QxozFfmhWTbyQW1eincL2C9Bxry/yg1E/8j3E5st5Qt6N6QA8PU29v8AbxmUV+zaK28il0hZ8H6KZWtCoVVWY6dG2LtxH/C8uNOdyWueF112djOFh6Cgi46SxYTGExq5od+3qpUr8G3DXTW9DfRRB1vb3mAOTDpcbIyK1NycNXXehOaflxWWZEHzUSPQvTCuDcgAHipPAFxFIs9n8yhX38cet3wa8qwwrZzr6ifBzWoKyBjOD0NDzTx2pYo8+2/g=="
	const LOOKUP = {
		"1474307" : "✝ഈസ്റ്റർ ആശംസകൾ",
		"1537980": "✝️ஈஸ்டர் திருநாள் நல்வாழ்த்துக்கள்"
	}
	const url = new URL(document.location.href);
	const language = url.searchParams.get("language")
	const tagId = url.searchParams.get("tagId")
	const tagName = LOOKUP[tagId];
;	const eventMetaData =  { webCardName : url.searchParams.get("webCardName")}

	const payload = {
		festivalName : url.searchParams.get("festival"),
		imageUrl: imageData.fileUrl,
		language,
		tagId,
		tagName,
		eventMetaData
	}

	return fetch("https://apis.sharechat.com/festive-webcard-service/generateImagePost", {
		method: "POST",
		body: JSON.stringify(payload),
		headers: {
				"Authorization": Authorization,
				"Content-Type": "application/json"
		}
})
.then(res => {
		if (!res.ok) {
				throw new Error(res.statusText);
		}
		return res.json();
})

	// const requestObj = {
	// 	method: "POST",
	// 	url: "https://apis.sharechat.com/festive-webcard-service/generateImagePost",
	// 	headers: { Authorization },
	// 	body: payload
	// };
}

export const registerCleverTap = () => {
	const CleverTap = {
		initialize(accountId) {
			window.clevertap = {
				event: [],
				profile: [],
				account: [],
				onUserLogin: [],
				notifications: []
			};
			window.clevertap.account.push({
				id: accountId
			});
			(function () {
				let wzrk = document.createElement("script");
				wzrk.type = "text/javascript";
				wzrk.async = true;
				wzrk.src =
						("https:" == document.location.protocol ?
								"https://d2r1yp2w7bby2u.cloudfront.net" :
								"http://static.clevertap.com") + "/js/a.js";
				let s = document.getElementsByTagName("script")[0];
				s.parentNode.insertBefore(wzrk, s);
			})();
		},

		sendEvent(name, payload) {
			name = name;
			payload = payload || {};
			payload = {
				...payload,
			};

			if (true) {
				if (window.clevertap) {
					window.clevertap.event.push(name, payload);
				}
			} else {
				console.log(
					"TRACKING EVENT NAME: ",
					name,
					"TRACKING EVENT PAYLOAD: ",
					payload
				);
			}
		},

		logout() {
				if (window.clevertap && window.clevertap.logout) {
					window.clevertap.logout();
				}
		}
	};

	//cleverTap initialise
	CleverTap.initialize("WR9-KZ9-875Z");

	return CleverTap;
}

export const getDataExcel = ({ sheetId, page, columns }) => {
	return fetch(`https://spreadsheets.google.com/feeds/cells/${sheetId}/${page}/public/full?alt=json`, {
		method: 'GET'
	}).then(data => data.json()).then(data => {
		const columnNames = data.feed.entry.slice(0, columns).map(d => d.content["$t"]);
		const final = [];
		let entry = {};
		data.feed.entry.slice(columns).forEach((d,i) => {
			if ( i%columns === 0 && i !==0) {
				final.push(entry)
				entry = {};
			}
			entry[columnNames[i%columns]] = d.content["$t"];
		});
		final.push(entry)
		return final;
	})
}

export const blankPage = () => {
	document.getElementById('app').innerHTML = '';
}

export const APP_UPDATE_MESSAGES =   {
  "f": "update_popup_title",
  "English": "Update your ShareChat now!",
  "Default": "Update your ShareChat now!",
  "Hindi": "अपना शेयरचैट अपडेट करें!",
  "Hindi_US": "Apna ShareChat update karein",
  "Bhojpuri": "आपन शेयर चैट के अपडेट करीं",
  "Bhojpuri_US": "Apan sharechat ke update karin",
  "Haryanvi": "अपणी शेयरचैट अपडेट कर ले",
  "Haryanvi_US": "Aapni ShareChat update kar le",
  "Rajasthani": "नयो ShareChat अपडेट करो!",
  "Rajasthani_US": "Nayo ShareChat update karo!",
  "Marathi": "नवीन शेअरचॅट अपडेट करा",
  "Marathi_US": "Navin ShareChat update kara",
  "Telugu": "మీ షేర్‌చాట్ యాప్‌ని అప్‌డేట్ చేసుకోండి!",
  "Telugu_US": "Mi sharechat app ni update chesukondi!",
  "Malayalam": "ഉടന്‍ തന്നെ നിങ്ങളുടെ ഷെയര്‍ചാറ്റ് അപ്ഡേറ്റ് ചെയ്യൂ...",
  "Malayalam_US": "Udan thanne ningalude Sharechat update cheyyoo...",
  "Gujarati": "તમારું શેરચેટ અપડેટ કરો!",
  "Gujarati_US": "Tamaru ShareChat update karo",
  "Punjabi": "ਨਵੇਂ ਨਵੇਂ ਫੀਚਰਸ ਲਈ ਹੁਣੀ ਅਪਡੇਟ ਕਰੋ ਸ਼ੇਅਰਚੈਟ",
  "Punjabi_US": "Nwen Nwen Features lai huni update kro ShareChat",
  "Tamil": "இப்போது உங்கள் ஷேர்சாட்டை அப்டேட் பண்ணுங்க!",
  "Tamil_US": "Eppothu ungal sharechat-ai puthipikkavum",
  "Bengali": "এক্ষুনি আপনার শেয়ারচ্যাট আপডেট করুন !",
  "Bengali_US": "Ekhhuni apnar sharechat update korun!",
  "Kannada": "ಈಗಲೇ ಶೇರ್ ಚಾಟ್ ಅಪ್ಡೇಟ್ ಮಾಡಿ!",
  "Kannada_US": "Egale ShareChat update maadi!",
  "Odia": "ନିଜ ଶେୟରଚେଟ୍ କୁ ବର୍ତ୍ତମାନ ଅପଡେଟ କରନ୍ତୁ!",
  "Odia_US": "Nija ShareChat ku bartamana update karantu!",
  "Bengali (new)": "এক্ষুনি আপনার শেয়ারচ্যাট আপডেট করুন !",
  "Assamese": "আপোনাৰ শ্বেয়াৰচাট এতিয়া আপডেট কৰক",
  "Assamese_US": "Aapunaar share chat etia aapdat karak",
  "Bangladeshi": "এহনি  আপনার শেয়ারচ্যাট আপডেট করেন !",
  "Bangladeshi_US": "ahoni apnar sharechat update karen!",
  "Urdu": "اپنا شیئر چیٹ اپ ڈیٹ کریں",
  "Urdu_US": "Apna ShareChat update karein"
};