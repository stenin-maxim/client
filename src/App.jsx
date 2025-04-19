import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Login from './components/Login';
import Registr from './components/Registr';
import Home from './components/Home';
import Ad from './components/Ad';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <>
            <header>
                <div className="header-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <div className="header-top-left">
                                    <a href="/" className="logo">Барахолка</a>
                                    <div className="location">
                                        <i className="bi bi-geo-alt"></i>
                                        <span>Москва</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="header-top-right">
                                    <a href="" className="icon-text"><i className="bi bi-heart-fill" title="Избранное"></i><span>Избранное</span></a>
                                    <a href="" className="icon-text"><i className="bi bi-chat-fill" title="Сообщения"></i><span>Сообщения</span></a>
                                    <a href="" className="icon-text"><i className="bi bi-bell-fill" title="Уведомления"></i><span>Уведомления</span></a>
                                    <div className="auth">
                                        <a href="/login" className="login">Вход</a>
                                        <a href="/registr" className="registr">Регистрация</a>
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
                                <div className="d-flex">
                                    <button className="">Все категории</button>
                                    <form action="" className="d-flex flex-grow-1">
                                        <input type="text" className="form-control" placeholder="Поиск по обьявлениям"/>
                                        <input type="submit" value="Найти" className="btn btn-primary px-5"/>
                                    </form>
                                    <button className="">Разместить обьявление</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                    <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                    <Route path="/registr" element={<Registr />} />
                    <Route path="/ad">
                        <Route path=":id" element={<Ad />} />
                    </Route>
                </Routes>
            </main>
            <footer>
                FOOTER
            </footer>
        </>
    )
}

export default App
