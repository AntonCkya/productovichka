import styles from './Search.module.css';
import SearchIcon from './search.svg';
import { useSetup } from '../../../hooks/useSetup';
import { setLocale } from '../../../helpers/locale.helper';
import { setSearch } from "../../../features/search/searchSlice";
import { useState, useEffect } from 'react';


export const Search = (): JSX.Element => {
    const { router, dispatch, search } = useSetup();
    const [inputValue, setInputValue] = useState<string>(search);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            dispatch(setSearch(newValue));
        }, 200);

        setDebounceTimeout(newTimeout);
    };

    useEffect(() => {
        return () => {
            if (debounceTimeout) {
                clearTimeout(debounceTimeout);
            }
        };
    }, [debounceTimeout]);

    return (
        <div className={styles.searchWrapper}>
            <input className={styles.search}
                placeholder={setLocale(router.locale).search}
                value={inputValue}
                onChange={handleInputChange}
                type='text'
                name='search'
                aria-label='search'
                readOnly={true}
                onFocus={(e) => e.target.removeAttribute('readonly')}
                autoComplete='off'
            />
            <SearchIcon className={styles.searchIcon} />
        </div>
    );
};
