import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Header } from '../../components/Common/Header/Header';
import { Footer } from '../../components/Common/Footer/Footer';
import { ProductsList } from '../../components/ProductsComponents/ProductsList/ProductsList';


export const MainPage = (): JSX.Element => {
    const router = useRouter();
    
    return (
        <>
            <Toaster
				position="top-center"
				reverseOrder={true}
				toastOptions={{
					duration: 2000,
				}}
			/>
            <div className={styles.wrapper}>
                <Header />
                <ProductsList />
                <Footer />
            </div>
        </>
    );
};
