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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
      {showHeader && 
      <div >
      <Header />
      <Leftbar show={show} setShow={setShow}/>
      </div>
      }
      <div className={` 
      ${show && showHeader ? 'ml-32' : !show && showHeader ? "ml-52" : ''} transition-max-h duration-700 mt-20 `}>
      {children}
      </div>
      </main>
    </>
  )
}