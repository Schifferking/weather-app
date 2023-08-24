const weatherForm = () => {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const submit = document.createElement("button");
  const hidden = document.createElement("input");

  label.textContent = "* Please enter a city name: ";
  input.setAttribute("placeholder", "London");
  submit.textContent = "See weather";
  submit.setAttribute("type", "submit");
  form.setAttribute("role", "search");
  hidden.setAttribute("type", "hidden");
  hidden.setAttribute("value", "C");
  label.appendChild(input);
  form.appendChild(label);
  form.appendChild(submit);
  form.appendChild(hidden);
  return form;
};

export default weatherForm;
