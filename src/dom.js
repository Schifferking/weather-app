import { getWeatherData, processData } from "./api";
import weatherForm from "./form";
import getImageSrc from "./weather-data";

const body = document.querySelector("body");
const script = document.querySelector("script");
const form = weatherForm();

const getCurrentTemperature = (data) => {
  const hiddenInput = document.querySelector("input[type=hidden]");
  const currentTemp =
    hiddenInput.value === "C" ? data.current.temp_c : data.current.temp_f;
  return `${currentTemp} °${hiddenInput.value}`;
};

const loadWeatherInfo = (data) => {
  const h2 = document.querySelector("h2");
  const weatherIcon = document.querySelector("img");
  const currentWeather = document.querySelector("p");
  h2.textContent = `${data.location.name}, ${data.location.country}`;
  weatherIcon.src = getImageSrc(
    data.current.condition.code,
    data.current.is_day
  );

  currentWeather.textContent = `${
    data.current.condition.text
  } ${getCurrentTemperature(data)}`;
};

const addFunctionality = () => {
  const input = document.querySelector("input");
  const submit = document.querySelector("button[type=submit]");

  submit.addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await getWeatherData(input.value);
    const data = processData(response);
    const weatherContainer = document.querySelector(".weather-container");
    // console.log(data);
    loadWeatherInfo(data);
    weatherContainer.addEventListener("click", () => {
      const pElements = weatherContainer.querySelectorAll("p");
      if (pElements.length === 1) {
        const feelslike = document.createElement("p");
        const humidity = document.createElement("p");
        const uv = document.createElement("p");
        feelslike.classList = "extra";
        humidity.classList = "extra";
        uv.classList = "extra";
        feelslike.textContent = `Feels like: ${data.current.feelslike_c} °C`;
        humidity.textContent = `Humidity: ${data.current.humidity}`;
        uv.textContent = `UV: ${data.current.uv}`;
        weatherContainer.append(feelslike, humidity, uv);
      } else {
        const extraElements = Array.from(document.querySelectorAll(".extra"));
        extraElements.forEach((element) => element.remove());
      }
    });
  });
};

const loadForm = () => {
  body.insertBefore(form, script);
  addFunctionality();
};

const loadBanner = () => {
  const h1 = document.createElement("h1");
  const header = document.createElement("header");
  const button = document.createElement("button");

  h1.textContent = "Weather app";
  button.textContent = "°C";
  button.addEventListener("click", () => {
    const hiddenInput = document.querySelector("input[type=hidden]");
    const temperatureMeasure = hiddenInput.value === "C" ? "F" : "C";
    hiddenInput.setAttribute("value", temperatureMeasure);
    button.textContent = `°${temperatureMeasure}`;
    // Try to update the weather when the info it's present
  });
  header.appendChild(h1);
  header.appendChild(button);
  body.insertBefore(header, form);
};

const loadWeatherContainer = () => {
  const weatherContainer = document.createElement("div");
  const main = document.createElement("main");
  const h2 = document.createElement("h2");
  const weatherIcon = new Image();
  const p = document.createElement("p");

  weatherContainer.classList.add("weather-container");
  weatherContainer.appendChild(h2);
  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(p);
  main.appendChild(weatherContainer);
  body.insertBefore(main, script);
};

export { loadForm, loadBanner, loadWeatherContainer };
