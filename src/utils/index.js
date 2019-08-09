export const request = ({ url, headers, method = "GET", body }) =>
  fetch(url, {
    method,
    headers,
    body
  }).then(response => response.json());

export const ZODIAC_DATES = [
  { start: "21 Mar", end: "20 Apr" },
  { start: "21 Apr", end: "21 May" },
  { start: "22 May", end: "21 Jun" },
  { start: "22 Jun", end: "22 Jul" },
  { start: "23 July", end: "21 Aug" },
  { start: "22 Aug", end: "23 Sep" },
  { start: "24 Sep", end: "23 Oct" },
  { start: "24 Oct", end: "22 Nov" },
  { start: "23 Nov", end: "22 Dec" },
  { start: "23 Dec", end: "20 Jan" },
  { start: "21 Jan", end: "19 Feb" },
  { start: "20 Feb", end: "20 Mar" }
];
