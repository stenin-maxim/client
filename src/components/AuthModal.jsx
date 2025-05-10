import { useState } from 'react';
import ReactModal from 'react-modal';
import EmailInput from './form/EmailInput';
import PasswordInput from './form/PasswordInput';

export default function ModalAuth() {
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

    return (
        <>
            <button onClick={openModalLogin} className="login">Вход</button>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenLogin} onRequestClose={closeModalLogin}>
                <div className="container">
                    <div className="row">
                        <div className="modal">
                            <i className="bi bi-x-lg" onClick={closeModalLogin}></i>
                            <h2>Войти</h2>
                            <form className="form" action="login" method="POST">
                                <EmailInput />
                                <PasswordInput />
                                <div className="form-check">
                                    <input type="checkbox" defaultChecked={true} id="checkbox" name="rememberMe"/>
                                    <label htmlFor="checkbox">Запомнить меня</label>
                                </div>
                                <div className="center">
                                    <button type="submit">Войти</button>
                                </div>
                            </form>
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
                            <form className="form" action="login" method="POST">
                                <EmailInput />
                                <div className="center">
                                    <button type="submit">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ReactModal>
            <button onClick={openModalRegistr} className="registr">Регистрация</button>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenRegistr} onRequestClose={closeModalRegistr}>
                <div className="container">
                    <div className="row">
                        <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalRegistr}></i>
                        <h2>Регистрация</h2>
                            <form className="form" action="registr" method="POST">
                                <div className="mb-3">
                                    <label htmlFor="name">Имя:</label>
                                    <input type="text" className="form-control" name="name" id="name" minLength="2" maxLength="20" required/>
                                </div>
                                <EmailInput />
                                <PasswordInput />
                                <div className="mb-3">
                                    <label htmlFor="repeat_password" className="form-label">Повторите пароль:</label>
                                    <input type="password" id="repeat_password" className="form-control" name="repeatPassword" aria-describedby="password-help" maxLength={40} required/>
                                    <div id="password-help">
                                        Ваш пароль должен состоять из 8-20 символов, содержать буквы и цифры и не должен содержать пробелов, специальных символов или смайлов.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone">Телефон:</label>
                                    <input type="tel" className="form-control" id="phone" name="phone" minLength="10" maxLength="14" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                                </div>
                                <div className="mb-3">
                                    <input type="checkbox" className="mr-3"/>
                                    <label>Я принимаю условия <a href="#">пользовательского соглашения</a></label>
                                </div>
                                <div className="center">
                                    <button type="submit">Зарегистрироваться</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}