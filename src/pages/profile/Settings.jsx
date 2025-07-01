import { useState } from 'react';
import ReactModal from 'react-modal';

export default function Settings() {
    const [modalIsOpenProfile, setModalIsOpenProfile] = useState(false);
    const [modalIsOpenPhone, setModalIsOpenPhone] = useState(false);
    const [modalIsOpenCity, setModalIsOpenCity] = useState(false);
    const [modalIsOpenEmail, setModalIsOpenEmail] = useState(false);
    let openModalProfile = () => { setModalIsOpenProfile(true); },
        closeModalProfile = () => { setModalIsOpenProfile(false); },
        openModalPhone = () => { setModalIsOpenPhone(true); },
        closeModalPhone = () => { setModalIsOpenPhone(false); },
        openModalCity = () => { setModalIsOpenCity(true); },
        closeModalCity = () => { setModalIsOpenCity(false); },
        openModalEmail = () => { setModalIsOpenEmail(true); },
        closeModalEmail = () => { setModalIsOpenEmail(false); };

    return (
        <>
            <div className="settings">
                <h2>Личные данные</h2>
                <dl>
                    <dt>Профиль</dt>
                    <dd><span>Не указано</span><button className="btn-personal-data" onClick={openModalProfile}>Редактировать</button></dd>
                </dl>
                <dl>
                    <dt>Телефон</dt>
                    <dd><span>Не указано</span><button className="btn-personal-data" onClick={openModalPhone}>Изменить</button></dd>
                </dl>
                <dl>
                    <dt>Город</dt>
                    <dd><span>Не указано</span><button className="btn-personal-data" onClick={openModalCity}>Указать</button></dd>
                </dl>
                <dl>
                    <dt>E-mail</dt>
                    <dd><span>Не указано</span><button className="btn-personal-data" onClick={openModalEmail}>Указать</button></dd>
                </dl>
            </div>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenProfile} onRequestClose={closeModalProfile}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalProfile}></i>
                        <p><center>Photo</center></p>
                        <p><center>Name</center></p>
                        <form className="form">
                            <input type="text" className="form-control" placeholder='Имя'/>
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" />
                                <input type="button" value="Отмена" className="form-button" onClick={closeModalProfile} />
                            </p>
                        </form>
                    </div>
                </div>
            </ReactModal>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenPhone} onRequestClose={closeModalPhone}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalPhone}></i>
                        <h3>Номер телефона</h3>
                        <p>Укажите номер телефона, по которому покупатели смогут с вами связаться</p>
                        <form className="form">
                            <input type="phone" className="form-control" placeholder='+7(___)___-__-__'/>
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit"/>
                            </p>
                        </form>
                    </div>
                </div>
            </ReactModal>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenCity} onRequestClose={closeModalCity}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalCity}></i>
                        <h3>Город</h3>
                        <p>Укажите город, в котором вы находитесь или выберите из списка</p>
                        <form className="form">
                            <input type="text" className="form-control" placeholder='Введите название города'/>
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit"/>
                            </p>
                        </form>
                    </div>
                </div>
            </ReactModal>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenEmail} onRequestClose={closeModalEmail}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalEmail}></i>
                        <h3>E-mail</h3>
                        <form className="form">
                            <input type="email" className="form-control"/>
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit"/>
                            </p>
                        </form>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}