import SearchNote from "../components/SearchNote"
import Link from "next/link"
import useWindowSize from '../hooks/useWindowSize'
import {openNav, logoNav} from '../utils/tools'
import Image from "next/image"
import { NavMenu } from "./PageIcons"

const Header = () => {
  
  const window = useWindowSize();

  return (
    <header>
      <Link href='/' data-type-logopage><Image width={65} height={65} priority={true} onClick={() => logoNav()} src='/img/tanlogo.png' alt='Throw a Note Logo'/></Link>
      <SearchNote/>
      {
        window.width < 768?
          <div data-menu onClick={() => openNav()}>
            <NavMenu/>
          </div>
          :
          <Link href='/note' onClick={() => window.width < 768 && openNav()} data-create-note>Crear Nota</Link>
      }
      <div className="nav">
        <span onClick={() => openNav()}>X</span>
        <Link href='/note' onClick={() => openNav()}>Crear Nota</Link>
        <Link href="/notes" onClick={() => openNav()}>Notas</Link>
      </div>
    </header>
  )
}

export default Header
