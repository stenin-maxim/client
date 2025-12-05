import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateProductMutation } from '@/api/userProductApi';
import { useGetCategoriesQuery } from '@/api/categoriesApi';
import { useGetLocationQuery } from '@/api/locationApi';
import { addUserProduct } from '@/features/userProduct/userProductSlice';

export default function CreateProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    
    // Получаем категории из Redux state
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.categories);
    const { location: locations } = useSelector(state => state.location); // Получаем локации из Redux state

    useGetCategoriesQuery(); // Загружаем категории при монтировании компонента
    useGetLocationQuery(); // Загружаем локации при монтировании компонента

    const [photos, setPhotos] = useState([]);
    const [productData, setProductData] = useState({
        location_id: null,
        location: '', // Название города для отображения
        category_id: null, // ID категории
        categoryName: "Выберите категорию", // Название для отображения
        subcategory_id: null, // ID подкатегории
        subcategoryName: "Выберите подкатегорию", // Название для отображения
        item_condition: "Не выбрано",
        type_ad: "Не выбрано",
        name: '',
        price: 0,
        amount: 1,
        desc: '',
        autopublish: false
    });

    // Состояние для поиска городов
    const [locationInput, setLocationInput] = useState('');
    const [showLocationList, setShowLocationList] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);

    const [isVisible, setIsVisible] = useState({
        category: false,
        subcategory: false,
        item_condition: false,
        type_ad: false
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({}); // Состояние для ошибок
    const [isSubmitted, setIsSubmitted] = useState(false);

    let selectItemCondition = ['Б/у', 'Новое'];
    let selectTypeAd = ['Продаю свое', 'Приобрел на продажу', 'Магазин'];

    // Показываем загрузку если категории еще не загружены
    if (categoriesLoading && categories.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="loading">Загрузка категорий...</div>
                    </div>
                </div>
            </div>
        );
    }

    // Показываем ошибку если не удалось загрузить категории
    if (categoriesError && categories.length === 0) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="error">Ошибка загрузки категорий: {categoriesError}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Обработка изменения поля локации
    const handleLocationChange = (event) => {
        const value = event.target.value.trimStart();
        setLocationInput(value);
        
        // Очищаем ошибку при вводе
        if (isSubmitted) {
            clearError('location');
        }
        
        if (value.length >= 2 && locations.length) {
            const result = locations.filter(item =>
                item.city.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredLocations(result);
            setShowLocationList(true);
        } else {
            setFilteredLocations([]);
            setShowLocationList(false);
        }
        
        // Если пользователь начал вводить новый текст, сбрасываем выбранную локацию
        if (value !== productData.location) {
            setProductData(prev => ({
                ...prev,
                location_id: null,
                location: value
            }));
        }
    };

    // Выбор локации из списка
    const handleLocationSelect = (locationItem) => {
        setProductData(prev => ({
            ...prev,
            location_id: locationItem.id,
            location: locationItem.city
        }));
        setLocationInput(locationItem.city);
        setShowLocationList(false);
        setFilteredLocations([]);
        
        // Очищаем ошибку при выборе
        if (isSubmitted) {
            clearError('location');
        }
    };

    // Очистка поля локации
    const handleLocationClear = (e) => {
        e.preventDefault();
        setLocationInput('');
        setProductData(prev => ({
            ...prev,
            location_id: null,
            location: ''
        }));
        setFilteredLocations([]);
        setShowLocationList(false);
    };

    // Функция валидации формы
    const validateForm = () => {
        const newErrors = {};

        // Валидация категории
        if (productData.category === "Выберите категорию") {
            newErrors.category = "Выберите категорию";
        }

        // Валидация подкатегории
        if (productData.category !== "Выберите категорию" && productData.subcategory === "Выберите подкатегорию") {
            newErrors.subcategory = "Выберите подкатегорию";
        }

        // Валидация состояния товара
        if (productData.item_condition === "Не выбрано") {
            newErrors.item_condition = "Выберите состояние товара";
        }

        // Валидация типа объявления
        if (productData.type_ad === "Не выбрано") {
            newErrors.type_ad = "Выберите тип объявления";
        }

        // Валидация названия
        if (!productData.name.trim()) {
            newErrors.name = "Введите название товара";
        } else if (productData.name.trim().length < 3) {
            newErrors.name = "Название должно содержать минимум 3 символа";
        } else if (productData.name.trim().length > 50) {
            newErrors.name = "Название не должно превышать 50 символов";
        }

        // Валидация цены
        if (!productData.price || productData.price <= 0) {
            newErrors.price = "Введите цену";
        } else if (productData.price > 999999999) {
            newErrors.price = "Цена слишком большая";
        }

        // Валидация количество
        if (!productData.amount || productData.amount < 1 || productData.amount > 1000) {
            newErrors.amount = "Пожалуйста, введите количество от 1 до 1000";
        }

        // Валидация описания
        if (productData.desc.trim().length > 3000) {
            newErrors.desc = "Описание не должно превышать 3000 символов";
        }

        // Валидация местоположения
        if (!productData.location_id) {
            newErrors.location = "Выберите местоположение из списка";
        }

        // Валидация фотографий
        if (photos.length === 0) {
            newErrors.photos = "Загрузите хотя бы одно изображение";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Функция для очистки ошибки конкретного поля
    const clearError = (fieldName) => {
        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
        });
    };

    const visible = (key, val) => {
        setIsVisible((prev) => {
            const updatedVisible = {
                ...prev,
                category: false,
                subcategory: false,
                item_condition: false,
                type_ad: false
            }
            updatedVisible[key] = val;
            return updatedVisible;
        })
    }

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        
        // Очищаем ошибку для этого поля при вводе
        if (isSubmitted) {
            clearError(name);
        }
        
        if (name === 'price') {
            const onlyNums = event.target.value.replace(/[^0-9]/g, '');
            setProductData({ ...productData, [name]: parseInt(onlyNums) || 0 });
            return
        }
        
        if (name === 'amount') {
            const onlyNums = event.target.value.replace(/[^0-9]/g, '');
            setProductData({ ...productData, [name]: parseInt(onlyNums) || 1 });
            return
        }

        // Обработка checkbox
        if (type === 'checkbox') {
            setProductData({ ...productData, [name]: checked });
            return;
        }

        setProductData({ ...productData, [name]: value });
    };

    const removeFile = (index) => {
        setPhotos(prevFiles => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            // Очищаем ошибку если после удаления остались фотографии
            if (isSubmitted && newFiles.length > 0) {
                clearError('photos');
            }
            return newFiles;
        });
    };

    function handlePhotoChange(e) {
        const files = Array.from(e.target.files);
        if (files.length <= 4) {
            setPhotos(files);
            // Очищаем ошибку валидации фотографий при загрузке
            if (isSubmitted && files.length > 0) {
                clearError('photos');
            }
        } else {
            alert('Можно загружать не более 4 изображений.');
            e.target.value = null;
            setPhotos([]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setLoading(true);

        // Валидируем форму
        if (!validateForm()) {
            // Прокручиваем к первой ошибке
            const firstErrorField = document.querySelector('.error-message');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setLoading(false);
            return;
        }

        // Если валидация прошла успешно, отправляем данные
        const formData = new FormData();
        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });

        // Добавляем остальные данные формы
        Object.keys(productData).forEach(key => {
            if (key === 'location') {
                // Не отправляем location (название), отправляем только location_id
                return;
            }
            if (key !== 'autopublish') {
                formData.append(key, productData[key]);
            } else {
                formData.append(key, productData[key] ? 'true' : 'false');
            }
        });
        
        // Явно добавляем location_id
        if (productData.location_id) {
            formData.append('location_id', productData.location_id);
        }

        try {
            const result = await createProduct(formData).unwrap();
            
            // Добавляем новый продукт в Redux state
            if (result && result.data) {
                dispatch(addUserProduct(result.data));
            }
            
            alert('Объявление успешно размещено!');
            navigate("/profile");
            
            // Сбрасываем форму после успешной отправки
            setProductData({
                location_id: null,
                location: '',
                category_id: null,
                categoryName: "Выберите категорию",
                subcategory_id: null,
                subcategoryName: "Выберите подкатегорию",
                item_condition: "Не выбрано",
                type_ad: "Не выбрано",
                name: '',
                price: 0,
                amount: 1,
                desc: '',
                autopublish: false
            });
            setLocationInput('');
            setPhotos([]);
            setErrors({});
            
        } catch (error) {
            alert(`Ошибка отправки: ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    }

    function subcategoryShow() {
        // Находим выбранную категорию для получения подкатегорий
        const selectedCategory = categories.find(cat => cat.id === productData.category_id);

        return (
            <>
                <div className={`select ${errors.subcategory ? 'error-select' : ''}`}>
                    <div className="select-placeholder" 
                        onClick={() => visible('subcategory', !isVisible.subcategory)}>
                        {productData.subcategoryName}
                        <span></span>
                    </div>
                    {isVisible.subcategory && selectedCategory?.subcategories &&
                        <div className="select-body">
                            {selectedCategory.subcategories.map(itemSub => {
                                return <div className="select-input" key={itemSub.id}
                                    onClick={() => {
                                        setProductData({
                                            ...productData,
                                            subcategory_id: itemSub.id,
                                            subcategoryName: itemSub.name
                                        }); 
                                        visible('subcategory', !isVisible.subcategory);
                                        if (isSubmitted) clearError('subcategory');
                                    }}
                                >{itemSub.name}</div>
                            })}
                        </div>
                    }
                    {errors.subcategory && <div className="error-message">{errors.subcategory}</div>}
                </div>
            </>
        )
    }

    return (
        <section className="product">
            <form onSubmit={handleSubmit}>
                <div className="product-item">
                    <div className='product-title'>Категория<span></span></div>
                    <div className={`select ${errors.category ? 'error-select' : ''}`}>
                        <div className="select-placeholder" 
                            onClick={() => visible('category', !isVisible.category)}>
                            {productData.categoryName}
                            <span></span>
                        </div>
                        {isVisible.category &&
                            <div className="select-body">
                                {categories.map((item) => {
                                    return <div className="select-input" key={item.id} 
                                        onClick={() => {
                                            setProductData({
                                                ...productData,
                                                category_id: item.id,
                                                categoryName: item.name,
                                                subcategory_id: null,
                                                subcategoryName: "Выберите подкатегорию"
                                            });
                                            visible('category', !isVisible.category);
                                            if (isSubmitted) clearError('category');
                                        }}>
                                        {item.name}
                                    </div>
                                })}
                            </div>
                        }
                        {errors.category && <div className="error-message">{errors.category}</div>}
                    </div>
                    {productData.category !== "Выберите категорию" && subcategoryShow()}
                </div>
                <div className="product-item">
                    <div className='product-title'>Состояние товара<span></span></div>
                    <div className={`select ${errors.item_condition ? 'error-select' : ''}`}>
                        <div className="select-placeholder"
                            onClick={() => visible('item_condition', !isVisible.item_condition)} >{productData.item_condition}<span></span>
                        </div>
                        {isVisible.item_condition &&
                            <div className="select-body">
                                {selectItemCondition.map((item) => {
                                    return <div className="select-input" key={item}
                                        onClick={() => {
                                            setProductData({ ...productData, item_condition: item }); 
                                            visible('item_condition', !isVisible.item_condition);
                                            if (isSubmitted) clearError('item_condition');
                                        }}>
                                        {item}
                                    </div>
                                })}
                            </div>
                        }
                        {errors.item_condition && <div className="error-message">{errors.item_condition}</div>}
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-title">Тип объявления<span></span></div>
                    <div className={`select ${errors.type_ad ? 'error-select' : ''}`}>
                        <div className="select-placeholder" onClick={() => visible('type_ad', !isVisible.type_ad)}>{productData.type_ad}<span></span>
                        </div>
                        {isVisible.type_ad &&
                            <div className="select-body">
                                {selectTypeAd.map((item) => {
                                    return <div className="select-input" key={item}
                                        onClick={() => {
                                            setProductData({ ...productData, type_ad: item });  
                                            visible('type_ad', !isVisible.type_ad);
                                            if (isSubmitted) clearError('type_ad');
                                        }}>
                                        {item}
                                    </div>
                                })}
                            </div>
                        }
                    {errors.type_ad && <div className="error-message">{errors.type_ad}</div>}
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-title">Название товара<span></span></div>
                    <div className="product-item-right">
                        <input className={`product-input ${errors.name ? 'error-input' : ''}`}
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            maxLength={50}
                            id="product_name"
                        />
                        {errors.name && <div className="error-message">{errors.name}</div>}
                        <span className='hint'>Название не должно превышать 50 символов</span>
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-title">Цена<span></span></div>
                    <div className="product-item-right">
                        <input
                            className={`product-price ${errors.price ? 'error-input' : ''}`}
                            type="text"
                            name="price"
                            value={
                                productData.price > 0
                                    ? productData.price.toLocaleString('ru-RU')
                                    : ''
                            }
                            onChange={handleChange}
                            maxLength={12}
                            id="price"
                            inputMode="numeric"
                            pattern="[0-9\s]*"
                        />
                        <span className="ruble">₽</span>
                        {errors.price && <div className="error-message">{errors.price}</div>}
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-title">Количество</div>
                    <div className="product-item-right">
                        <input className={`product-amount ${errors.amount ? 'error-input' : ''}`}
                            type="number"
                            name="amount"
                            value={productData.amount}
                            onChange={handleChange}
                            min={1}
                            max={1000}
                            pattern="[0-9\d]*"
                        />
                        <span className="ruble">шт.</span>
                        {errors.amount && <div className="error-message">{errors.amount}</div>}
                    </div>
                </div>
                <div className="product-item">
                    <div className="product-title">Описание</div>
                    <div>
                        <textarea className={`product-input ${errors.desc ? 'error-input' : ''}`}
                            name="desc"
                            value={productData.desc}
                            onChange={handleChange}
                            maxLength={3000}
                            id="desc"
                        ></textarea>
                        <span className='hint'>До 3000 символов</span>
                        {errors.desc && <div className="error-message">{errors.desc}</div>}
                    </div>
                </div>
                <div className="product-item">
                    <div className='product-title'>Фотографии<span></span></div>
                    <div>
                        <label htmlFor="photos" className={`custom-file-upload ${errors.photos ? 'error-input' : ''}`}>
                            Загрузить изображения ({photos.length}/4)
                        </label>
                        <input type="file"
                            name="photos"
                            onChange={handlePhotoChange}
                            id="photos"
                            multiple
                            accept=".png, .jpg, .jpeg"
                            style={{ display: 'none' }}
                        />
                        {photos.length > 0 && (
                            <div className="preview-container">
                            {photos.map((file, index) => (
                                <div key={index} className="preview-item">
                                <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="preview-image" />
                                <button type="button" onClick={() => removeFile(index)} className="remove-button"></button>
                                </div>
                            ))}
                            </div>
                        )}
                        <span className='hint'>Первое фото будет отображаться в результатах поиска, выберите наиболее удачное.</span>
                        <span className='hint'>Вы можете загрузить до 4 фотографий в формате JPG или PNG.</span>
                        <span className='hint'>Максимальный размер фото — 2MB. </span>
                        {errors.photos && <div className="error-message">{errors.photos}</div>}
                    </div>
                </div>
                <div className='product-item'>
                    <div className="product-title">Местоположение<span></span></div>
                    <div style={{ position: 'relative' }}>
                        <input 
                            className={`product-input ${errors.location ? 'error-input' : ''}`}
                            type="text"
                            name="location"
                            value={locationInput}
                            onChange={handleLocationChange}
                            onFocus={() => {
                                if (locationInput.length >= 2 && filteredLocations.length > 0) {
                                    setShowLocationList(true);
                                }
                            }}
                            onBlur={() => {
                                // Закрываем список с небольшой задержкой, чтобы успел сработать onClick
                                setTimeout(() => setShowLocationList(false), 200);
                            }}
                            placeholder="Введите город"
                            maxLength={50}
                            id="location"
                            autoComplete="off"
                        />
                        {locationInput && (
                            <button 
                                type="button"
                                onClick={handleLocationClear}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '20px',
                                    cursor: 'pointer',
                                    color: '#999'
                                }}
                            >
                                &times;
                            </button>
                        )}
                        {showLocationList && filteredLocations.length > 0 && (
                            <ul style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: 'white',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                zIndex: 1000,
                                marginTop: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                            }}>
                                {filteredLocations.map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={() => handleLocationSelect(item)}
                                        style={{
                                            padding: '10px 15px',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #eee',
                                            listStyle: 'none'
                                        }}
                                        onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                                        onMouseLeave={(e) => e.target.style.background = 'white'}
                                    >
                                        {item.city} {item.region ? `(${item.region})` : ''}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {errors.location && <div className="error-message">{errors.location}</div>}
                </div>
                <div className='product-item'>
                    <div className="product-title">Способ связи</div>
                    <Link to="/settings" target="_blank">Настройка звонков и времени</Link>            
                </div>
                <div className='product-item'>
                    <div className="product-title">Автопубликация</div>
                    <div>
                        <input className='input-checkbox'
                            type="checkbox"
                            name="autopublish"
                            checked={productData.autopublish}
                            onChange={handleChange}
                            id="autopublish"
                        />
                        <label htmlFor="autopublish">
                            <span>Ваше объявление опубликуется повторно, когда закончится срок размещения</span>
                        </label>
                    </div>
                </div>
                <div className='product-item'>
                    <div className='product-title'></div>
                    <input className='btn' type="submit" value="Сохранить" disabled={loading || isCreating}/>
                    {(loading || isCreating) && <span className='save-text'>Сохраняем...</span>}
                </div>
            </form>
        </section>
    )
}