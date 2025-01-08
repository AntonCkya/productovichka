import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import { Search } from '../Search/Search';
import { Button } from '../Button/Button';
import { useSetup } from '../../../hooks/useSetup';
import { setLocale } from '../../../helpers/locale.helper';


export const Header = ({ type }: HeaderProps): JSX.Element => {
    const { router } = useSetup();
    
    return (
        <header className={styles.header}>
            <Search />
            <Button text={setLocale(router.locale)[type === 'main' ? 'admin' : 'main']}
                onClick={() => router.push(`/${type === 'main' ? 'admin' : ''}`)} />
        </header>
    );
};
