import "@/styles/globals.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Router from "next/router";
import Layout from "@/components/layout";
import Context from "../context/context"


export default function App({ Component, pageProps,router }) {


  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });


  // console.log = function () {};
  // console.warn = function () {};
  // console.error = function () {};
  return (
    <>
      <Context>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      </Context>
    </>
  );
}
