import { useRef } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useGetCategoriesQuery } from '@/api/categoriesApi'
import { useGetProductsQuery } from '@/api/productApi'

export default function Home() {
    const categoriesScrollRef = useRef(null);
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.categories);
    const { products: products, loading: productsLoading, error: productsError } = useSelector(state => state.product);
    
    useGetCategoriesQuery(); // Загружаем категории при монтировании компонента
    useGetProductsQuery();

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

    console.log(products);

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
                                    <div className="block-product">
                                        <a href={`/${item.category.slug}/${item.subcategory.slug}/${item.ulid}`} >
                                            <div className="image-wrapper">
                                                <img 
                                                    src={item.product_image?.[0]?.url} 
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.src = '#';
                                                    }}
                                                />
                                                <span className="location">{item.location}</span>
                                                <i className="bi bi-heart" title="Добавить в избранное"></i>
                                            </div>
                                            <i className="bi bi-heart" title="Добавить в избранное"></i>
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