import { useState } from "react";
import { Link } from "react-router-dom";
import { CityList } from "../data/CityList";
import "./Cities.css"; // Custom CSS dosyasını ekledik

export default function Cities() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCities = CityList.filter((city) => {
    // Türkçe karakterlerin aranmasını sağlamak için toLocaleLowerCase metodu kullanıldı
    return city.name
      .toLocaleLowerCase("tr-TR")
      .includes(searchTerm.toLocaleLowerCase("tr-TR"));
  });

  return (
    <div className="card cities-card">
      <div className="card-header text-center">
        <input
          type="text"
          className="form-control city-search-input"
          placeholder="Şehir seç"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-body cities-list">
        {filteredCities.map((item) => (
          <div className="city-item" key={item.id}>
            <span className="city-id">{item.id} - </span>
            <Link className="city-name" to={"/WeatherQuery/" + item.name}>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
