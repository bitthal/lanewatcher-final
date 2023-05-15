import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
