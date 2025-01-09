import styles from './RemoveForm.module.css';
import { useSetup } from '../../../hooks/useSetup';
import { Input } from '../../Common/Input/Input';
import { useState } from 'react';
import { setLocale } from '../../../helpers/locale.helper';
import { Button } from '../../Common/Button/Button';
import { checkRemoveProduct } from '../../../helpers/products.helper';


export const RemoveForm = (): JSX.Element => {
    const { router } = useSetup();

    const [productId, setProductId] = useState<string>('');

    const [errProductId, setErrProductId] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={styles.removeForm}>
            <Input type='text' text={setLocale(router.locale).product_id}
                value={productId} isError={errProductId} isHeight={true}
                onChange={(e) => setProductId(e.target.value)} />
            <Button text={setLocale(router.locale).remove_product} isLoading={isLoading}
                isHeight={true} onClick={() => checkRemoveProduct({
                    router: router,
                    setIsLoading: setIsLoading,
                    productId: productId.trim(),
                    setErrProductId: setErrProductId,
                })} />
        </div>
    );
};
