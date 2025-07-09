import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../features/auth/authSlice'
import LocationModal from '../components/LocationModal';
import Menu from '../components/Menu';
import SearchForm from '../components/form/SearchForm';

export default function RootLayout() {
    const [isVisibleMenuUser, setIsVisibleMenuUser] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken)
    const wrapperRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_API_URL;

    async function handleLogout() {
        try {
            if (accessToken) {
                const response = await fetch(`${baseUrl}auth/logout`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });
                if (response.ok) {
                    dispatch(logout());
                    setIsVisibleMenuUser(false);
                    navigate('/login');
                }
            }
            console.log("Пользователь не был авторизован");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsVisibleMenuUser(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    const btnProduct = () => {
        accessToken ? navigate('/product') : alert('Авторизуйтесь, чтобы разместить обьявление')
    }

    return (
        <>
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
                                    {!accessToken ? 
                                        <div className="auth-buttons">
                                            <Link to="login" className="login-button" >Вход</Link>
                                            <Link to="register">Регистрация</Link>
                                        </div> : 
                                        <div>
                                            <Link to="message" className="icon-text"><i className="bi bi-chat-fill" title="Сообщения"></i><span>Сообщения</span></Link>
                                            <Link to="favorites" className="icon-text"><i className="bi bi-heart-fill" title="Избранное"></i><span>Избранное</span></Link>
                                            <Link to="notifi" className="icon-text"><i className="bi bi-bell-fill" title="Уведомления"></i><span>Уведомления</span></Link>
                                        </div>     
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
                                    <button className="btn-product" onClick={btnProduct}>Разместить обьявление</button>
                                    {accessToken && 
                                    <div ref={wrapperRef}>
                                        <div className="avatar" onClick={() => setIsVisibleMenuUser(!isVisibleMenuUser)}>М</div>
                                        {isVisibleMenuUser && (
                                            <ul className="menu-user">
                                                <li><Link to="/profile">Мои объявления</Link></li>
                                                <li><Link to="/messages">Сообщения</Link></li>
                                                <li><Link to="/favorites">Избранное</Link></li>
                                                <li><Link to="/settings">Настройки</Link></li>
                                                <li><Link to="/support">Обратиться в поддержку</Link></li>
                                                <li><button className="logout-button" onClick={handleLogout}>Выход</button></li>
                                            </ul>
                                        )}  
                                    </div> }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer>
                FOOTER
            </footer>
        </>
    )
}