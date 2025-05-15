'use-client'

import { LuInstagram, LuFacebook, LuLinkedin } from 'react-icons/lu'
import style from './style.module.css'

export default function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer_content}>
        <div className={style.contacts}>
          <h3>Os melhores veículos na melhor qualidade estão aqui!</h3>
          <p>
            Adquira conforto nas suas viagens e no seu dia a dia comprando
            conosco!
          </p>
          <div className={style.social_media}>
            <a href="#" className={style.social_link} id="instagram">
              <LuInstagram />
            </a>
            <a href="#" className={style.social_link} id="facebook">
              <LuFacebook />
            </a>
            <a href="#" className={style.social_link} id="linkedin">
              <LuLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className={style.copyright}>2025, Feito por Rafael Reis Schaper</div>
    </footer>
  )
}
