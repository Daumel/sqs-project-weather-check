import { ISearchOption } from '@/src/interfaces';
import styles from '@/src/styles/Suggestions.module.css';

type Props = {
    searchOptions: ISearchOption[] | null;
    setCity: (option: ISearchOption) => void;
};

const Suggestions = ({ searchOptions, setCity }: Props): JSX.Element => (
    <ul className={styles.suggestionList}>
        {searchOptions?.map((searchOption: ISearchOption) => (
            <li key={String(searchOption.lat) + '-' + String(searchOption.lon)} className={styles.suggestionItem}>
                <button onClick={() => setCity(searchOption)} className={styles.suggestionButton}>
                    {searchOption.name}, {searchOption.country}
                </button>
            </li>
        ))}
    </ul>
);

export default Suggestions;
