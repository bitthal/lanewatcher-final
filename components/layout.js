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
        <title>Lanewatcher</title>
        <meta name="description" content="LaneWatcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
      {showHeader && <Header />}
      <div className={`${showHeader ? "bg-[#fff]" : ""}`}>
      {children}
      </div>
      </main>
    </>
  )
}