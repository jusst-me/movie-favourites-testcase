import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { IconTheaters } from '../../assets/icons';
import './header.scss';

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <nav className="page-width header__nav">
                <Link to="/">
                    <IconTheaters />
                </Link>
                <Link to="/" className={classNames('header__nav__link', location.pathname === '/' && 'active')}>
                    Hall of Fame
                </Link>
                <Link to="/add-movie" className={classNames('header__nav__link', location.pathname === '/add-movie' && 'active')}>
                    Add movie
                </Link>
            </nav>
        </header>
    )
}

export default Header;