export const request = ({ url, headers, method = "GET", body }) => {
  // const requestHeaders = Object.assign(
  //   {
  //     Authorization: " B+GQoX3RUWtU36SYaT5Ib7TATFjq+IPYsOPoTX7GXp2J2EGctu4GkT9vPS2y4eXTmJfBmi6lYYRu\nBQFbxAiFvISUYmKRwunYueow+fAJ4O6wQCtevLRxSFcGkMeDnBtRFnv3F9ogfrHxxW3FohmmX/GZ\nwpj0FdPTk37F+5Eovbd2mDJFHwv9xC6jd5EvKTzrzghf0pv2gh9/H7JvSEjot7AnCJXdUyTPsppa\nAppEmuobzZF6+oNd3Jg8QFfo3it7oCRvoiqi6keM852xxKO0cthrJBWBIs3ohGQ13I+eAx1mLLgn\nREv7TvJrMAXVzRvWeZ3wZYOTHiynHCpMkoKk5A==".replace(
  //       new RegExp("\n", "g"),
  //       "\\n"
  //     )
  //   },
  //   headers
  // );

  return fetch(url, {
    method,
    headers,
    body
  }).then(response => response.json());
};

export const ZODIAC_DATES = [
  { start: "21 Mar", end: "20 Apr" },
  { start: "21 Apr", end: "21 May" },
  { start: "22 May", end: "21 Jun" },
  { start: "22 Jun", end: "22 Jul" },
  { start: "21 Apr", end: "21 May" }
];
