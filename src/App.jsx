import { useState } from 'react'
import { Route, Routes } from 'react-router'
import ReactModal from 'react-modal';
import Login from './components/Login';
// import Registr from './components/Registr';
import Home from './components/Home';
import Ad from './components/Ad';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import './scss/app.scss';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [modalIsOpenRegistr, setModalIsOpenRegistr] = useState(false);

    function openModalRegistr() {
        setModalIsOpenRegistr(true);
    };

    function closeModalRegistr() {
        setModalIsOpenRegistr(false);
    };

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
                                        <Login />   
                                        <button onClick={openModalRegistr} className="registr">Регистрация</button>
                                        <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenRegistr} onRequestClose={closeModalRegistr}>
                                            <div className="container">
                                                <div className="row">
                                                </div>
                                            </div>
                                        </ReactModal>
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
                                    <button className="btn-category">Категории</button>
                                    <form action="" className="search d-flex flex-grow-1">
                                        <i className="bi bi-search"></i>
                                        <input type="text" className="search-input" placeholder="Поиск по обьявлениям"/>
                                        <input type="submit" value="Найти" className="btn-search"/>
                                    </form>
                                    <button className="btn-ad">Разместить обьявление</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                    {/* <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} /> */}
                    {/* <Route path="/registr" element={<Registr />} /> */}
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
