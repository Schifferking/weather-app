const conditions = require("./weather_conditions.json");

const getIconCode = (code) => {
  const currentCondition = conditions.find(
    (condition) => condition.code === code
  );
  return currentCondition.icon;
};

const getImageSrc = (code, isDay) => {
  const time = isDay ? "day" : "night";
  const iconCode = getIconCode(code).toString();
  const url = `./../src/weather-icons/64x64/${time}/${iconCode}.png`;
  return url;
};

export default getImageSrc;
