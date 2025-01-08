import styles from './AdminPage.module.css';
import { Toaster } from 'react-hot-toast';
import { Header } from '../../components/Common/Header/Header';
import { Footer } from '../../components/Common/Footer/Footer';
import { AddForm } from '../../components/AdminComponents/AddForm/AddForm';
import { RemoveForm } from '../../components/AdminComponents/RemoveForm/RemoveForm';


export const AdminPage = (): JSX.Element => {   
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
                <Header type='admin' />
                <AddForm />
                <RemoveForm />
                <Footer />
            </div>
        </>
    );
};
