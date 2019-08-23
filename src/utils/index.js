export const request = ({ url, headers, method = "GET", body }) => {
  headers = Object.assign(headers, { "content-type": "application/json" });
  return fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
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
  "Sn899vpok1xqFqzneiD+Cx+kdDIWIkxq3ANl0tZm2QvMBeyQYCzPrOn7FyuCr3uDOMTrk2z9yxTz\ntao/VWPC/tm1/DTE5G7X+TzhqAqMEX/tpKLSuWryoDL5AGJujrRz5+MxFe3+03qq9cZ+y5zpNLkP\nbyVqkLSW01q2YFWri3uWCuGMBgomarQzfElZyS0vryhgMRLBbx+kD17mbAsk2UDx9kd1aDddF18G\nhGDktsUoy6fa3oulhF8iJweP08RNNcZnAATAwPiV++B6ozMRDSIeWP6NTGLZg6npE0iVHtKlFtGQ\no8ZeXlHxxutUvWr+aTMDVZT0WtnK9Uvwv4lIvA==\n";

const handleToken = token => token.replace(new RegExp("\n", "g"), "\\n");

export const getAuthorization = state => {
  let Authorization;
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
    appVersion = 10;
  }
  return appVersion;
};
