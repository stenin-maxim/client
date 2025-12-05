import { useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useGetLocationQuery } from '@/api/locationApi';
import { setUserCity } from '@/features/locationSlice';
import { useNavigate } from 'react-router';

export default function LocationModal() {
    ReactModal.setAppElement('#root');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const { location: location, cityUser } = useSelector(state => state.location);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [citySlug, setInputCitySlug] = useState('');
    const [showCities, setShowCities] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [saving, setSaving] = useState(false);
    const popularCityNames = [
        'Москва','Санкт-Петербург','Екатеринбург','Новосибирск','Краснодар','Красноярск',
        'Челябинск','Тюмень','Уфа','Ростов-на-Дону','Казань','Пермь','Самара',
        'Нижний Новгород','Хабаровск','Омск','Саратов','Томск','Воронеж','Волгоград',
        'Калининград','Иркутск','Сочи','Архангельск','Ярославль','Владивосток','Оренбург',
        'Тольятти','Калуга','Астрахань',
    ];
    const popularCities = location.filter(item => popularCityNames.includes(item.city));
    const chunkedPopular = [
        popularCities.slice(0, 10),
        popularCities.slice(10, 20),
        popularCities.slice(20, 30),
    ];

    let openModal = () => { setModalIsOpen(true); };
    let closeModal = () => { setModalIsOpen(false); };
    
    useGetLocationQuery();

    const handleInputChange = (event) => {
        const value = event.target.value.trimStart();
        setInputValue(value);
    
        if (value.length >= 2 && location.length) {
            const result = location.filter(item =>
                item.city.toLowerCase().startsWith(value.toLowerCase())
            )
            
            setFilteredCities(result);
            setShowCities(true);
            setInputCitySlug(''); // если пользователь начал печатать руками — сбрасываем выбранный slug
        } else {
            setFilteredCities([]);
            setShowCities(false);
            setInputCitySlug('');
        }
    }

    const handleCitySelect = (city, slug) => {
        setInputValue(city);
        setInputCitySlug(slug);
        setShowCities(false);
    };

    const handleClear = (e) => {
        e.preventDefault();
        setInputValue('');
        setFilteredCities([]);
        setShowCities(false);
        setInputCitySlug('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем, что город реально выбран из списка (есть slug)
        if (!citySlug) {
            alert('Пожалуйста, выберите город из списка.');
            return;
        }

        // Находим город по slug и проверяем, что инпут совпадает
        const selectedCity = location.find(item => item.slug === citySlug);
        if (!selectedCity || selectedCity.city !== inputValue) {
            alert('Город введён некорректно. Выберите город из выпадающего списка.');
            return;
        }

        try {
            setSaving(true);

            dispatch(setUserCity(selectedCity));
            
            setModalIsOpen(false); // Закрываем модалку
            
            // Используем replace: true чтобы избежать дублирования в истории
            navigate(`/${citySlug}`, { replace: true });
        } catch (error) {
            console.error(error);
            alert('Не удалось сохранить город. Попробуйте ещё раз.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <div className="location" onClick={openModal}>
                <i className="bi bi-geo-alt"></i>
                <span>{cityUser?.city || 'Все регионы'}</span>
            </div>
            <ReactModal className="ReactModal ReactModal-location" overlayClassName="ReactModal-overlay" isOpen={modalIsOpen} onRequestClose={closeModal}>
                <div className="container">
                    <div className="modal-location">
                        <i className="bi bi-x-lg" onClick={closeModal}></i>
                        <h2>Выберите город из списка</h2>
                        <form action="">
                            <i className="bi bi-search"></i>
                            <input
                                type="text" 
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Введите город"
                                className="location-input"
                                maxLength={40}
                            />
                            <button onClick={handleClear} className="btn-clear">&times;</button>
                            {showCities && inputValue.length >= 2 && (
                                <ul className="filter-city">
                                    {filteredCities.map(item => (
                                        <li 
                                            key={item.slug}
                                            onClick={() => handleCitySelect(item.city, item.slug)}
                                        >
                                            {item.city + ' (' + item.region + ")"}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <input
                                type="submit"
                                value={saving ? 'Сохранение...' : 'Сохранить'}
                                className="location-submit"
                                onClick={handleSubmit}
                                disabled={saving}
                            />
                        </form>
                        <p className="info">Введите город в поиске или выберите город из списка популярных</p>
                        <div className="row">
                            {chunkedPopular.map((chunk, colIdx) => (
                                <div key={colIdx} className="col-4">
                                    <ul>
                                        {chunk.map((item) => (
                                            <li
                                                key={item.slug}
                                                onClick={() => handleCitySelect(item.city, item.slug)}
                                            >
                                                {item.city}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div><button className="btn btn-cancel" onClick={closeModal}>Отмена</button></div>
                    </div>
                </div>
            </ReactModal>
        </>
    )
}