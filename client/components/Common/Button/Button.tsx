import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import { Htag } from '../../Common/Htag/Htag';
import cn from 'classnames';


export const Button = ({ text, isLoading, isHeight, className, onClick }: ButtonProps): JSX.Element => {
    return (
        <button className={cn(styles.button, className, {
            [styles.heightButton]: isHeight,
        })} onClick={onClick}>
            {
                !isLoading ?
                    <Htag tag='s' className={styles.text}>
                        {text}
                    </Htag>
                : <div className={styles.spinner} />
            }
        </button>
    );
};
