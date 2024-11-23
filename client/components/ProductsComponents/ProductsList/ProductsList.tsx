import styles from './ProductsList.module.css';
import { useSetup } from '../../../hooks/useSetup';
import { ProductItem } from '../ProductItem/ProductItem';
import { Spinner } from '../../Common/Spinner/Spinner';


export const ProductsList = (): JSX.Element => {
    const { products } = useSetup();
    console.log(products)

    return (
        <>
            {
                products.total_count > -1 ?
                    <div className={styles.productsList}>
                        {products.products.map(p => 
                            <ProductItem key={p.id} name={p.name}
                                description={p.description} price={p.price}
                                photo={p.photo} type={p.type} />
                        )}
                    </div>
                :
                    <div className={styles.spinnerDiv}>
                        <Spinner />
                    </div>
            }
        </>
    );
};
