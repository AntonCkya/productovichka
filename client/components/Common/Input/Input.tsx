import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';


export const Input = ({ type, text, value, isError, isHeight, isEye, onChange }: InputProps): JSX.Element => {
	return <input className={cn(styles.input, {
		[styles.error]: isError,
		[styles.heightInput]: isHeight,
		[styles.eye]: isEye,
	})}
		placeholder={text}
		value={value}
		onChange={onChange}
		type={type}
		name={type}
		aria-label={type} />
};