import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router'
import LocationModal from '../LocationModal';
import Menu from '../Menu';
import SearchForm from '../form/SearchForm';
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../features/auth/authSlice'


export default function Header() {
    const accessToken = useSelector((state) => state.auth.accessToken)
    const [isVisible, setIsVisible] = useState(false);
    const wrapperRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        setIsVisible(false);
        navigate('/');
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (isVisible && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <header>
            <div className="header-top">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="header-top-left">
                                <Link to="/" className="logo">Барахолка</Link>
                                <LocationModal />
                            </div>
                        </div>
                        <div className="col-8">
                            <div className="header-top-right">
                                <Link to="message" className="icon-text"><i className="bi bi-chat-fill" title="Сообщения"></i><span>Сообщения</span></Link>
                                <Link to="favorites" className="icon-text"><i className="bi bi-heart-fill" title="Избранное"></i><span>Избранное</span></Link>
                                <Link to="notifi" className="icon-text"><i className="bi bi-bell-fill" title="Уведомления"></i><span>Уведомления</span></Link>
                                {!accessToken ? 
                                <div className="auth-buttons">
                                    <Link to="login" className="login-button" >Вход</Link>
                                    <Link to="register">Регистрация</Link>
                                </div> : false
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center">
                                <Menu />
                                <SearchForm />
                                <button className="btn-ad">Разместить обьявление</button>
                                {accessToken && 
                                <div ref={wrapperRef}>
                                    <div className="avatar" onClick={() => setIsVisible(!isVisible)}>М</div>
                                    {isVisible && (
                                        <ul className="menu-user">
                                            <li><Link to="/my-ads">Мои объявления</Link></li>
                                            <li><Link to="">Кошелек</Link></li>
                                            <li><Link to="">Мои заказы</Link></li>
                                            <li><Link to="">Мои сообщения</Link></li>
                                            <li><Link to="">Закладки</Link></li>
                                            <li><Link to="settings">Настройки</Link></li>
                                            <li><Link to="">Обратиться в поддержку</Link></li>
                                            <li><Link className="logout-button" onClick={handleLogout}>Выход</Link></li>
                                        </ul>
                                    )}  
                                </div> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}