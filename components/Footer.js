import useWindowSize from "../hooks/useWindowSize"
import {LinkedinLogo, WhatsappLogo, LogoAlex, GithubLogo } from '../components/PageIcons'

const Footer = () => {

  const window = useWindowSize()

  return (
    <footer>
      <nav data-footer-links>
        <a href="https://www.github.com/alexqs96" target="_blank" rel="noreferrer noopener" title='Visita mi Github'>{window.width < 768 ? <GithubLogo/> : 'Github'}</a>
        <a href="https://www.linkedin.com/in/alexander-mamani" target="_blank" rel="noreferrer noopener" title='Visita mi Linkedin'>{window.width < 768 ? <LinkedinLogo/> : 'Linkedin'}</a>
        <a href="https://wa.me/+5491122636544" target="_blank" rel="noreferrer noopener" title='Contactame en Whatsapp'>{window.width < 768 ? <WhatsappLogo/> : 'Whatsapp'}</a>
        <a href="https://alexqs96.vercel.app" target="_blank" rel="noreferrer noopener" title='Visita mi Porfolio'>{window.width < 768 ? <LogoAlex/> : 'Porfolio'}</a>
      </nav>
    </footer>
  )
}

export default Footer
