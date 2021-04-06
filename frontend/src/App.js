import './App.css';
import Search from "./Components/Search/Search";
import TimeZone from "./Components/TimeZone/TimeZone";
import React, {useState, useEffect} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [timezones, setTimezones] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [time, setTime] = useState(Date.now());


  //First page load
  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(response => response.json())
      .then(jsonResponse => {
        setTimezones(jsonResponse.timezones);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
  const interval = setInterval(() => setTime(Date.now()), 1000);
  return () => {
    clearInterval(interval);
  };
}, []);

   const searchedInput = (item) =>{
    setLoading(true);
    setErrorMessage(null);

    fetch(`http://localhost:5000/api/${item}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.success === true) {
          console.log(jsonResponse.timezones)
          setTimezones(jsonResponse.timezones);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.error);
          setLoading(false);
        }
      });

   }

  return (
    <div className="App">
      <Search search={searchedInput}/>

      <div className="searchResults">
      {loading && !errorMessage ? (
         <span>Loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          timezones.map((loc, index) => {
            let diff = loc.hours * 3600000 + loc.mins * 60000;
            console.log(diff)
            let timestamp;
            if(loc.hours >= 0){
              timestamp = time + diff
            }else{
              timestamp = time - diff
            }
            let currentTime = new Date(timestamp).toString().match(/(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm)
          
            return <TimeZone key={loc.id} location={loc.name} currentTime={currentTime} gmt={loc.gmt} />
          })
        )}
      </div>
    </div>
  );
}

export default App;
