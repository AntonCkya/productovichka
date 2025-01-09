import styles from './AddForm.module.css';
import { useSetup } from '../../../hooks/useSetup';
import { Input } from '../../Common/Input/Input';
import { useState } from 'react';
import { setLocale } from '../../../helpers/locale.helper';
import { Button } from '../../Common/Button/Button';
import { checkAddProduct } from '../../../helpers/products.helper';


export const AddForm = (): JSX.Element => {
    const { router } = useSetup();

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [type, setType] = useState<string>('');

    const [errName, setErrName] = useState<boolean>(false);
    const [errDescription, setErrDescription] = useState<boolean>(false);
    const [errPrice, setErrPrice] = useState<boolean>(false);
    const [errType, setErrType] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={styles.addForm}>
            <Input type='text' text={setLocale(router.locale).name}
                value={name} isError={errName} isHeight={true}
                onChange={(e) => setName(e.target.value)} />
            <Input type='text' text={setLocale(router.locale).description}
                value={description} isError={errDescription} isHeight={true}
                onChange={(e) => setDescription(e.target.value)} />
            <Input type='text' text={setLocale(router.locale).price}
                value={price} isError={errPrice} isHeight={true}
                onChange={(e) => setPrice(e.target.value)} />
            <Input type='text' text={setLocale(router.locale).type}
                value={type} isError={errType} isHeight={true}
                onChange={(e) => setType(e.target.value)} />
            <Button text={setLocale(router.locale).add_product} isLoading={isLoading}
                isHeight={true} onClick={() => checkAddProduct({
                    router: router,
                    setIsLoading: setIsLoading,
                    name: name.trim(),
                    description: description.trim(),
                    price: price.trim(),
                    type: type.trim(),
                    setErrName: setErrName,
                    setErrDescription: setErrDescription,
                    setErrPrice: setErrPrice,
                    setErrType: setErrType,
                })} />
        </div>
    );
};
