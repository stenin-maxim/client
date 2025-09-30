import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProductAllQuery } from '../../api/productApi';
import { setUserProductAll } from '../../features/userProduct/userProductSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const { data: userProductAll, isLoading, error } = useGetUserProductAllQuery();
    const userProducts = useSelector(state => state.userProduct.userProducts) || [];
    let userProductsInactive = userProducts.filter((item) => item.status === 'inactive');
    let userProductsActive = userProducts.filter((item) => item.status === 'active');
    let userProductsSold = userProducts.filter((item) => item.status === 'sold');
    
    // Обновляем Redux store при получении данных из RTK Query
    useEffect(() => {
        if (userProductAll?.data) {
            dispatch(setUserProductAll(userProductAll.data));
        }
    }, [userProductAll, dispatch]);
    
    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки данных: {error.message}</div>;
    }

    return (
        <>
            <h2>Мои объявления</h2>
            <div className="profile-buttons">
                <NavLink to="/profile" end>Всего<sup>{userProducts?.length > 0 ? userProducts?.length : ''}</sup></NavLink>
                <NavLink to="/profile/inactive">Неактивные<sup>{userProductsInactive?.length > 0 ? userProductsInactive?.length : ''}</sup></NavLink>
                <NavLink to="/profile/active">Активные<sup>{userProductsActive?.length > 0 ? userProductsActive?.length : ''}</sup></NavLink>
                <NavLink to="/profile/sold">Проданные<sup>{userProductsSold?.length > 0 ? userProductsSold?.length : ''}</sup></NavLink>
            </div>
            <Outlet />
        </>
    )
}