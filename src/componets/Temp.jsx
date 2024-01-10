import React, { useEffect } from 'react'
import { useState } from 'react';
import Weathercard from './weathercard';

const Temp = () => {
  const[searchValue,setSearchValue]=useState("pune");
  const[tempInfo,setTempInfo]=useState({});
  const getWeatherInfo= async()=>{
    try{
      let url= `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9d89ea493756e5cfa4a001dcb6046043`
      const res=  await fetch(url);
      const data=  await res.json();
      const{temp,humidity,pressure}=data.main;
      const{main:weathermood}=data.weather[0];
      const{name}=data;
      const{speed}=data.wind;
      const{country,sunset}=data.sys;
      const MyNewWeatherInfo={
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,

      };
      setTempInfo(MyNewWeatherInfo);

      // console.log(temp);
      // console.log(data);

    }catch(error)
{
  console.log(error);
}
  };
  useEffect(()=>{
    getWeatherInfo();
  },[]);
  return (
    <>
        <div className="heading">THE WEATHER CHANNEL</div>
        <div ClassName="wrap">
            <div ClassName="search">
                <input type="search"
                placeholder='search...'
                autofocus
                id="search"
                className="searchTerm"
                value={searchValue }
                onChange={ (e)=>setSearchValue(e.target.value)}/>
                <button className="searchButton" type="button"   onClick={getWeatherInfo}>Search
                </button>

            </div>
        </div>

    
                {/* temp card */}
                <Weathercard tempInfo={tempInfo}/>

    </>
  );
};

export default Temp;