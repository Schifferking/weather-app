async function getWeatherData(location = "Guadalajara") {
  const baseUrl = () => "http://api.weatherapi.com/v1/";
  const apiKey = () => "fd50cece65394d10a3505712231608";

  const response = await fetch(
    `${baseUrl()}forecast.json?key=${apiKey()}&q=${location}&days=3&aqi=no&alerts=no`,
    {
      mode: "cors",
    }
  );

  if (!response.ok) throw new Error(`Error! status : ${response.status}`);

  const result = await response.json();
  return result;
}

const processData = (data) => {
  const processedData = {};
  processedData.location = {
    name: data.location.name,
    country: data.location.country,
  };

  processedData.current = {
    condition: data.current.condition,
    feelslike_c: data.current.feelslike_c,
    feelslike_f: data.current.feelslike_f,
    humidity: data.current.humidity,
    is_day: data.current.is_day,
    temp_c: data.current.temp_c,
    temp_f: data.current.temp_f,
    uv: data.current.uv,
  };

  processedData.forecast = data.forecast;
  return processedData;
};

export { getWeatherData, processData };
