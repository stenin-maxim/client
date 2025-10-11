import { useState } from 'react'
import { Link } from 'react-router'
import categories from "../assets/categories.json";

export default function Menu() {
    const [isShow, setIsShow] = useState(false);
    const [activeCategory, setActiveCategory] = useState(null);
    const toggle = () => setIsShow(!isShow);

    function showSubcategory(e, categoryIndex) {
        e.preventDefault(); // Предотвращаем переход по ссылке при hover
        setActiveCategory(categoryIndex);
    }

    function hideSubcategory() {
        setActiveCategory(null);
    }

    // Функция для создания URL-безопасного slug из названия категории
    const createSlug = (text) => {
        return text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Убираем специальные символы
            .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
            .trim();
    };

    let listCategory = categories.categories.map((item, index) => {
        const categorySlug = createSlug(item.category);

        return (
            <li 
                key={item.category}
                className='menu-category-item' 
                onMouseEnter={(e) => showSubcategory(e, index)}
                onMouseLeave={hideSubcategory}
                style={{backgroundImage: "url(" + item.img + ")"}}
            >
                <Link to={`/category/${categorySlug}`}>{item.category}</Link>
                <ul className={`menu-subcategory ${activeCategory === index ? 'active' : ''}`}>
                    <h4>{item.category}</h4>
                    {item.subcategory.map((subItem) => {
                        const subcategorySlug = createSlug(subItem);
                        return (
                            <li key={subItem}>
                                <Link to={`/category/${categorySlug}/${subcategorySlug}`}>
                                    {subItem}
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