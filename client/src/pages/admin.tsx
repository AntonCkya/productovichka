import { AdminPage } from "../../page_components/AdminPage/AdminPage";
import Head from 'next/head';
import { setLocale } from "../../helpers/locale.helper";
import { useSetup } from "../../hooks/useSetup";


function Main(): JSX.Element {
  const { router } = useSetup();

  return (
    <>
      <Head>
        <title>{setLocale(router.locale).admin}</title>
        <meta name='description' content={setLocale(router.locale).admin} />
        <meta property='og:title' content={setLocale(router.locale).admin} />
        <meta name='og:description' content={setLocale(router.locale).admin} />
        <meta charSet="utf-8" />
      </Head>
      <AdminPage />
    </>
  );
}

export default Main;
