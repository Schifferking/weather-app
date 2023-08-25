const weatherForm = () => {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const submit = document.createElement("button");
  const hidden = document.createElement("input");

  label.textContent = "* Please enter a city name: ";
  submit.textContent = "See weather";
  input.setAttribute("placeholder", "London");
  submit.setAttribute("type", "submit");
  form.setAttribute("role", "search");
  Object.assign(hidden, { type: "hidden", value: "C" });
  label.appendChild(input);
  form.append(label, submit, hidden);
  return form;
};

export default weatherForm;
