import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { useGetProductByIdQuery } from '@/api/productApi';
import "./style.scss";

export default function Breadcrumbs() {
    const location = useLocation();
    const { ulid } = useParams();
    const pathnames = location.pathname.split('/').filter(n => n);
    const staticBreadcrumbs = {
        "profile": "Мои объявления",
        "active": "Активные",
        'inactive': "Неактивные",
        "messages": "Сообщения",
        "favorites": "Избранное",
        "settings": "Настройки",
        "support": "Обратиться в поддержку",
        "sold": "Проданные",
    };
    const [dynamicBreadcrumbs, setDynamicBreadcrumbs] = useState({});
    // Загрузка данных продукта, если ulid существует
    const { data: apiResp, isLoading, isError } = useGetProductByIdQuery(ulid, {
        skip: !ulid, // Пропускаем запрос, если ulid не существует
    });

    useEffect(() => {
        if (ulid && apiResp) {
            const apiProduct = apiResp?.data;
            if (apiProduct) {
                // Обновляем состояние динамических хлебных крошек
                setDynamicBreadcrumbs({
                    [apiProduct.category.slug]: apiProduct.category.name,
                    [apiProduct.subcategory.slug]: apiProduct.subcategory.name,
                    [apiProduct.ulid]: apiProduct.name,
                });
            }
        } else {
            setDynamicBreadcrumbs({}); // Сбрасываем, если ulid не существует
        }
    }, [ulid, apiResp]);

    const allBreadcrumbs = { ...staticBreadcrumbs, ...dynamicBreadcrumbs };

    return (
        <nav>
            <ul className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Главная</Link>    
                </li>
                {pathnames.map((pathname, index) => {
                    const path = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = pathnames.length - 1 === index;
                    const breadcrumb = allBreadcrumbs[pathname] || ""

                    return (
                        <li className="breadcrumb-item" key={path}>
                            {isLast ? (
                                <span>{breadcrumb}</span>
                            ) : (
                                <Link to={path}>{breadcrumb}</Link>
                            )}
                        </li>
                    )
                })}
                {isLoading && <span>Загрузка...</span>}
                {isError && <span>Ошибка загрузки</span>}
            </ul>
        </nav>
    )
}