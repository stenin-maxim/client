import ReactModal from 'react-modal';
import { useState } from 'react';

function Login() {
    ReactModal.setAppElement('#root');
    const [modalIsOpenLogin, setModalIsOpenLogin] = useState(false);

    function openModalLogin() {
        setModalIsOpenLogin(true);
    };

    function closeModalLogin() {
        setModalIsOpenLogin(false);
    };

    return (
        <>
            <button onClick={openModalLogin} className="login">Вход</button>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenLogin} onRequestClose={closeModalLogin}>
                <div className="container">
                    <div className="row">
                        <div className="modal">
                            <i className="bi bi-x-lg" onClick={closeModalLogin}></i>
                            <h2>Войти</h2>                                                   
                            <form className="form">
                                <div className="mb-3">
                                    <label htmlFor="email">E-mail:</label>
                                    <input type="email" id="email" className="input-control" minLength="2" maxLength="30" placeholder="name@example.com"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password">Пароль:</label>
                                    <input type="password" id="password" className="input-control" minLength="8" maxLength="40"/>
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" defaultChecked={true} id="checkbox" name="rememberMe"/>
                                    <label htmlFor="checkbox">Запомнить меня</label>
                                </div>
                                <div className="center">
                                    <button type="submit">Войти</button>
                                </div>
                            </form>
                            <p className="modal-footer">
                                <button className="forget-password">Забыли пароль?</button>
                                <button>Еще не зарегистрированы у нас?</button>
                            </p>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}

export default Login;