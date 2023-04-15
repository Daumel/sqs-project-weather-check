import { useState, useEffect, ChangeEvent } from 'react';
import { IForecast, ISearchOption } from '../interfaces/index';
import Suggestions from './Suggestions';
import { fetchSearchOptions, fetchForecast } from '../api/ForecastAPI';

type Props = {
    setForecast: (option: IForecast) => void;
};

const SearchWeather = ({ setForecast }: Props): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchOptions, setSearchOptions] = useState<ISearchOption[] | null>(null);
    const [city, setCity] = useState<ISearchOption | null>(null);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);

        const value = e.target.value.trim();
        if (value.length >= 3) {
            void fetchSearchOptions(value, setSearchOptions);
        }
    };

    const onSubmit = () => {
        if (!city) return;

        void fetchForecast(city, setForecast);
    };

    useEffect(() => {
        if (city) {
            setSearchTerm(city.name);
            setSearchOptions([]);
        }
    }, [city]);

    return (
        <section>
            <input type="text" value={searchTerm} onChange={onInputChange} />
            <button onClick={onSubmit}>Search</button>

            <Suggestions searchOptions={searchOptions} setCity={setCity} />
        </section>
    );
};

export default SearchWeather;
