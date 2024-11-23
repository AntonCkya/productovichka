import styles from './Footer.module.css';
import { Htag } from '../Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';
import Link from 'next/link';
import cn from 'classnames';
import { useSetup } from '../../../hooks/useSetup';
import { setFooterYear } from '../../../helpers/footer_year.helper';


export const Footer = (): JSX.Element => {
    const { router } = useSetup();

    return (
        <footer className={styles.footer}>
            <Htag tag='s' className={styles.footerText}>
                {'© ' + setFooterYear(2024) + ' ' + setLocale(router.locale).productovichka}
            </Htag>
        </footer>
    );
};
