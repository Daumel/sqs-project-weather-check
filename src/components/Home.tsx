import { IForecast } from '@/src/interfaces';
import { useEffect, useState } from 'react';
import SearchWeather from '@/src/components/SearchWeather';
import Forecast from '@/src/components/Forecast';
import axios from 'axios';
import styles from '@/src/styles/Home.module.css';

const WEATHER_CHECK_POST_URL = '/api/weather-check';

const Home = (): JSX.Element => {
    const [forecast, setForecast] = useState<IForecast | null>(null);

    const createWeatherCheck = (forecast: IForecast) => {
        axios
            .post(WEATHER_CHECK_POST_URL, {
                name: forecast.name,
                temp: forecast.main.temp,
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    useEffect(() => {
        if (forecast) {
            createWeatherCheck(forecast);
        }
    }, [forecast]);

    return (
        <>
            <h1 className={styles.title}>Weather Check</h1>
            <main>
                <div className="flexContainer">
                    {forecast ? <Forecast forecast={forecast} /> : <SearchWeather setForecast={setForecast} />}
                </div>
            </main>
        </>
    );
};

export default Home;
