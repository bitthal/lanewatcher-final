import React, { useState, useEffect, useContext } from "react";
import Header from './Header'
import Head  from 'next/head';
import { useRouter } from 'next/router';
import Leftbar from './Leftbar';

export default function Layout({ children }) {
  const [show, setShow] = useState(true);

  const router = useRouter().pathname.replace(/\//, "").charAt(0).toUpperCase() +
  useRouter().pathname.replace(/\//, "").slice(1);
  const showHeader = router == '' ? false : true; // Hide header on the login page
  return (
    <> 
      <Head>
        <title>Lanewatch</title>
        <meta name="description" content="Lanewatch" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
      {showHeader && 
      <div >
      <Header />
      <Leftbar show={show} setShow={setShow}/>
      </div>
      }
      <div className={`${showHeader ? "" : 'mt-32'} 
      ${show ? 'transition-max-h duration-700 ml-40' : "transition-max-h duration-700 ml-52"} mt-20`}>
      {children}
      </div>
      </main>
    </>
  )
}