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

  weatherContainer.classList.add("weather_container");
  weatherContainer.appendChild(h2);
  weatherContainer.appendChild(weatherIcon);
  weatherContainer.appendChild(p);
  main.appendChild(weatherContainer);
  body.insertBefore(main, script);
};

/* DISPLAY MORE WEATHER INFORMATION
   Add a listener to weather-container div
   In the listener function
    Get an array of all p elements inside div
    If the array length is 1, call function to add information
      To add information
      Make 3 new p elements
      Assign them a class to distinguish them
      The first one assign it the feelslike value
      The second one will be humidity
      The last one will be uv
      Add them to div
    If not, delete the extra elements (make it a function too)
      Select the extra p elements with their class
      call method to delete them
 */

export { loadForm, loadBanner, loadWeatherContainer };
