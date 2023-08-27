import { getWeatherData, processData } from "./api";
import weatherForm from "./form";
import getImageSrc from "./weather-data";

const body = document.querySelector("body");
const script = document.querySelector("script");
const form = weatherForm();
let listenerAdded = false;

const getProperTemperature = (temps) => {
  const tempC = temps.c;
  const tempF = temps.f;
  const hiddenInput = document.querySelector("input[type=hidden]");
  const currentTemp = hiddenInput.value === "C" ? tempC : tempF;
  return `${currentTemp} °${hiddenInput.value}`;
};

const loadWeatherInfo = (data) => {
  const h2 = document.querySelector("h2");
  const weatherIcon = document.querySelector("img");
  const condition = document.querySelector(".condition");
  const currentTemperature = document.querySelector(".current-temperature");
  const weatherContainer = document.querySelector(".weather-container");
  weatherContainer.classList.add("card");
  h2.textContent = `${data.location.name}, ${data.location.country}`;
  weatherIcon.src = getImageSrc(
    data.current.condition.code,
    data.current.is_day
  );

  condition.textContent = `${data.current.condition.text}`;
  currentTemperature.textContent = `${getProperTemperature({
    c: data.current.temp_c,
    f: data.current.temp_f,
  })}`;
};

const addInfoToWeatherContainer = (weatherContainer, data) => {
  const feelslike = document.createElement("p");
  const humidity = document.createElement("p");
  const uv = document.createElement("p");
  feelslike.classList = "extra feels";
  humidity.classList = "extra";
  uv.classList = "extra";
  feelslike.textContent = `Feels like: ${getProperTemperature({
    c: data.current.feelslike_c,
    f: data.current.feelslike_f,
  })}`;
  humidity.textContent = `Humidity: ${data.current.humidity}%`;
  uv.textContent = `UV: ${data.current.uv}`;
  weatherContainer.append(feelslike, humidity, uv);
};

const loadLi = (hour, ul) => {
  const li = document.createElement("li");
  const time = document.createElement("p");
  const weatherIcon = new Image();
  const condition = document.createElement("p");
  const temperature = document.createElement("p");
  time.classList = "time";
  temperature.classList = "temperature";
  time.textContent = `${hour.time}`;
  condition.textContent = `${hour.condition.text}`;
  temperature.textContent = `${getProperTemperature({
    c: hour.temp_c,
    f: hour.temp_f,
  })}`;
  li.append(time, weatherIcon, condition, temperature);
  ul.appendChild(li);
  weatherIcon.src = getImageSrc(hour.condition.code, hour.is_day);
};

const addWeatherForecast = (data) => {
  const main = document.querySelector("main");
  const weatherForecast = document.createElement("div");
  const h2 = document.createElement("h2");
  const ul = document.createElement("ul");
  h2.textContent = "Forecast";
  h2.classList = "extra";
  weatherForecast.classList = "extra weather-forecast-container";
  data.forecast.forEach((hour) => {
    loadLi(hour, ul);
  });
  weatherForecast.appendChild(ul);
  main.append(h2, weatherForecast);
};

const handleWeatherContainer = (weatherContainer, data) => {
  const pElements = weatherContainer.querySelectorAll("p");
  if (pElements.length === 2) {
    addInfoToWeatherContainer(weatherContainer, data);
    addWeatherForecast(data);
  } else {
    const extraElements = Array.from(document.querySelectorAll(".extra"));
    extraElements.forEach((element) => element.remove());
  }
};

const addFunctionality = () => {
  const input = document.querySelector("input");
  const submit = document.querySelector("button[type=submit]");

  submit.addEventListener("click", async (event) => {
    event.preventDefault();
    const response = await getWeatherData(input.value);
    const data = processData(response);
    const weatherContainer = document.querySelector(".weather-container");
    const temperatureButton = document.querySelector(".temperature-switch");

    loadWeatherInfo(data);
    if (!listenerAdded) {
      listenerAdded = true;
      weatherContainer.addEventListener("click", () => {
        handleWeatherContainer(weatherContainer, data);
      });

      temperatureButton.addEventListener("click", () => {
        const feelslike = document.querySelector(".feels");
        const currentTemperature = document.querySelector(
          ".current-temperature"
        );
        const ul = document.querySelector("ul");
        currentTemperature.textContent = `${getProperTemperature({
          c: data.current.temp_c,
          f: data.current.temp_f,
        })}`;
        if (feelslike) {
          feelslike.textContent = `Feels like: ${getProperTemperature({
            c: data.current.feelslike_c,
            f: data.current.feelslike_f,
          })}`;
        }
        if (ul) {
          const liNodes = Array.from(ul.childNodes);
          liNodes.forEach((li) => {
            const temperatureP = li.querySelector(".temperature");
            const time = li.querySelector(".time");
            const hour = data.forecast.find((h) => time.textContent === h.time);
            temperatureP.textContent = `${getProperTemperature({
              c: hour.temp_c,
              f: hour.temp_f,
            })}`;
          });
        }
      });
    }
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

  h1.textContent = "Generic weather app name (to be replaced later)";
  button.textContent = "°C";
  button.classList = "temperature-switch";
  button.addEventListener("click", () => {
    const hiddenInput = document.querySelector("input[type=hidden]");
    const temperatureMeasure = hiddenInput.value === "C" ? "F" : "C";
    hiddenInput.setAttribute("value", temperatureMeasure);
    button.textContent = `°${temperatureMeasure}`;
  });
  header.append(h1, button);
  body.insertBefore(header, form);
};

const loadWeatherContainer = () => {
  const weatherContainer = document.createElement("div");
  const main = document.createElement("main");
  const h2 = document.createElement("h2");
  const weatherIcon = new Image();
  const condition = document.createElement("p");
  const temperature = document.createElement("p");

  condition.classList = "condition";
  temperature.classList = "current-temperature";
  weatherContainer.classList.add("weather-container");
  weatherContainer.append(h2, weatherIcon, condition, temperature);
  main.appendChild(weatherContainer);
  body.insertBefore(main, script);
};

const loadFooter = () => {
  const footer = document.createElement("footer");
  const info = document.createElement("p");
  const weatherAPILink = document.createElement("a");
  Object.assign(weatherAPILink, {
    href: "https://www.weatherapi.com/",
    title: "Free Weather API",
  });
  info.textContent = "Powered by ";
  weatherAPILink.textContent = "WeatherAPI.com";
  info.appendChild(weatherAPILink);
  footer.appendChild(info);
  body.insertBefore(footer, script);
};

export { loadForm, loadBanner, loadFooter, loadWeatherContainer };
