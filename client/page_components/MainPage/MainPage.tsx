import styles from './MainPage.module.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '../../components/Common/Header/Header';
import { Footer } from '../../components/Common/Footer/Footer';
import { ProductsList } from '../../components/ProductsComponents/ProductsList/ProductsList';


export const MainPage = (): JSX.Element => {   
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
                <Header type='main' />
                <ProductsList />
                <Footer />
            </div>
        </>
    );
};
