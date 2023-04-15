import { ISearchOption } from '../interfaces/index';

type Props = {
    searchOptions: ISearchOption[] | null;
    setCity: (option: ISearchOption) => void;
};

const Suggestions = ({ searchOptions, setCity }: Props): JSX.Element => (
    <ul>
        {searchOptions?.map((searchOption: ISearchOption) => (
            <li key={String(searchOption.lat) + '-' + String(searchOption.lon)}>
                <button onClick={() => setCity(searchOption)}>
                    {searchOption.name}, {searchOption.country}
                </button>
            </li>
        ))}
    </ul>
);

export default Suggestions;
