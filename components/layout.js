import Header from './Header'
import Head  from 'next/head'


export default function Layout({ children }) {
  return (
    <> 
      <Head>
        <title>Lanewatcher</title>
        <meta name="description" content="LaneWatcher" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Header />
      <div class="relative top-24">
      {children}
      </div>
      </main>
    </>
  )
}