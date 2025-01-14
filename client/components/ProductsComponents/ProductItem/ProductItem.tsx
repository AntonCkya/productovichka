import { ProductItemProps } from './ProductItem.props';
import styles from './ProductItem.module.css';
import { Htag } from '../../Common/Htag/Htag';
import { formatPrice } from '../../../helpers/format.helper';


export const ProductItem = ({ productId, name, description, price, type, score }: ProductItemProps): JSX.Element => {
    return (
        <div className={styles.productItem}>
            <div className={styles.productNameDiv}>
                <Htag tag={'m'} className={styles.productName}>
                    {name + ` (ID: ${productId}, score: ${score.toFixed(3)})`}
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