import { useState } from 'react'
import categories from "../assets/categories.json";
import { Link, useNavigate } from 'react-router';
import { createProduct } from '../api/userApi';

export default function Product() {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
	const token = localStorage.getItem('accessToken');
    const [productData, setProductData] = useState({
        category: "Выберите категорию",
        subcategory: "Выберите подкатегорию",
        item_condition: "Не выбрано",
        type_ad: "Не выбрано",
        name: '',
        price: '',
        desc: '',
        location: '',
        autopublish: false
    });
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
        if (!productData.price.trim()) {
            newErrors.price = "Введите цену";
        } else if (parseInt(productData.price) <= 0) {
            newErrors.price = "Цена должна быть больше 0";
        } else if (parseInt(productData.price) > 999999999) {
            newErrors.price = "Цена слишком большая";
        }

        // Валидация описания
        if (productData.desc.trim().length > 3000) {
            newErrors.desc = "Описание не должно превышать 3000 символов";
        }

        // Валидация местоположения
        if (!productData.location.trim()) {
            newErrors.location = "Введите местоположение";
        } else if (productData.location.trim().length < 2) {
            newErrors.location = "Местоположение должно содержать минимум 2 символа";
        } else if (productData.location.trim().length > 50) {
            newErrors.location = "Местоположение не должно превышать 50 символов";
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
            setProductData({ ...productData, [name]: onlyNums });
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
            if (key !== 'autopublish') {
                formData.append(key, productData[key]);
            } else {
                formData.append(key, productData[key] ? 'true' : 'false');
            }
        });

        try {
            await createProduct(formData);
            
            alert('Объявление успешно размещено!');
            navigate("/profile");
            
            // Сбрасываем форму после успешной отправки
            setProductData({
                category: "Выберите категорию",
                subcategory: "Выберите подкатегорию",
                item_condition: "Не выбрано",
                type_ad: "Не выбрано",
                name: '',
                price: '',
                desc: '',
                location: '',
                autopublish: false
            });
            setPhotos([]);
            setErrors({});
            
        } catch (error) {
            console.error('Ошибка создания продукта:', error);
            alert(`Ошибка отправки: ${error.message}`);
        }
        finally {
            setLoading(false);
        }
    }

    function subcategoryShow() {
        return (
            <>
                <div className={`select ${errors.subcategory ? 'error-select' : ''}`}>
                    <div className="select-placeholder" 
                        onClick={() => visible('subcategory', !isVisible.subcategory)}>{productData.subcategory}<span></span>
                    </div>
                    {isVisible.subcategory &&
                        <div className="select-body">
                            {categories.categories.map((item) => {
                                if (item.category === productData.category) {
                                    return item.subcategory.map(item2 => {
                                        return <div className="select-input" key={item2}
                                            onClick={() => {
                                                setProductData({ ...productData, subcategory: item2 }); 
                                                visible('subcategory', !isVisible.subcategory);
                                                if (isSubmitted) clearError('subcategory');
                                            }}
                                        >{item2}</div>
                                    })
                                }
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
                            onClick={() => visible('category', !isVisible.category)}>{productData.category}<span></span>
                        </div>
                        {isVisible.category &&
                            <div className="select-body">
                                {categories.categories.map((item) => {
                                    return <div className="select-input" key={item.category} 
                                        onClick={() => {
                                            setProductData({ ...productData, category: item.category, subcategory: "Выберите подкатегорию" });
                                            visible('category', !isVisible.category);
                                            if (isSubmitted) clearError('category');
                                        }}>
                                        {item.category}
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
                                productData.price
                                    ? Number(productData.price).toLocaleString('ru-RU')
                                    : ''
                            }
                            onChange={e => {
                                // Удаляем все нецифровые символы
                                const onlyNums = e.target.value.replace(/\D/g, '');
                                // Обновляем состояние только числовым значением
                                setProductData({ ...productData, price: onlyNums });
                                if (isSubmitted) clearError('price');
                            }}
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
                                <button onClick={() => removeFile(index)} className="remove-button"></button>
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
                    <input className={`product-input ${errors.location ? 'error-input' : ''}`}
                        type="text"
                        name="location"
                        value={productData.location}
                        onChange={handleChange}
                        maxLength={30}
                        id="location"
                    />
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
                    <input className='btn' type="submit" value="Сохранить" disabled={loading}/>
                    {loading && <span className='save-text'>Сохраняем...</span>}
                </div>
            </form>
        </section>
    )
}