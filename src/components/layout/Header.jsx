import { Link, useNavigate } from 'react-router'
import LocationModal from '../LocationModal';
import Menu from '../Menu';
import SearchForm from '../form/SearchForm';
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../../features/auth/authSlice'


export default function Header() {
    const accessToken = useSelector((state) => state.auth.accessToken)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout());
        navigate('/');
    }

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
                                <a href="" className="icon-text"><i className="bi bi-heart-fill" title="Избранное"></i><span>Избранное</span></a>
                                <a href="" className="icon-text"><i className="bi bi-chat-fill" title="Сообщения"></i><span>Сообщения</span></a>
                                <a href="" className="icon-text"><i className="bi bi-bell-fill" title="Уведомления"></i><span>Уведомления</span></a>
                                <div className="auth-buttons">
                                    {accessToken ? <Link className="logout-button" onClick={handleLogout}>Выход</Link> : 
                                        <>
                                            <Link to="login" className="login-button" >Вход</Link>
                                            <Link to="register">Регистрация</Link>
                                        </>
                                    }
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}