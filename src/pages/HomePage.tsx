import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { Activities } from '../components/Activities'
import { MemoryMosaic } from '../components/MemoryMosaic'
import { Podcast } from '../components/Podcast'
import { Contact } from '../components/Contact'

/** الصفحة الرئيسية: الأقسام كما هي، بلا شريط تنقّل إضافي. */
export function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Activities />
      <MemoryMosaic />
      <Podcast />
      <Contact />
    </>
  )
}
