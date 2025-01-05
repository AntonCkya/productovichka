import styles from './Header.module.css';
import { Search } from '../Search/Search';


export const Header = (): JSX.Element => {
    return (
        <header className={styles.header}>
            <Search />
        </header>
    );
};
