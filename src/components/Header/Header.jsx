import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ]

  const isActive = (slug) => location.pathname === slug

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-xl font-semibold tracking-wide">Megagram</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 font-medium transition duration-200 rounded-full ${
                        isActive(item.slug)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="md:hidden mt-3 space-y-2 pb-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        navigate(item.slug)
                        setMenuOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 font-medium transition duration-200 rounded-lg ${
                        isActive(item.slug)
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        )}
      </Container>
    </header>
  )
}

export default Header
