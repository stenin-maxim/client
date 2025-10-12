import { useState } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import { useGetCategoriesQuery } from '@/api/categoriesApi';

export default function Menu() {
    const [isShow, setIsShow] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    // Получаем категории из Redux state
    const { categories, loading: categoriesLoading, error: categoriesError } = useSelector(state => state.categories);
    const toggle = () => setIsShow(!isShow);
    useGetCategoriesQuery();  // Загружаем категории при монтировании компонента

    function showSubcategory(e, categoryIndex) {
        e.preventDefault(); // Предотвращаем переход по ссылке при hover
        setActiveCategory(categoryIndex);
    }

    function hideSubcategory() {
        setActiveCategory(null);
    }

    // Показываем загрузку если категории еще не загружены
    if (categoriesLoading && categories.length === 0) {
        return (
            <>
                <button className="btn-category" disabled>
                    <i className="bi bi-list"></i>
                    Категории
                </button>
            </>
        );
    }

    // Показываем ошибку если не удалось загрузить категории
    if (categoriesError && categories.length === 0) {
        return (
            <>
                <button className="btn-category" disabled>
                    <i className="bi bi-exclamation-triangle"></i>
                    Ошибка
                </button>
            </>
        );
    }

    let listCategory = categories.map((item, index) => {
        return (
            <li 
                key={item.id}
                className='menu-category-item' 
                onMouseEnter={(e) => showSubcategory(e, index)}
                onMouseLeave={hideSubcategory}
                style={{backgroundImage: "url(" + item.icon + ")"}}
            >
                <Link to={`/category/${item.slug}`}>{item.name}</Link>
                <ul className={`menu-subcategory ${activeCategory === index ? 'active' : ''}`}>
                    <h4>{item.name}</h4>
                    {item.subcategories.map((subItem) => {
                        return (
                            <li key={subItem.id}>
                                <Link to={`/category/${item.slug}/${subItem.slug}`}>
                                    {subItem.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </li>
        );
    });

    return (
        <>
            <button className="btn-category" onClick={toggle}>
                <i className={isShow ? "bi bi-x" : "bi bi-list"}></i>Категории
            </button>
            {isShow &&
                <div className="menu-category">
                    <div className='container'>
                        <div className="row">
                            <ul className="menu-category-list">
                                {listCategory}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}