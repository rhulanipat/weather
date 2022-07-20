import React,{useState} from 'react';
import './App.css';

function App() {

  const apiKey='ac789174ec61c2db15cde5063c1c867b'
  const [weatherData,setWeatherData]=useState([{}])
  const [city,setCity]=useState('')
  
   const getWeather =(event)=>{
      if(event.key === 'Enter'){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`).then(
           response => response.json()
        ).then(
          data =>{
            setWeatherData(data)
            setCity('')
          }
        )
      }
   }

   const dateBuilder =(d)=>{
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
      let day=days[d.getDay()];
      let date=d.getDate();
      let month=months[d.getMonth()];
      let year=d.getFullYear();
      return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className='Container'>
       <input className='infos' 
       placeholder='Enter city'
       onChange={e=>setCity(e.target.value)}
       value={city}
       onKeyPress={getWeather}
       />

         {typeof weatherData.main === 'undefined' ?(
             <div>
              <p className='kop'>Welcome , Please enter a city to get the weather</p>
             </div>
         ):(
          <div>
            <h1>{weatherData.name},{weatherData.sys.country}</h1>
            
            <p className='tempo'>Temperature: {Math.round(weatherData.main.temp)}<sup>0</sup>c</p>
            <p className='huma'>Weather: {weatherData.weather[0].main}</p>
            <p className='h'>Humidity: {weatherData.main.humidity} %</p>
            <p className='h'>Wind Speed: {weatherData.wind.speed} Km/h</p>
            <div class="date">Date: {dateBuilder(new Date())}</div>
          </div>
         
         )}

    </div>
  );
}

export default App;
