import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ResponseWeatherApi from "../models/ResponseWeatherApi";
import "./WeatherQuery.css"; // Custom CSS dosyasını ekledik

const url = "https://api.openweathermap.org/data/2.5/";
const key = "aee9368ab4b3e538bec75d39005eccf3";

export default function WeatherQuery(): JSX.Element {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<ResponseWeatherApi | null>(
    null
  );

  useEffect(() => {
    axios
      .get<ResponseWeatherApi>(
        `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`
      )
      .then((response: AxiosResponse<ResponseWeatherApi>) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cityName]);

  if (!weatherData) {
    return (
      <div className="d-flex justify-content-center loading-container">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  const { main, weather, wind, visibility, sys } = weatherData;
  const weatherMain = weather[0];

  return (
    <div className="weather-container mt-3">
      <div className="card weather-card">
        <div className="card-header">
          <h3 className="text-center">{cityName!}</h3>
        </div>

        <div className="card-body">
          <div className="weather-details">
            <div className="d-flex justify-content-center">
              <img
                src={`http://openweathermap.org/img/wn/${weatherMain.icon}.png`}
                alt={weatherMain.description}
                className="weather-icon img-fluid"
              />
            </div>

            <p className="text-center lead">
              {weatherMain.description.toUpperCase()}
            </p>

            <p>
              <strong>Sıcaklık:</strong> {main.temp} °C
            </p>
            <p>
              <strong>Hissedilen Sıcaklık:</strong> {main.feels_like} °C
            </p>
            <p>
              <strong>En Düşük Sıcaklık:</strong> {main.temp_min} °C
            </p>
            <p>
              <strong>En Yüksek Sıcaklık:</strong> {main.temp_max} °C
            </p>
            <p>
              <strong>Basınç:</strong> {main.pressure} hPa
            </p>
            <p>
              <strong>Nem:</strong> {main.humidity} %
            </p>
            <p>
              <strong>Görüş Mesafesi:</strong> {visibility} m
            </p>
            <p>
              <strong>Rüzgar Hızı:</strong> {wind.speed} m/s
            </p>
            <p>
              <strong>Rüzgar Yönü:</strong> {wind.deg}°
            </p>
            <p>
              <strong>Gün Doğumu:</strong>{" "}
              {new Date(sys.sunrise * 1000).toLocaleTimeString("tr-TR")}
            </p>
            <p>
              <strong>Gün Batımı:</strong>{" "}
              {new Date(sys.sunset * 1000).toLocaleTimeString("tr-TR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
