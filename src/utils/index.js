export const request = ({ url, headers, method = "GET", body }) => {
  console.log('HEADERS : ', headers)
  headers = Object.assign(headers, { "content-type": "application/json" });
  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    // mode: 'cors'
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

const DEFAULT_TOKEN =
  "kDnqCmi96brqk+qJBLSiOlvXULyLMMhrsaykALShCT+M0MO7Ezooq/98gjMWtqJvBR/PKRbOxlW/nZTNeNagDs3rbemCmgCHHFIee8H1cvFNRQ0UB6f4dON9xrbR1W0xbIsSDV4GXCsXATLFSEYRHH/VQZb0pesjdDv4Yw3Z0yDNYf71FxcyJQlqYoE6wBDYC7SxTvt5tWeXKyzKHx3M5gSC+DljRd4l/mb8DLPEkpl/WUS8x2d1sNqhPrNxqJB1x/x/F9RJfu5yap7lTmM3oNYWHgLUNSi2bF3NpmOdFVZDV4CRjtL7fXm1BG67IkRJfSvPPHixsj7GtFjmKWRHdw==";

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