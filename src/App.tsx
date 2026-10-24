import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Activities } from './components/Activities'
import { MemoryMosaic } from './components/MemoryMosaic'
import { Podcast } from './components/Podcast'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        تخطَّ إلى المحتوى
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Activities />
        <MemoryMosaic />
        <Podcast />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
