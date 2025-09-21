import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUserProductAll, updateUserProduct } from '../features/userProduct/userProductSlice';
import { useGetUserProductAllQuery, useUpdateProductMutation } from '../api/productApi';
import categories from "../assets/categories.json";

export default function EditProduct() {
    const { id } = useParams(); // Получаем id из параметров маршрута
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data: userProductAll, isLoading: isLoadingPosts, error: errorPosts } = useGetUserProductAllQuery();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const userProducts = useSelector(state => state.userProduct.userProducts);
    
    // Состояние для формы редактирования
    const [photos, setPhotos] = useState([]); // Новые загружаемые файлы
    const [existingImages, setExistingImages] = useState([]); // Существующие изображения
    const [removedImages, setRemovedImages] = useState([]); // Удаленные изображения
    const [productData, setProductData] = useState({
        category: "Выберите категорию",
        subcategory: "Выберите подкатегорию",
        item_condition: "Не выбрано",
        type_ad: "Не выбрано",
        name: '',
        price: 0,
        amount: 1,
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
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Получаем продукт по ID
    useEffect(() => {
        if (userProductAll?.data) {
            dispatch(setUserProductAll(userProductAll.data));
        }
    }, [userProductAll, dispatch]);

    useEffect(() => {
        if (userProducts && id) {
            const product = userProducts.find(item => item.id === parseInt(id));
            if (product) {
                setProductData({
                    category: product.category || "Выберите категорию",
                    subcategory: product.subcategory || "Выберите подкатегорию",
                    item_condition: product.item_condition || "Не выбрано",
                    type_ad: product.type_ad || "Не выбрано",
                    name: product.name || '',
                    price: Number(product.price) || 0,
                    amount: product.amount || 1,
                    desc: product.desc || '',
                    location: product.location || '',
                    autopublish: product.autopublish || false
                });
                
                // Загружаем существующие изображения
                if (product.product_image && product.product_image.length > 0) {
                    setExistingImages(product.product_image);
                } else {
                    setExistingImages([]);
                }
                
                // Сбрасываем состояние новых фотографий и удаленных изображений
                setPhotos([]);
                setRemovedImages([]);
            }
        }
    }, [userProducts, id]);

    if (isLoadingPosts) {
        return <div>Загрузка...</div>;
    }

    if (errorPosts) {
        return <div>Ошибка загрузки данных: {errorPosts.message}</div>;
    }

    const product = userProducts?.find(item => item.id === parseInt(id));
    if (!product) {
        return <div>Продукт не найден</div>;
    }

    let selectItemCondition = ['Б/у', 'Новое'];
    let selectTypeAd = ['Продаю свое', 'Приобрел на продажу', 'Магазин'];

    // Функция валидации формы (аналогично Product.jsx)
    const validateForm = () => {
        const newErrors = {};

        if (productData.category === "Выберите категорию") {
            newErrors.category = "Выберите категорию";
        }

        if (productData.category !== "Выберите категорию" && productData.subcategory === "Выберите подкатегорию") {
            newErrors.subcategory = "Выберите подкатегорию";
        }

        if (productData.item_condition === "Не выбрано") {
            newErrors.item_condition = "Выберите состояние товара";
        }

        if (productData.type_ad === "Не выбрано") {
            newErrors.type_ad = "Выберите тип объявления";
        }

        if (!productData.name.trim()) {
            newErrors.name = "Введите название товара";
        } else if (productData.name.trim().length < 3) {
            newErrors.name = "Название должно содержать минимум 3 символа";
        } else if (productData.name.trim().length > 50) {
            newErrors.name = "Название не должно превышать 50 символов";
        }

        if (!productData.price || productData.price <= 0) {
            newErrors.price = "Введите цену";
        } else if (productData.price > 999999999) {
            newErrors.price = "Цена слишком большая";
        }

        if (!productData.amount || productData.amount < 1 || productData.amount > 1000) {
            newErrors.amount = "Пожалуйста, введите количество от 1 до 1000";
        }

        if (productData.desc.trim().length > 3000) {
            newErrors.desc = "Описание не должно превышать 3000 символов";
        }

        if (!productData.location.trim()) {
            newErrors.location = "Введите местоположение";
        } else if (productData.location.trim().length < 2) {
            newErrors.location = "Местоположение должно содержать минимум 2 символа";
        } else if (productData.location.trim().length > 50) {
            newErrors.location = "Местоположение не должно превышать 50 символов";
        }

        // Валидация фотографий (учитываем существующие и новые)
        if (photos.length === 0 && existingImages.length === 0) {
            newErrors.photos = "Загрузите хотя бы одно изображение";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

        if (type === 'checkbox') {
            setProductData({ ...productData, [name]: checked });
            return;
        }

        setProductData({ ...productData, [name]: value });
    };

    const removeFile = (index) => {
        setPhotos(prevFiles => {
            const newFiles = prevFiles.filter((_, i) => i !== index);
            if (isSubmitted && (newFiles.length > 0 || existingImages.length > 0)) {
                clearError('photos');
            }
            return newFiles;
        });
    };

    const removeExistingImage = (index) => {
        const imageToRemove = existingImages[index];
        setExistingImages(prevImages => {
            const newImages = prevImages.filter((_, i) => i !== index);
            // Добавляем удаленное изображение в список для отправки на сервер
            // Проверяем, что изображение еще не добавлено в список удаленных
            setRemovedImages(prev => {
                const isAlreadyRemoved = prev.some(img => img.id === imageToRemove.id);
                if (!isAlreadyRemoved) {
                    return [...prev, imageToRemove];
                }
                return prev;
            });
            return newImages;
        });
    };

    function handlePhotoChange(e) {
        const files = Array.from(e.target.files);
        const totalImages = existingImages.length + files.length;
        
        if (totalImages <= 4) {
            setPhotos(files);
            if (isSubmitted && (files.length > 0 || existingImages.length > 0)) {
                clearError('photos');
            }
        } else {
            alert(`Можно загружать не более 4 изображений. У вас уже есть ${existingImages.length} изображений.`);
            e.target.value = null;
            setPhotos([]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        setLoading(true);

        if (!validateForm()) {
            const firstErrorField = document.querySelector('.error-message');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setLoading(false);
            return;
        }

        // Подготавливаем данные для отправки
        const formData = new FormData();
        
        // Добавляем новые фотографии
        photos.forEach((photo, index) => {
            formData.append(`photos[${index}]`, photo);
        });

        // Добавляем информацию об удаленных изображениях
        if (removedImages.length > 0) {
            // Убираем дубликаты по ID перед отправкой
            const uniqueRemovedImages = removedImages.filter((img, index, self) => 
                self.findIndex(i => i.id === img.id) === index
            );
            
            uniqueRemovedImages.forEach((img, index) => {
                formData.append(`removed_images[${index}]`, img.id);
            });
        }

        // Добавляем остальные данные формы
        Object.keys(productData).forEach(key => {
            if (key !== 'autopublish') {
                formData.append(key, productData[key]);
            } else {
                formData.append(key, productData[key] ? 'true' : 'false');
            }
        });
        formData.append("_method", "PATCH");

        try {
            const result = await updateProduct({ id, formData }).unwrap();
            alert('Объявление успешно обновлено!');
            
            // Обновляем локальное состояние existingImages
            const updatedExistingImages = result.product_image || existingImages.filter(img => 
                !removedImages.some(removed => removed.id === img.id)
            );
            setExistingImages(updatedExistingImages);
            
            // Очищаем состояние удаленных изображений и новых фотографий
            setRemovedImages([]);
            setPhotos([]);
            
            // Обновляем Redux state с данными, полученными с сервера
            // Используем полные данные из result, которые содержат актуальную информацию с сервера
            // Если result не содержит всех полей, дополняем их из productData
            const updatedProductData = {
                ...productData, // Базовые данные формы
                ...result, // Данные с сервера (имеют приоритет)
                product_image: updatedExistingImages, // Локально обновленные изображения
                id: parseInt(id) // Убеждаемся, что ID корректный
            };
            
            dispatch(updateUserProduct({ 
                id: parseInt(id), 
                updatedProduct: updatedProductData 
            }));
            
            navigate("/profile");
        } catch (error) {
            console.error('Ошибка обновления продукта:', error);
            alert(`Ошибка обновления: ${error.message || 'Неизвестная ошибка'}`);
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
            <h2>Редактирование объявления</h2>
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
                            Загрузить изображения ({(photos.length + existingImages.length)}/4)
                        </label>
                        <input type="file"
                            name="photos"
                            onChange={handlePhotoChange}
                            id="photos"
                            multiple
                            accept=".png, .jpg, .jpeg"
                            style={{ display: 'none' }}
                        />
                        
                        {/* Отображаем существующие изображения */}
                        {existingImages.length > 0 && (
                            <div className="preview-container">
                                <h4 style={{ margin: '0 10px 10px 0', fontSize: '14px', color: '#666' }}>Текущие изображения:</h4>
                                {existingImages.map((image, index) => (
                                    <div key={`existing-${index}`} className="preview-item">
                                        <img src={image.url} alt={`Existing ${index}`} className="preview-image" />
                                        <button type="button" onClick={() => removeExistingImage(index)} className="remove-button"></button>
                                    </div>
                                ))}
                            </div>
                        )}
                        
                        {/* Отображаем новые загружаемые изображения */}
                        {photos.length > 0 && (
                            <div className="preview-container">
                                <h4 style={{ margin: '0 10px 10px 0', fontSize: '14px', color: '#666' }}>Новые изображения:</h4>
                                {photos.map((file, index) => (
                                    <div key={`new-${index}`} className="preview-item">
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
                    <a href="/settings" target="_blank">Настройка звонков и времени</a>            
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
                    <input className='btn' type="submit" value="Обновить" disabled={loading || isUpdating}/>
                    {(loading || isUpdating) && <span className='save-text'>Обновляем...</span>}
                </div>
            </form>
        </section>
    )
}
