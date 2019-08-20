import Aries from "@/astro/assets/zodiac/Aries.svg";
import Libra from "@/astro/assets/zodiac/Libra.svg";
import Aquarius from "@/astro/assets/zodiac/Aquarius.svg";
import Sagittarius from "@/astro/assets/zodiac/Sagittarius.svg";
import Gemini from "@/astro/assets/zodiac/Gemini.svg";
import Leo from "@/astro/assets/zodiac/Leo.svg";
import Pisces from "@/astro/assets/zodiac/Pisces.svg";
import Cancer from "@/astro/assets/zodiac/Cancer.svg";
import Scorpio from "@/astro/assets/zodiac/Scorpio.svg";
import Capricorn from "@/astro/assets/zodiac/Capricorn.svg";
import Virgo from "@/astro/assets/zodiac/Virgo.svg";
import Taurus from "@/astro/assets/zodiac/Taurus.svg";

export const request = ({ url, headers, method = "GET", body }) => {
  headers = Object.assign(headers, { "content-type": "application/json" });
  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(body)
  }).then(response => response.json());
};

export const zodiacData = index =>
  [
    { start: "21 Mar", end: "20 Apr", image: Aries, name: "Aries" },
    { start: "21 Apr", end: "21 May", image: Taurus, name: "Taurus" },
    { start: "22 May", end: "21 Jun", image: Gemini, name: "Gemini" },
    { start: "22 Jun", end: "22 Jul", image: Cancer, name: "Cancer" },
    { start: "23 July", end: "21 Aug", image: Leo, name: "Leo" },
    { start: "22 Aug", end: "23 Sep", image: Virgo, name: "Virgo" },
    { start: "24 Sep", end: "23 Oct", image: Libra, name: "Libra" },
    { start: "24 Oct", end: "22 Nov", image: Scorpio, name: "Scorpio" },
    { start: "23 Nov", end: "22 Dec", image: Sagittarius, name: "Sagittarius" },
    { start: "23 Dec", end: "20 Jan", image: Capricorn, name: "Capricorn" },
    { start: "21 Jan", end: "19 Feb", image: Aquarius, name: "Aquarius" },
    { start: "20 Feb", end: "20 Mar", image: Pisces, name: "Pisces" }
  ][index];

export const createNewDiv = ({ type, setAttribute }) => {
  let property;
  const container = document.createElement(type);
  for (property in setAttribute) {
    container.setAttribute(property, setAttribute[property]);
  }
  return container;
};
