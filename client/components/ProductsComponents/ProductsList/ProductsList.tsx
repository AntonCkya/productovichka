import styles from './ProductsList.module.css';
import { useSetup } from '../../../hooks/useSetup';
import { ProductItem } from '../ProductItem/ProductItem';
import { Spinner } from '../../Common/Spinner/Spinner';
import { Htag } from '../../Common/Htag/Htag';
import { setLocale } from '../../../helpers/locale.helper';


export const ProductsList = (): JSX.Element => {
    const { router, products } = useSetup();

    const filteredProducts = products.products.filter(p => p.score >= 0.5);

    return (
        <>
            {
                products.total_count > 0 ?
                    <>
                        <Htag tag='m' className={styles.notFoundText}>
                            {setLocale(router.locale).products_found + ': ' + filteredProducts.length}
                        </Htag>
                        <div className={styles.productsList}>
                            {filteredProducts.map(p =>
                                <ProductItem key={p.id} productId={p.id} name={p.name}
                                    description={p.description} price={p.price} type={p.type}
                                    score={p.score} />
                            )}
                        </div>
                    </>
                : products.total_count === 0 ?
                    <Htag tag='m' className={styles.notFoundText}>
                        {setLocale(router.locale).no_products_found}
                    </Htag>
                :
                    <div className={styles.spinnerDiv}>
                        <Spinner />
                    </div>
            }
        </>
    );
};
