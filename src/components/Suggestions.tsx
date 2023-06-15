import { ISearchOption } from '@/src/interfaces';
import { ReactElement } from 'react';
import styles from '@/src/styles/Suggestions.module.css';

type Props = {
    searchOptions: ISearchOption[] | null;
    setCity: (option: ISearchOption) => void;
};

const Suggestions = ({ searchOptions, setCity }: Props): ReactElement => (
    <ul className={styles.suggestionList}>
        {searchOptions?.map(searchOption => (
            <li key={`${searchOption.name}-${searchOption.lat}-${searchOption.lon}`} className={styles.suggestionItem}>
                <button onClick={() => setCity(searchOption)} className={styles.suggestionButton}>
                    {searchOption.name}, {searchOption.country}
                </button>
            </li>
        ))}
    </ul>
);

export default Suggestions;
