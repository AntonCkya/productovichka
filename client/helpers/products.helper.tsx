import axios, { AxiosResponse } from "axios";
import { setProducts, setProductsDefault } from "../features/products/productsSlice";
import { ProductItem } from "../interfaces/products.interface";
import { AddArguments, RemoveArguments } from "../interfaces/refactor.interface";
import { ToastSuccess } from "../components/Common/Toast/Toast";
import { setLocale } from "./locale.helper";


export async function getProducts(query: string, dispatch: any) {
    try {
        dispatch(setProductsDefault());

        const { data: response }: AxiosResponse<ProductItem[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/product?query=' + query,
        );

        dispatch(setProducts({
            products: response,
            total_count: response.length,
        }));
    } catch (err) {
        console.error('Get products error: ' + err);
    }
}

export async function checkAddProduct(args: AddArguments) {
    const { setIsLoading, name, description, price, type,
        setErrName, setErrDescription, setErrPrice, setErrType } = args;

    setIsLoading(true);

    setErrName(false);
    setErrDescription(false);
    setErrPrice(false);
    setErrType(false);

    if (name && description && price && type) {
        addProduct(args);
    } else {
        setIsLoading(false);

        if (!name) {
            setErrName(true);
        }
        
        if (!description) {
            setErrDescription(true);
        }

        if (!price) {
            setErrPrice(true);
        }

        if (!type) {
            setErrType(true);
        }
    }
}

export async function addProduct(args: AddArguments) {
    const { router, setIsLoading, name, description, price, type } = args;

    try {
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN +
            `/add?name=${name}&description=${description}&price=${price}&type=${type}`,
        );

        ToastSuccess(setLocale(router.locale).product_added_successfully);
    } catch (err) {
        console.error('Adding product error: ' + err);
    } finally {
        setIsLoading(false);
    }
}

export async function checkRemoveProduct(args: RemoveArguments) {
    const { setIsLoading, productId, setErrProductId } = args;

    setIsLoading(true);

    setErrProductId(false);

    if (productId) {
        removeProduct(args);
    } else {
        setIsLoading(false);
        setErrProductId(true);
    }
}

export async function removeProduct(args: RemoveArguments) {
    const { router, setIsLoading, productId } = args;

    try {
        await axios.delete(process.env.NEXT_PUBLIC_DOMAIN +
            `/delete/${productId}`,
        );

        ToastSuccess(setLocale(router.locale).product_removed_successfully);
    } catch (err) {
        console.error('Removing product error: ' + err);
    } finally {
        setIsLoading(false);
    }
}
