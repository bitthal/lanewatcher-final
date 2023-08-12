import Header from './Header'
import Head  from 'next/head';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
  useRouter().pathname.replace(/\//, "").slice(1);
  const showHeader = router == '' ? false : true; // Hide header on the login page
  return (
    <> 
      <Head>
        <title>Lanewatch</title>
        <meta name="description" content="Lanewatch" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
      {showHeader && <Header />}
      
      <div className={`${showHeader ? "mt-20" : "mt-20"}`}>
      {children}
      </div>
      </main>
    </>
  )
}