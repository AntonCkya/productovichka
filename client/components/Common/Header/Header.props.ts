import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';


export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {
    type: 'main' | 'admin',
}
