import { MainPage } from "../../page_components/MainPage/MainPage";
import Head from 'next/head';
import { setLocale } from "../../helpers/locale.helper";
import { useSetup } from "../../hooks/useSetup";
import { useEffect } from "react";
import { getProducts } from "../../helpers/products.helper";


function Main(): JSX.Element {
  const { router, dispatch } = useSetup();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>{setLocale(router.locale).productovichka}</title>
        <meta name='description' content={setLocale(router.locale).productovichka} />
        <meta property='og:title' content={setLocale(router.locale).productovichka} />
        <meta name='og:description' content={setLocale(router.locale).productovichka} />
        <meta charSet="utf-8" />
      </Head>
      <MainPage />
    </>
  );
}

export default Main;
