import { IForecast } from '@/src/interfaces';

type Props = {
    forecast: IForecast;
};

const Suggestions = ({ forecast }: Props): JSX.Element => (
    <section>
        <h1>{forecast.name}</h1>
        <p>{forecast.main.temp}</p>
    </section>
);

export default Suggestions;
