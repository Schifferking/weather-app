import { getWeatherData, processData } from "./api";

const weatherForm = () => {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const submit = document.createElement("button");

  label.textContent = "* Please enter a city name";
  input.setAttribute("placeholder", "London");
  submit.textContent = "See weather";
  submit.setAttribute("type", "submit");
  label.appendChild(input);
  form.appendChild(label);
  form.appendChild(submit);

  const addFunctionality = () => {
    submit.addEventListener("click", async (event) => {
      event.preventDefault();
      const response = await getWeatherData(input.value);
      const data = processData(response);
      console.log(data);
    });
  };

  addFunctionality();
  return form;
};

export { weatherForm };
