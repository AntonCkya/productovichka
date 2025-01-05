import axios, { AxiosResponse } from "axios";
import { setProducts, setProductsDefault } from "../features/products/productsSlice";
import { ProductItem } from "../interfaces/products.interface";


export async function getProducts(query: string, dispatch: any) {
     try {
        dispatch(setProductsDefault());

        const { data: response }: AxiosResponse<ProductItem[]> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
            '/ping?query=' + query,
        );

        dispatch(setProducts({
            products: response,
            total_count: response.length,
        }));
    } catch (err) {
        console.error('Get products error: ' + err);
    }
}
