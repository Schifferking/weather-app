const weatherForm = () => {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const submit = document.createElement("button");

  label.textContent = "* Please enter a city name: ";
  input.setAttribute("placeholder", "London");
  submit.textContent = "See weather";
  submit.setAttribute("type", "submit");
  form.setAttribute("role", "search");
  label.appendChild(input);
  form.appendChild(label);
  form.appendChild(submit);
  return form;
};

export default weatherForm;
