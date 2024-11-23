import styles from './Search.module.css';
import { useState } from 'react';
import Link from 'next/link';
import SearchIcon from './search.svg';
import { useSetup } from '../../../hooks/useSetup';
import { setLocale } from '../../../helpers/locale.helper';
import cn from 'classnames';


export const Search = (): JSX.Element => {
    const { router } = useSetup();

    const [search, setSearch] = useState<string>('');
    // const [searchResults, setSearchResults] = useState<SearchItemInterface[]>([]);
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);

        if (e.target.value.trim() === '') {
            // setSearchResults([]);
            setDropdownOpen(false);

            return;
        }

        setDropdownOpen(true);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        // const newTimeout = setTimeout(async () => {
        //     if (e.target.value.trim() !== '') {
        //         try {
        //             const response: SearchInterface[] = await globalSearch(e.target.value.trim());
        //             let results: SearchItemInterface[] = [];
        //             let count = 0;

        //             for (const searchClass of response) {
        //                 if (searchClass.results.length > 0 && count < 5) {
        //                     const remaining = 5 - count;
        //                     results = [...results, ...searchClass.results.slice(0, remaining)];
        //                     count = results.length;
        //                 }
        //             }
        //             setSearchResults(results);
        //         } catch (error) {
        //             console.error("Search error: ", error);
        //         }
        //     }
        // }, 200);

        // setDebounceTimeout(newTimeout);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && search.trim() !== '') {
            setDropdownOpen(false);

            router.push(`/search?q=${search}`);
        }
    };

    return (
        <>
            <div className={styles.searchWrapper}>
                <input className={styles.search}
                    placeholder={setLocale(router.locale).search}
                    value={search}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    type='text'
                    name='text search'
                    aria-label='text search'
                    readOnly={true}
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                    autoComplete='off'
                />
                <SearchIcon className={styles.searchIcon} />
                {/* {
                    isDropdownOpen && searchResults.length > 0 ?
                        <div className={styles.dropdown}>
                            {searchResults.map(item => (
                                <Link href={`/${item.class}/${item.id}`} key={item.id} className={styles.dropdownItem}
                                    aria-label='search link' onClick={() => setDropdownOpen(false)}>
                                    <Htag tag='s'>
                                        {item.name}
                                    </Htag>
                                </Link>
                            ))}
                            <Link href={`/search?q=${search}`} className={styles.viewAll} aria-label='search all results link'
                                onClick={() => setDropdownOpen(false)}>
                                <Htag tag='s'>
                                    {setLocale(router.locale).view_all_results}
                                </Htag>
                            </Link>
                        </div>
                    : <></>
                } */}
            </div>
            <Link href='search' className={styles.searchButton}>
                <SearchIcon />
            </Link>
        </>
    );
};
