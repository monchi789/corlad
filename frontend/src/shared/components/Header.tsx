import { useState, useEffect } from 'react';
import logo from '../../assets/corlad_logo.png';
import { NavLink, useLocation } from 'react-router-dom';

export function Header() {
    const [activeLink, setActiveLink] = useState<string>('inicio');
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        const pathToLinkName: { [key: string]: string } = {
            '/': 'inicio',
            '/nosotros': 'nosotros',
            '/noticias': 'noticias',
            '/contactanos': 'contactanos',
        };
        setActiveLink(pathToLinkName[currentPath] || 'inicio');
    }, [location]);

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    return (
        <div className="header container mx-auto flex flex-row justify-between my-10">
            <div className="header_left">
                <img className="size-24" src={logo} alt="Logo" />
            </div>
            <nav className="header_right flex flex-row my-auto">
                <ul className="flex flex-row">
                    <li className="me-5 p-1">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive || activeLink === 'inicio' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'} 
                            onClick={() => handleLinkClick('inicio')}
                        >
                            Inicio
                        </NavLink>
                    </li>
                    <li className="mx-5 p-1">
                        <NavLink 
                            to="/nosotros" 
                            className={({ isActive }) => isActive || activeLink === 'nosotros' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'} 
                            onClick={() => handleLinkClick('nosotros')}
                        >
                            Nosotros
                        </NavLink>
                    </li>
                    <li className="mx-5 p-1">
                        <NavLink 
                            to="/noticias" 
                            className={({ isActive }) => isActive || activeLink === 'noticias' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'} 
                            onClick={() => handleLinkClick('noticias')}
                        >
                            Noticias
                        </NavLink>
                    </li>
                    <li className="mx-5 p-1">
                        <NavLink 
                            to="/contactanos" 
                            className={({ isActive }) => isActive || activeLink === 'contactanos' ? 'underline decoration-4 decoration-[#a67102]' : 'bg-white'} 
                            onClick={() => handleLinkClick('contactanos')}
                        >
                            Contáctanos
                        </NavLink>
                    </li>
                </ul>
                <button className="ms-10 px-3 rounded-lg bg-[#00330a] text-[#ffffff]">
                    Consultar habilidad
                </button>
            </nav>
        </div>
    );
}
