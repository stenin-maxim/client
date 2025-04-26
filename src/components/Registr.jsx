import { useState } from 'react';
import ReactModal from 'react-modal';

const Registr = () => {
    const [modalIsOpenRegistr, setModalIsOpenRegistr] = useState(false);

    function openModalRegistr() {
        setModalIsOpenRegistr(true);
    };

    function closeModalRegistr() {
        setModalIsOpenRegistr(false);
    };

    return (
        <>
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
                                <div className="mb-3">
                                    <label htmlFor="email">Почта:</label>
                                    <input type="email" className="form-control" name="email" id="email" minLength="2" maxLength="30" required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Пароль:</label>
                                    <input type="password" id="password" className="form-control" name="password" aria-describedby="passwordHelpBlock" maxLength={40} required/>
                                </div>
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

export default Registr;