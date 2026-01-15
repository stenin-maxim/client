import { useRef, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { useGetCategoriesQuery } from '@/api/categoriesApi'
import { useGetProductsQuery } from '@/api/productApi'
import { useFavoriteHandler } from '@/hooks/useFavoriteHandler';

export default function Home() {
    const categoriesScrollRef = useRef(null);
    const { categories } = useSelector(state => state.categories);
    const { products, loading: productsLoading, error: productsError } = useSelector(state => state.product);
    const { cityUser } = useSelector(state => state.location);
    const { city, category, subcategory } = useParams();
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('accessToken');
    const { handleFavorite } = useFavoriteHandler();

    // Редирект, если cityUser установлен, но в URL нет city
    useEffect(() => {
        
        if (cityUser?.slug && !city) {
            navigate(`/${cityUser?.slug}`, { replace: true });
        }
    }, [cityUser, city, navigate]);

    useGetCategoriesQuery(); // Загружаем категории при монтировании компонента
    useGetProductsQuery({
        city: city || null,
        category: category || null,
        subcategory: subcategory || null,
    }, {
        // Принудительно обновляем при изменении параметров
        refetchOnMountOrArgChange: true,
    });

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

    const url = (itemSlug) => {
        const city = cityUser?.slug;

        if (city) {
            return `/${city}/${itemSlug}`;
        }

        return `/${itemSlug}`;
    }

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
                                        <Link to={url(item.slug)}>
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
                            {productsLoading && <div>Загрузка</div>}
                            {productsError && <div>Ошибка: {productsError}</div>}
                            {products && products.map((item) => (
                                <div key={item.ulid} className="col-3" style={{ display: 'flex', marginBottom: '20px' }}>
                                    <div className="home-product">
                                        <a href={item.url} >
                                            <div className="image-wrapper">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.src = '#';
                                                    }}
                                                />
                                                <span className="location">{item.city}</span>
                                                {isAuthenticated && 
                                                    <i className={`bi ${item.is_favorite ? 'bi-heart-fill' : 'bi-heart'}`}
                                                        title={item.is_favorite ? "Удалить из избранного" : "Добавить в избранное"}
                                                        onClick={(e) => handleFavorite(e, item)}>
                                                    </i>
                                                }
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