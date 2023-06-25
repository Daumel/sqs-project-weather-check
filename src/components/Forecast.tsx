import { IForecast } from '@/src/interfaces';
import { ReactElement } from 'react';
import styles from '@/src/styles/Forecast.module.css';

type Props = {
    forecast: IForecast;
};

const Forecast = ({ forecast }: Props): ReactElement => (
    <section>
        <div className={styles.forecastContainer}>
            <h2 className={styles.locationName}>{forecast.name}</h2>
            <p className={styles.temperature}>{forecast.main.temp}&nbsp;&deg;C</p>
        </div>
    </section>
);

export default Forecast;
