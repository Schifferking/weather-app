import { getWeatherData, processData } from "./api";
import weatherForm from "./form";
import getImageSrc from "./weather-data";

const body = document.querySelector("body");
const script = document.querySelector("script");
const form = weatherForm();

const loadWeatherInfo = (data) => {
  const h2 = document.querySelector("h2");
  const weatherIcon = document.querySelector("img");
  const currentWeather = document.querySelector("p");
  h2.textContent = `${data.location.name}, ${data.location.country}`;
  weatherIcon.src = getImageSrc(
    data.current.condition.code,
    data.current.is_day
  );

  currentWeather.textContent = `${data.current.condition.text} ${data.current.temp_c} °C`;
};

const addFunctionality = () => {
  const input = document.querySelector("input");
  const submit = document.querySelector("button[type=submit]");

  submit.addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await getWeatherData(input.value);
    const data = processData(response);
    // console.log(data);
    loadWeatherInfo(data);
  });
};

const loadForm = () => {
  body.insertBefore(form, script);
  addFunctionality();
};

const loadBanner = () => {
  const h1 = document.createElement("h1");
  const header = document.createElement("header");

  h1.textContent = "Weather app";
  header.appendChild(h1);
  body.insertBefore(header, form);
};

const loadWeatherContainer = () => {
  const weatherContainer = document.createElement("div");
  const main = document.createElement("main");
  const h2 = document.createElement("h2");
  const weatherIcon = new Image();
  const p = document.createElement("p");

  weatherContainer.classList.add("weather_container");
  weatherContainer.appendChild(h2);
  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(p);
  main.appendChild(weatherContainer);
  body.insertBefore(main, script);
};

export { loadForm, loadBanner, loadWeatherContainer };
