import React,{useEffect,useState} from 'react';

const Weather = () => {
    let currHour=new Date().getHours();
    
    let greet=" ";
    let greetStyle=" ";

    if((currHour>=1) && (currHour<12)){
        greet="good morning";
        greetStyle={color:'green'};
    }
    else if((currHour>=12) && (currHour<19)){
        greet="good afternoon";
        greetStyle={color:'grey'};
    }

    else{
        greet="good night"
        greetStyle={color:'red'};
    }



    const [temp,setTemp]=useState(null);

    const [minTemp,setMinTemp]=useState(null);
    const [maxTemp,setMaxTemp]=useState(null);

    const [search,setSearch]=useState('kotdwar');
    const [change,setChange]=useState('kotdwar');
    const [error,setError]=useState("");
    const [weather,setWeather]=useState("");

    const handleChange=(e)=>{
        const value=e.target.value;
        setChange(value);
    }

    const handleSearch=(e)=>{
        e.preventDefault();
        setSearch(change);
    }

    useEffect(()=>{
        const fetchApi=async()=>{
            try{
                const url=`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=7c3e4d7a109cb0e7252363a9812ebeb8`;
                const res=await fetch(url);
                const responseJson=await res.json();
                console.log(responseJson.main.temp);
                setTemp(responseJson.main.temp);
                setMinTemp(responseJson.main.temp_min);
                setMaxTemp(responseJson.main.temp_max);
                setWeather(responseJson.weather[0].main);
                console.log(responseJson.weather[0].main);
                setError("");
            }
            catch(error){
                console.log(error);
                setError("Some error occured")
            }
          

        
       

        };

        fetchApi();
    },[search])

    return (
        <>
   <div className="heading">Weather App</div>

        <div className="weather_container">
        <div className="greet">hello sir,<span style={greetStyle}>{greet}</span></div>
        <div className="error_container">{error}</div>

        <div className="search">
            <input type="search" placeholder="enter city..."  onChange={handleChange} />
            <div className="button"><button onClick={handleSearch}>search</button></div>
        </div>

        {
           !temp ?<p>No City Found</p>:(<>
                {/* <div className="emojis"><i className="fas fa-cloud"></i></div> */}

                <div className="emojis">{
                    weather==="Clear"?<i class="fas fa-sun"></i>:weather==="Clouds"?<i className="fas fa-cloud"></i>:weather==="Rain"?<i class="fas fa-cloud-showers-heavy"></i>:<i class="fas fa-sun"></i>
                }
                </div>
      <div className="location">
    <i className="fas fa-map-marker-alt"></i> {search}
    </div>
        <div className="main_temp">{temp} ° C</div>
    <div className="min_max">min temp {minTemp} °C  | max temp {maxTemp}°C</div>
   
    </>
            )
        }


        

   
    </div>

        </>
    )
}

export default Weather;
