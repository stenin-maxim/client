import { useState, useEffect, useRef } from 'react'
import categories from '../assets/categories.json'

export default function Home() {
    const [ads, setAds] = useState([]);
    const [error, setError] = useState(null);
    const categoriesScrollRef = useRef(null);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "public/ads")
            .then(res => res.json())
            .then(
                (result) => {
                    setAds(result);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [])

    // Функции для прокрутки категорий
    const scrollCategoriesLeft = () => {
        if (categoriesScrollRef.current) {
            categoriesScrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollCategoriesRight = () => {
        if (categoriesScrollRef.current) {
            categoriesScrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    // Функция для прокрутки к определенной позиции
    const scrollToCategory = (index) => {
        if (categoriesScrollRef.current) {
            const itemWidth = 170; // ширина элемента + gap
            const scrollPosition = index * itemWidth;
            categoriesScrollRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <h2>Выберите категорию</h2>
                    <div className="categories-scroll-container">
                        <button 
                            className="scroll-btn scroll-btn-left" 
                            onClick={scrollCategoriesLeft}
                            aria-label="Прокрутить категории влево"
                        >
                            <i className="bi bi-chevron-left"></i>
                        </button>
                        <div className="categories-scroll" ref={categoriesScrollRef}>
                            {categories.categories.map((item) => (
                                <div key={item.category} className="category-item">
                                    <a href="">
                                        <img className="img-category" src={item.bigImg} alt={item.category}/>
                                        <span>{item.category}</span>
                                    </a>
                                </div>
                            ))}
                        </div>
                        <button 
                            className="scroll-btn scroll-btn-right" 
                            onClick={scrollCategoriesRight}
                            aria-label="Прокрутить категории вправо"
                        >
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <h2 className="mb-3">Отдам даром</h2>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-3">
                                <div className="block-ad">
                                    <a href="">
                                        <span className="location">Москва</span>
                                        <i className="bi bi-heart" title="Добавить в избранное"></i>
                                        <div className="free">Бесплатно</div>
                                        <div className="title">Собака</div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="mb-3">Все обьявления</h2>
                    <div className="col-10">
                        <div className="row">
                            {ads.map((item) => (
                                <div key={item.id} className="col-3">
                                    <div className="block-ad">
                                        <a href={"/ad/" + item.id} >
                                            <img src={item.adPhotos.length === 0 ? "#" : import.meta.env.VITE_API_PUBLIC_URL + "image/" + item.adPhotos[0].id} alt=""/>
                                            <span className="location">{item.location}</span>
                                            <i className="bi bi-heart" title="Добавить в избранное"></i>
                                            <div className="price">{item.price}</div>
                                            <div className="title">{item.title}</div>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-2">
                        <ul>
                            <li>Правила сайта</li>
                            <li>Реклама на сайте</li>
                            <li>О сайте</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}