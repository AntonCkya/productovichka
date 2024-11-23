import { ProductItemProps } from './ProductItem.props';
import styles from './ProductItem.module.css';
import Image from 'next/image';
import { Htag } from '../../Common/Htag/Htag';
import { formatPrice } from '../../../helpers/format.helper';


export const ProductItem = ({ name, description, price, photo, type }: ProductItemProps): JSX.Element => {
    return (
        <div className={styles.productItem}>
            <Image className={styles.productPhoto} draggable='false'
                loader={() => photo}
                src={photo}
                alt={name + ' image'}
                width={1}
                height={1}
                unoptimized={true}
                priority
            />
            <div className={styles.productNameDiv}>
                <Htag tag={'m'} className={styles.productName}>
                    {name}
                </Htag>
                <Htag tag='s' className={styles.productType}>
                    {type}
                </Htag>
            </div>
            <Htag tag='s' className={styles.productDescription}>
                {description}
            </Htag>
            <Htag tag='l' className={styles.productPrice}>
                {formatPrice(price)}
            </Htag>
        </div>
    );
};
