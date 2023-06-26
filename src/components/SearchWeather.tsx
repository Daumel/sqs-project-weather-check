import { useState, useEffect, ChangeEvent, ReactElement } from 'react';
import { IForecast, ISearchOption } from '@/src/interfaces';
import Suggestions from '@/src/components/Suggestions';
import axios from 'axios';
import styles from '@/src/styles/SearchWeather.module.css';

const SEARCH_OPTIONS_GET_URL = '/api/api-search-options';
const FORECAST_GET_URL = '/api/api-forecast';

type Props = {
    setForecast: (option: IForecast) => void;
};

const SearchWeather = ({ setForecast }: Props): ReactElement => {
    const [rawSearchTerm, setRawSearchTerm] = useState('');
    const [searchOptions, setSearchOptions] = useState<ISearchOption[] | null>(null);
    const [location, setLocation] = useState<ISearchOption | null>(null);

    const fetchSearchOptions = (searchTerm: string) => {
        axios
            .get<ISearchOption[]>(SEARCH_OPTIONS_GET_URL, { params: { term: searchTerm } })
            .then(response => {
                setSearchOptions(response.data);
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    const fetchForecast = (location: ISearchOption) => {
        axios
            .get<IForecast>(FORECAST_GET_URL, {
                params: { name: location.name, lat: location.lat, lon: location.lon },
            })
            .then(response => {
                setForecast(response.data);
            })
            .catch(error => {
                console.log(error.message);
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
        if (!location) {
            return;
        }
        fetchForecast(location);
    };

    useEffect(() => {
        if (location) {
            setRawSearchTerm(location.name);
            setSearchOptions([]);
        }
    }, [location]);

    return (
        <section>
            <div className="flexContainer">
                <input type="text" value={rawSearchTerm} onChange={onInputChange} className={styles.searchTermInput} />
                <button onClick={onSubmit} className={styles.searchButton}>
                    Search
                </button>
            </div>
            <Suggestions searchOptions={searchOptions} setLocation={setLocation} />
        </section>
    );
};

export default SearchWeather;
