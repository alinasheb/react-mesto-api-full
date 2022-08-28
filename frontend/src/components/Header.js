import { Link } from "react-router-dom";
import logo from '../images/logo.svg';

const Header = ({ ...props }) => {
    const { login, link, onClick, text } = props;
    return (
      <header className='header'>
        <img src={logo} alt='Логотип' className='header__logo' />
        <div className='header__wrap'>
          {login ? <p className='header__email'>{login}</p> : ''}
          <Link className='header__link' to={link} onClick={onClick}>
            {text}
          </Link>
        </div>
      </header>
    );
  };

export default Header;
