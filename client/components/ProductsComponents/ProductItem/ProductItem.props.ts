import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ProductItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    productId: number,
    name: string,
    description: string,
    price: number,
    type: string,
}
