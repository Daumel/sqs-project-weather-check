import SearchWeather from './components/SearchWeather';
import Forecast from './components/Forecast';
import { useState } from 'react';
import { IForecast } from './interfaces';

const App = (): JSX.Element => {
    const [forecast, setForecast] = useState<IForecast | null>(null);

    return <main>{forecast ? <Forecast forecast={forecast} /> : <SearchWeather setForecast={setForecast} />}</main>;
};

export default App;
