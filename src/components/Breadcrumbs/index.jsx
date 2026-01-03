import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router';
import "./style.scss";

export default function Breadcrumbs() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(n => n);
    const categories = useSelector(state => state.categories.categories);
    const breadcrumbs = {
        "profile": "Мои объявления",
        "active": "Активные",
        'inactive': "Неактивные",
        "messages": "Сообщения",
        "favorites": "Избранное",
        "settings": "Настройки",
        "support": "Обратиться в поддержку",
        "sold": "Проданные",
    };

    categories.map(item => {
        breadcrumbs[item.slug] = item.name;
        item.subcategories.map(itemSub => {
            breadcrumbs[itemSub.slug] = itemSub.name;
        });
    })

    return (
        <nav>
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="">Главная</Link>    
                </li>
                {pathnames.map((pathname, index) => {
                    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = pathnames.length - 1 === index;
                    const breadcrumb = breadcrumbs[pathname];
                    if (breadcrumb) {
                        return (
                            <li className="breadcrumb-item" key={path}>
                                {isLast ? (
                                    <span>{breadcrumb}</span>
                                ) : (
                                    <Link to={path}>{breadcrumb}</Link>
                                )}
                            </li>
                        )
                    }
                })}
            </ul>
        </nav>
    )
}