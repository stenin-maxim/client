import { useState } from 'react';
import ReactModal from 'react-modal';
import RegisterForm from './form/RegisterForm';
import LoginForm from './form/LoginForm';
import ResetForm from './form/ResetForm';

export default function AuthModal() {
	ReactModal.setAppElement('#root');
    const [modalIsOpenLogin, setModalIsOpenLogin] = useState(false);
    const [modalIsOpenRegistr, setModalIsOpenRegistr] = useState(false);
    const [modalIsOpenPassRecovery, setModalIsOpenPassRecovery] = useState(false);
    let openModalLogin = () => { setModalIsOpenLogin(true); };
    let openModalRegistr = () => { setModalIsOpenRegistr(true); };
    let closeModalLogin = () => { setModalIsOpenLogin(false); };
    let closeModalRegistr = () => { setModalIsOpenRegistr(false); };
    let closeModalPassRecovery = () => { setModalIsOpenPassRecovery(false); };
    let openModalPassRecovery = () => { setModalIsOpenLogin(false); setModalIsOpenPassRecovery(true); };
    let switchModal = () => { setModalIsOpenLogin(false); setModalIsOpenRegistr(true); }

    const isAuthenticated = !!localStorage.getItem('accessToken');
    const logout = () => {
        localStorage.removeItem('accessToken');
        //api.post('/logout'); 
        window.location.href = '/';
    };

    return (
        <>
            {isAuthenticated ? <button onClick={logout}>Выход</button> : 
                <>
                    <button onClick={openModalLogin} className="login">Вход</button>
                    <button onClick={openModalRegistr} className="registr">Регистрация</button>
                </>
            }
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenLogin} onRequestClose={closeModalLogin}>
                <div className="container">
                    <div className="row">
                        <div className="modal">
                            <i className="bi bi-x-lg" onClick={closeModalLogin}></i>
                            <h2>Войти</h2>
                            <LoginForm />
                            <p className="modal-footer">
                                <button className="forget-password" onClick={openModalPassRecovery} >Забыли пароль?</button>
                                <button onClick={switchModal}>Еще не зарегистрированы у нас?</button>
                            </p>
                        </div>
                    </div>
                </div>
            </ReactModal>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenPassRecovery} onRequestClose={closeModalPassRecovery}>
                <div className="container">
                    <div className="row">
                        <div className="modal">
                            <i className="bi bi-x-lg" onClick={closeModalPassRecovery}></i>
                            <h2>Восстановление пароля</h2>
                            <p className="center">Ссылка для смены пароля будет выслана на почту, указанную в Вашем профиле!</p>
                            <ResetForm />
                        </div>
                    </div>
                </div>
            </ReactModal>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenRegistr} onRequestClose={closeModalRegistr}>
                <div className="container">
                    <div className="row">
                        <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalRegistr}></i>
                        <h2>Регистрация</h2>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}