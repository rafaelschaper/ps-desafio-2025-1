'use-client'

import { useEffect, useState } from 'react'
import style from './style.module.css'
import { getSession } from 'next-auth/react'
import { useToast } from '@/components/use-toast'
import { api } from '@/services/api'
import { LuMenu, LuX } from 'react-icons/lu'

interface navBarProps {
  onCategorySelect: (category: string | null) => void
}

export default function Navbar({ onCategorySelect }: navBarProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [categories, setCategories] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const requestDataSession = async () => {
      const sessionResponse = await getSession()

      if (sessionResponse) {
        setIsAuth(!!sessionResponse.user)
      } else {
        toast({
          title: 'Você não está logado!',
        })
      }
    }

    const fetchCategories = async () => {
      const { response } = await api<{ name: string }[]>('GET', '/category')
      if (response) {
        setCategories(response.map((cat) => cat.name))
      }
    }

    requestDataSession()
    fetchCategories()
    setIsMobileMenuOpen(false)
  }, [toast])

  const handleCategorySelect = (category: string | null) => {
    onCategorySelect(category as string | null)
    setShowDropdown(false)
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={style.navbar}>
      <div className={style.navbar_nav}>
        <h1 className={style.title}>
          <span className={style.sama}>SAMA</span>{' '}
          <span className={style.motors}>MOTORS</span>
        </h1>
        <button
          className={style.menu_button}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
        <ul
          className={`${style.nav_links} ${isMobileMenuOpen ? style.open : ''}`}
        >
          <li className={style.nav_item}>
            <a href="#">Início</a>
          </li>
          <li className={style.nav_item}>
            <a href="#">Veículos</a>
          </li>
          <li className={style.nav_item}>
            <button onClick={() => setShowDropdown(!showDropdown)}>
              Categorias
            </button>
            {showDropdown && (
              <ul className={style.dropdown_menu}>
                <li onClick={() => handleCategorySelect(null)}>
                  Mostrar Todos
                </li>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className={style.nav_item}>
            <a href="/admin" className={style.icon_button}>
              {isAuth ? 'Logado' : 'Logar'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
