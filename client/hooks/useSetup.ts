import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../features/store/store';


export const useSetup = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const products = useSelector((state: AppState) => state.products.products);
    const search = useSelector((state: AppState) => state.search.search);

    return {
        router,
        dispatch,
        products,
        search,
    };
};
