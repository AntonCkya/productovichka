import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	type: 'text' | 'email' | 'phone' | 'password',
	text: string,
	value: string,
	isError?: boolean,
	isHeight?: boolean,
	isEye?: boolean,
	onChange: (e: any) => void,
}