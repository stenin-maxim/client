import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/Login';
import Registr from './components/Registr';
import Home from './components/Home';
import './scss/app.scss';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <>
            <header>
                <div className="header-top mb-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-3">Местоположение: Москва</div>
                            <div className="col-9 text-end">
                                <span>Избранное</span>
                                <span>Корзина</span>
                                <a href="/login" className="ms-3 login">Вход</a>
                                <a href="/registr" className="ms-3">Регистрация</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom mb-4">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex">
                                    <div className="logo"><a href="/">Барахолка</a></div>
                                    <button className="btn btn-primary me-3">Все категории</button>
                                    <form action="" className="d-flex flex-grow-1">
                                        <input type="text" className="form-control" placeholder="Поиск по обьявлениям"/>
                                        <input type="submit" value="Найти" className="btn btn-primary px-5"/>
                                    </form>
                                    <button className="ms-3 btn btn-primary">Разместить обьявление</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                        <Route path="/registr" element={<Registr />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <footer></footer>
        </>
    )
}

export default App
