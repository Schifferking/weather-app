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

const processForecastData = (data, currentHour) => {
  let processedData = [];
  data.forEach((day) => {
    const futureHours = day.hour.filter((h) => h.time_epoch > currentHour);
    processedData.push(futureHours);
  });
  processedData = processedData.flat(1);
  processedData = processedData.filter((hour, index) => index % 3 === 0);
  return processedData;
};

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

  const forecast = processForecastData(
    data.forecast.forecastday,
    data.location.localtime_epoch
  );
  console.log(forecast);
  processedData.forecast = forecast;
  return processedData;
};

export { getWeatherData, processData };
