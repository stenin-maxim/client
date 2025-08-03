import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router'
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../features/auth/authSlice'
import LocationModal from '../components/LocationModal';
import Menu from '../components/Menu';
import SearchForm from '../components/form/SearchForm';
import Avatar from '../components/Avatar/Avatar';

export default function RootLayout() {
    const [isVisibleMenuUser, setIsVisibleMenuUser] = useState(false);
    const [isRequestPending, setIsRequestPending] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken)
    const user = useSelector(state => state.auth.user);
    const avatar = useSelector(state => state.auth.avatar);
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

    const sendVerificationEmail = async () => {
        try {            
            if (!isRequestPending) {
                setIsRequestPending(true);
                const response = await fetch(`${baseUrl}email/verification-notification`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })

                if (!response.ok) {
                    setIsRequestPending(false);
                    const errorData = await response.json();
                    throw new Error(`Ошибка: ${errorData.message || 'Неизвестная ошибка'}`);
                }
                const data = await response.json();
                alert(data.message);
                setIsRequestPending(false);
            }
        } catch (error) {
            alert(error.message);
            setIsRequestPending(false);
        }
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
                                    <button className="btn" onClick={btnProduct}>Разместить обьявление</button>
                                    {accessToken && 
                                    <div ref={wrapperRef} className="avatar-menu">
                                        <div onClick={() => setIsVisibleMenuUser(!isVisibleMenuUser)}>
                                            <Avatar src={avatar} name={user?.name} size="header" />
                                        </div>
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
                    {user?.email_verified_at || !accessToken ? null : (
                        <div className="warning">
                            <h2>Вы не подтвердили свой email</h2>
                            <button className="btn" onClick={sendVerificationEmail}>Отправить письмо повторно</button>
                        </div>
                    )}
                    <Outlet />
                </div>
            </main>
            <footer>
                FOOTER
            </footer>
        </>
    )
}