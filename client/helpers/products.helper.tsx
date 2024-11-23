import axios, { AxiosResponse } from "axios";
import { setProducts, setProductsDefault } from "../features/products/productsSlice";
import { ProductItem, ProductsInterface } from "../interfaces/products.interface";


export async function getProducts(dispatch: any) {
     try {
        dispatch(setProductsDefault());

        // const { data: response }: AxiosResponse<ProductsInterface> = await axios.get(process.env.NEXT_PUBLIC_DOMAIN +
        //     '',
        //     {
        //         headers: {
        //             'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
        //         },
        //     }
        // );

        const createProduct = (id: number) => ({
            id,
            name: 'Дениска',
            description: 'Милый мальчик, но иногда злюка. Любит наводить суету',
            price: 100500,
            photo: '/denis.webp',
            type: 'Котик',
        });

        const n = 8;        
        const products: ProductItem[] = Array.from({ length: n }, (_, index) => createProduct(index + 1));

        const productsData: ProductsInterface = {
            products: products,
            total_count: n,
            limit: 100,
            offset: 0,
        }
                
        dispatch(setProducts(productsData));
    } catch (err) {
        console.error('Get products error: ' + err);
    }
}
