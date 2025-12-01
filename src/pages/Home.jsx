import { useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useGetCategoriesQuery } from '@/api/categoriesApi'
import { useGetProductsQuery } from '@/api/productApi'

export default function Home() {
    const categoriesScrollRef = useRef(null);
    const { categories } = useSelector(state => state.categories);
    const { products: products, loading: productsLoading, error: productsError } = useSelector(state => state.product);
    const { cityUser } = useSelector(state => state.location);
    const { citySlug } = useParams();
    const navigate = useNavigate();

    // Редирект, если cityUser установлен, но в URL нет city
    useEffect(() => {
        if (cityUser?.slug && !citySlug) {
            navigate(`/${cityUser.slug}`, { replace: true });
        }
    }, [cityUser, citySlug, navigate]);

    useGetCategoriesQuery(); // Загружаем категории при монтировании компонента
    useGetProductsQuery(citySlug || null);

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
                    <h2 className="mb-3">Все обьявления</h2>
                    <div className="col-10">
                        <div className="row">
                            {productsLoading && <div>Загрузка...</div>}
                            {productsError && <div>Ошибка: {productsError}</div>}
                            {products && products.map((item) => (
                                <div key={item.id} className="col-3" style={{ display: 'flex', marginBottom: '20px' }}>
                                    <div className="home-product">
                                        <a href={item.url} >
                                            <div className="image-wrapper">
                                                <img 
                                                    src={item.product_image?.[0]?.url} 
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.src = '#';
                                                    }}
                                                />
                                                <span className="location">{item.location.city}</span>
                                                <i className="bi bi-heart" title="Добавить в избранное"></i>
                                            </div>
                                            <div className="price">{item.price}</div>
                                            <div className="title">{item.name}</div>
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