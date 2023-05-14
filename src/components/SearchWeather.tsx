import { useState, useEffect, ChangeEvent } from 'react';
import { IForecast, ISearchOption } from '@/src/interfaces';
import Suggestions from './Suggestions';
import axios from 'axios';
import styles from '@/src/styles/SearchWeather.module.css';

const SEARCH_OPTIONS_GET_URL = '/api/api-search-options';
const FORECAST_GET_URL = '/api/api-forecast';

type Props = {
    setForecast: (option: IForecast) => void;
};

const SearchWeather = ({ setForecast }: Props): JSX.Element => {
    const [rawSearchTerm, setRawSearchTerm] = useState('');
    const [searchOptions, setSearchOptions] = useState<ISearchOption[] | null>(null);
    const [city, setCity] = useState<ISearchOption | null>(null);

    const fetchSearchOptions = async (searchTerm: string) => {
        await axios
            .get<ISearchOption[]>(SEARCH_OPTIONS_GET_URL, { params: { term: searchTerm } })
            .then(response => {
                setSearchOptions(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    const fetchForecast = async (city: ISearchOption) => {
        await axios
            .get<IForecast>(FORECAST_GET_URL, {
                params: { name: city.name, lat: city.lat, lon: city.lon },
            })
            .then(response => {
                setForecast(response.data);
            })
            .catch(error => {
                console.error(error.message);
            });
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRawSearchTerm(e.target.value);

        const searchTerm = e.target.value.trim();
        if (searchTerm.length >= 3) {
            fetchSearchOptions(searchTerm);
        }
    };

    const onSubmit = () => {
        if (!city) {
            return;
        }
        fetchForecast(city);
    };

    useEffect(() => {
        if (city) {
            setRawSearchTerm(city.name);
            setSearchOptions([]);
        }
    }, [city]);

    return (
        <section>
            <div className="flexContainer">
                <input type="text" value={rawSearchTerm} onChange={onInputChange} className={styles.searchTermInput} />
                <button onClick={onSubmit} className={styles.searchButton}>
                    Search
                </button>
            </div>
            <Suggestions searchOptions={searchOptions} setCity={setCity} />
        </section>
    );
};

export default SearchWeather;
