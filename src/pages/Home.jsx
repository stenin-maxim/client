import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useGetCategoriesQuery } from '@/api/categoriesApi'

export default function Home() {
    const [ads, setAds] = useState([]);
    const [error, setError] = useState(null);
    const categoriesScrollRef = useRef(null);

    // Получаем категории из Redux state
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.categories);
    
    useGetCategoriesQuery(); // Загружаем категории при монтировании компонента

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
            categoriesScrollRef.current.scrollBy({ left: -600, behavior: 'smooth' });
        }
    };

    const scrollCategoriesRight = () => {
        if (categoriesScrollRef.current) {
            categoriesScrollRef.current.scrollBy({ left: 600, behavior: 'smooth' });
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
                            {categories.map((item) => {
                                return (
                                    <div key={item.id} className="home-category-item">
                                        <Link to={`/category/${item.slug}`}>
                                            <img className="img-category"
                                                src={item.img}
                                                alt={item.name}
                                            />
                                            <span>{item.name}</span>
                                        </Link>
                                    </div>
                                )
                            })}
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