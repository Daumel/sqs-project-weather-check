import {IForecast} from "@/src/interfaces";
import {useEffect, useState} from "react";
import SearchWeather from "@/src/components/SearchWeather";
import Forecast from "@/src/components/Forecast";
import {createWeatherCheck} from "@/src/persistence/weatherCheck";

const Home = (): JSX.Element => {
    const [forecast, setForecast] = useState<IForecast | null>(null);

    useEffect(() => {
        if (forecast) {
            void createWeatherCheck(forecast.name, forecast.main.temp);
        }
    }, [forecast]);

    return (
        <div>
            <h1>Weather Check</h1>
            <main>{forecast ? <Forecast forecast={forecast}/> : <SearchWeather setForecast={setForecast}/>}</main>
        </div>
    );
};

export default Home;
