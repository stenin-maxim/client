import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';  
import { setAvatar } from '../../features/auth/authSlice';
import { fetchAvatar, uploadAvatar, deleteAvatar } from '../../api/userApi';
import Avatar from '../../components/Avatar/Avatar';

export default function Settings() {
    const [modalIsOpenAvatar, setModalIsOpenAvatar] = useState(false);
    const [modalIsOpenName, setModalIsOpenName] = useState(false);
    const [modalIsOpenPhone, setModalIsOpenPhone] = useState(false);
    const [modalIsOpenCity, setModalIsOpenCity] = useState(false);
    const [modalIsOpenEmail, setModalIsOpenEmail] = useState(false);
    const user = useSelector(state => state.auth.user);
    const avatar = useSelector(state => state.auth.avatar);
    const [name, setName] = useState(user?.name || "");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const dispatch = useDispatch();
    let openModalName = () => { setModalIsOpenName(true); },
        closeModalName = () => { setModalIsOpenName(false); },
        openModalPhone = () => { setModalIsOpenPhone(true); },
        closeModalPhone = () => { setModalIsOpenPhone(false); },
        openModalCity = () => { setModalIsOpenCity(true); },
        closeModalCity = () => { setModalIsOpenCity(false); },
        openModalEmail = () => { setModalIsOpenEmail(true); },
        closeModalEmail = () => { setModalIsOpenEmail(false); },
        openModalAvatar = () => { setModalIsOpenAvatar(true); },
        closeModalAvatar = () => { setModalIsOpenAvatar(false); setAvatarFile(null); setAvatarPreview(null);};


    useEffect(() => {
        fetchAvatar()
            .then(data => {
                dispatch(setAvatar(data.avatar));
            })
            .catch(error => {
                console.error('Error fetching avatar:', error);
            });
    }, []);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // Проверяем размер (например, максимум 2MB)
                alert('Файл слишком большой. Максимум 2MB.');
                return;
            }
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file)); // создаём превью
        }
    };

    const handleAvatarSubmit = async (e) => {
        e.preventDefault();
        if (avatarFile) {
            try {
                const data = await uploadAvatar(localStorage.getItem('accessToken'), avatarFile);
                
                if (data.avatar) {
                    dispatch(setAvatar(data.avatar));
                    setAvatarPreview(null);
                    setAvatarFile(null);
                    closeModalAvatar();
                } else {
                    alert('Ошибка при загрузке аватара');
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
                alert('Ошибка при загрузке аватара');
            }
        }
    };

    const handleAvatarDelete = () => {
        deleteAvatar()
            .then(() => dispatch(setAvatar(null)))
            .catch(error => console.error('Error deleting avatar:', error));
    };

    return (
        <>
            <div className="settings">
                <h2>Личные данные</h2>
                <dl>
                    <dt>Главное фото</dt>
                    <dd>
                        {/* <span> */}
                        <Avatar src={avatar} name={user?.name} size="settings" />
                        {/* {avatar ? <img src={avatar} className="avatar-img" alt="avatar" /> : <div className="avatar avatar-settings">{user?.name[0]}</div>}</span> */}
                        <button className="btn-personal-data" onClick={openModalAvatar}>Редактировать</button>
                    </dd>
                </dl>
                <dl>
                    <dt>Имя</dt>
                    <dd><span>{user?.name || "Не указано"}</span><button className="btn-personal-data" onClick={openModalName}>Редактировать</button></dd>
                </dl>
                <dl>
                    <dt>Телефон</dt>
                    <dd><span>{user?.phone || "Не указано"}</span><button className="btn-personal-data" onClick={openModalPhone}>Изменить</button></dd>
                </dl>
                <dl>
                    <dt>Город</dt>
                    <dd><span>{user?.city || "Не указано"}</span><button className="btn-personal-data" onClick={openModalCity}>Указать</button></dd>
                </dl>
                <dl>
                    <dt>E-mail</dt>
                    <dd><span>{user?.email || "Не указано"}</span><button className="btn-personal-data" onClick={openModalEmail}>Указать</button></dd>
                </dl>
            </div>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenAvatar} onRequestClose={closeModalAvatar}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalAvatar}></i>
                        <center>
                        {avatarPreview ? (
                                <img src={avatarPreview} alt="avatar preview" className="avatar-img" />
                            ) : avatar ? (
                                <Avatar src={avatar} name={user?.name} size="settings" />
                            ) : (
                                <Avatar name={user?.name} size="settings" />
                            )}
                        </center>
                        <form className='form' onSubmit={handleAvatarSubmit}>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: 'none' }}
                                id="avatar-input"
                            />
                            <div 
                                className="avatar-upload-area"
                                onClick={() => document.getElementById('avatar-input').click()}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.add('drag-over');
                                }}
                                onDragLeave={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('drag-over');
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.currentTarget.classList.remove('drag-over');
                                    const file = e.dataTransfer.files[0];
                                    if (file && file.type.startsWith('image/')) {
                                        const event = { target: { files: [file] } };
                                        handleAvatarChange(event);
                                    }
                                }}
                            >
                                <i className="bi bi-camera"></i>
                                <p>Нажмите или перетащите изображение</p>
                            </div>
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" />
                                {avatar && <input type="button" value="Удалить" className="form-button" onClick={handleAvatarDelete} />}
                                <input type="button" value="Отмена" className="form-button" onClick={closeModalAvatar} />
                            </p>
                        </form>
                    </div>
                </div>
            </ReactModal>
            <ReactModal className="ReactModal" overlayClassName="ReactModal-overlay" isOpen={modalIsOpenName} onRequestClose={closeModalName}>
                <div className="container">
                    <div className="modal">
                        <i className="bi bi-x-lg" onClick={closeModalName}></i>
                        <h3>Имя: <span>{name}</span></h3>
                        <form className="form">
                            <input type="text" className="form-control" placeholder='Имя' value={name} minLength={2} maxLength={30} onChange={handleNameChange}/>
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" />
                                <input type="button" value="Отмена" className="form-button" onClick={closeModalName} />
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