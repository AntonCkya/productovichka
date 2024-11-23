import styles from './Header.module.css';
import { useSetup } from '../../../hooks/useSetup';
import { Search } from '../Search/Search';


export const Header = (): JSX.Element => {
    const { router } = useSetup();

    return (
        <header className={styles.header}>
            <Search />
        </header>
    );
};
