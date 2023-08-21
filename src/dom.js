import { weatherForm } from "./form";

const body = document.querySelector("body");
const script = document.querySelector("script");

const loadForm = () => {
  body.insertBefore(weatherForm(), script);
};

export { loadForm };
