import { IForecast } from '@/src/interfaces';
import styles from '@/src/styles/Forecast.module.css';

type Props = {
    forecast: IForecast;
};

const Forecast = ({ forecast }: Props): JSX.Element => (
    <section>
        <div className={styles.forecastContainer}>
            <h2 className={styles.cityName}>{forecast.name}</h2>
            <p className={styles.temperature}>{forecast.main.temp}&nbsp;&deg;C</p>
        </div>
    </section>
);

export default Forecast;
