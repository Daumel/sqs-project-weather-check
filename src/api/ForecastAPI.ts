import axios from 'axios';
import { ISearchOption, IForecast } from '../interfaces';

const BASE_URL = 'http://api.openweathermap.org';
const API_KEY = process.env.REACT_APP_API_KEY ?? '';

export async function fetchSearchOptions(
    searchTerm: string,
    setSearchOptions: (searchOptions: ISearchOption[]) => void
) {
    const searchOptionsUrl = `${BASE_URL}/geo/1.0/direct?q=${searchTerm.trim()}&limit=5&lang=en&appid=${API_KEY}`;
    await axios
        .get<ISearchOption[]>(searchOptionsUrl)
        .then((res) => res.data)
        .then((data) => {
            setSearchOptions(data);
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.log(error.response);
            } else {
                console.log(error);
            }
        });
}

export async function fetchForecast(searchOption: ISearchOption, setForecast: (forecast: IForecast) => void) {
    const forecastUrl = `${BASE_URL}/data/2.5/weather?lat=${searchOption.lat}&lon=${searchOption.lon}&units=metric&appid=${API_KEY}`;
    await axios
        .get<IForecast>(forecastUrl)
        .then((res) => res.data)
        .then((data) => {
            setForecast(data);
        })
        .catch((error) => {
            if (axios.isAxiosError(error)) {
                console.log(error.status);
                console.log(error.response);
            } else {
                console.log(error);
            }
        });
}
