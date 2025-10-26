import { useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';  
import { setAvatar, setUser } from '../../features/auth/authSlice';
import { uploadAvatar, deleteAvatar, updateName, updatePhone, updateCity, updateEmail } from '../../api/userApi';
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
    const [phone, setPhone] = useState(user?.phone || "");
    const [city, setCity] = useState(user?.city || "");
    const [email, setEmail] = useState(user?.email || "");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных 
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const dispatch = useDispatch();
    let openModalName = () => { setModalIsOpenName(true); setError('');},
        closeModalName = () => { setModalIsOpenName(false); },
        openModalPhone = () => { setModalIsOpenPhone(true); setError('');},
        closeModalPhone = () => { setModalIsOpenPhone(false); },
        openModalCity = () => { setModalIsOpenCity(true); setError('');},
        closeModalCity = () => { setModalIsOpenCity(false); },
        openModalEmail = () => { setModalIsOpenEmail(true); setError('');},
        closeModalEmail = () => { setModalIsOpenEmail(false); },
        openModalAvatar = () => { setModalIsOpenAvatar(true); },
        closeModalAvatar = () => { setModalIsOpenAvatar(false); setAvatarFile(null); setAvatarPreview(null);};

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
                setLoading(true);
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
            } finally {
                setLoading(false);
            }
        }
    };

    const handleAvatarDelete = () => {
        deleteAvatar()
            .then(() => dispatch(setAvatar(null)))
            .catch(error => console.error('Error deleting avatar:', error));
    };

    const handleNameChange = (e) => setName(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleNameSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateName(localStorage.getItem('accessToken'), name);
            dispatch(setUser({...user, name})); // Обновляем только имя, остальные поля сохраняются
            closeModalName();
        } catch (err) {
            setError('Не удалось обновить имя');
        } finally {
            setLoading(false);
        }
    }

    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updatePhone(localStorage.getItem('accessToken'), phone);
            dispatch(setUser({...user, phone}));
            closeModalPhone();
        } catch (err) {
            setError('Не удалось обновить номер телефона');
        } finally {
            setLoading(false);
        }
    }

    const handleCitySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateCity(localStorage.getItem('accessToken'), city);
            dispatch(setUser({...user, city}));
            closeModalCity();
        } catch (err) {
            setError('Не удалось обновить город');
        } finally {
            setLoading(false);
        }
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await updateEmail(localStorage.getItem('accessToken'), email);
            dispatch(setUser({...user, email, email_verified_at: null}));
            closeModalEmail();
        } catch (err) {
            setError('Не удалось обновить email');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="settings">
                <h2>Личные данные</h2>
                <dl>
                    <dt>Главное фото</dt>
                    <dd>
                        <Avatar src={avatar} name={user?.name} size="settings" />
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
                                <input type="submit" value="Сохранить" className="form-submit" disabled={loading} />
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
                        <form className="form" onSubmit={handleNameSubmit}>
                            <input type="text"
                                className="form-control"
                                placeholder='Имя'
                                value={name}
                                minLength={2}
                                maxLength={30}
                                onChange={handleNameChange}
                                disabled={loading}
                            />
                            {error && <div className="error">{error}</div>}
                            {loading && <span>Сохраняем...</span>}
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" disabled={loading} />
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
                        <form className="form" onSubmit={handlePhoneSubmit}>
                            <input type="phone"
                            className="form-control"
                            placeholder='+7XXXXXXXXXX'
                            value={phone}
                            onChange={handlePhoneChange}
                            disabled={loading}
                            required
                            pattern="^\+7\d{10}$"
                            title="Формат: +7XXXXXXXXXX"
                            maxLength={15}
                        />
                            {error && <div className="error">{error}</div>}
                            {loading && <span>Сохраняем...</span>}
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" disabled={loading} />
                                <input type="button" value="Отмена" className="form-button" onClick={closeModalPhone} />
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
                        <form className="form" onSubmit={handleCitySubmit}>
                            <input type="text"
                                className="form-control"
                                placeholder='Введите название города'
                                value={city}
                                onChange={handleCityChange}
                                disabled={loading}
                                required
                                minLength={2}
                                maxLength={50}
                            />
                            {error && <div className="error">{error}</div>}
                            {loading && <span>Сохраняем...</span>}
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" disabled={loading} />
                                <input type="button" value="Отмена" className="form-button" onClick={closeModalCity} />
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
                        <form className="form" onSubmit={handleEmailSubmit}>
                            <input type="email"
                                className="form-control"
                                placeholder='example@mail.com'
                                value={email}
                                onChange={handleEmailChange}
                                disabled={loading}
                                required
                                title="Формат: example@mail.com"
                                maxLength={50}
                            />
                            {error && <div className="error">{error}</div>}
                            {loading && <span>Сохраняем...</span>}
                            <p className="buttons">
                                <input type="submit" value="Сохранить" className="form-submit" disabled={loading} />
                                <input type="button" value="Отмена" className="form-button" onClick={closeModalEmail} />
                            </p>
                        </form>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}