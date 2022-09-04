import React, { useState, setState, useEffect, Children } from "react";
import axios from "axios";
import notyet from "../images/notyet.svg";
function Search(props) {
  const [data, setData] = useState({});
  const [location, setLocation] = useState();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=en&units=metric&appid=5b18d6259e33136520e8be5afd2f9692`;
  //  'https://api.openweathermap.org/data/2.5/forecast?q=${location}&lang=en&appid=5b18d6259e33136520e8be5afd2f9692'
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  const [isShown, setIsShown] = useState(false);
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const [state, setState] = useState("");
  const toggleAccordion = () => {
    setState(state === "" ? "top" : "");
  };
  return (
    <>
      <div className="row">
        <div className=" col-12">
          {isShown && (
            <div className="search-area">
              <span class="search">
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyPress={searchLocation}
                  placeholder="Enter a Location"
                  type="search"
                />
                <span></span>
              </span>
            </div>
          )}
          <a onClick={handleClick}>
            <div onClick={toggleAccordion} className={`indicator ${state}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </a>

          
        </div>
      </div>

      <div
        className="row"
        style={{ marginTop: "3em", position: "relative", height: "60vh" }}
      >
        {data.weather ? (
          <div className="col-md-8 offset-md-2 offset-1 col-10 wcard">
            <div className="degree">
              <span className="status">
                {data.weather ? data.weather[0].description : null}
              </span>
              <span className="numeric-degree">
                {data.main ? data.main.temp + "°C" : null}
              </span>
              <span className="seperator"></span>
            </div>
            <div className="city-info">
              <span class="material-symbols-outlined me-5">home_pin</span>
              <h1>{data.name ? data.name : null}</h1>
            </div>
          </div>
        ) : (
          <div className="not-searched">
            <img src={notyet} />
            <span className="search-text">
              <span class="material-symbols-outlined me-5">home_pin</span>Not
              Serached Yet
            </span>
          </div>
        )}
      </div>
    </>
  );
}
export default Search;
