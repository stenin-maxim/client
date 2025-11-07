import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProductAllQuery } from '../../api/productApi';
import { setUserProductAll } from '../../features/userProduct/userProductSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.userProduct.userProducts) || [];
    const hasDataInState = userProducts.length > 0;
    
    // Загружаем данные с сервера в фоне, не блокируя UI
    // RTK Query автоматически использует кэш, если данные уже загружались
    const { data: userProductAll, isLoading, error } = useGetUserProductAllQuery();
    
    // Обновляем Redux store при получении данных из RTK Query
    useEffect(() => {
        if (userProductAll?.data) {
            dispatch(setUserProductAll(userProductAll.data));
        }
    }, [userProductAll, dispatch]);
    
    let userProductsInactive = userProducts.filter((item) => item.status === 'inactive');
    let userProductsActive = userProducts.filter((item) => item.status === 'active');
    let userProductsSold = userProducts.filter((item) => item.status === 'sold');

    // Показываем индикатор загрузки только если данных нет в state и идет первичная загрузка
    // isFetching показывает фоновую загрузку, isLoading - первичную загрузку без кэша
    const showLoading = isLoading && !hasDataInState;

    return (
        <>
            <h2>Мои объявления</h2>
            {error && !hasDataInState && (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                    Ошибка загрузки данных: {error.message}
                </div>
            )}
            {showLoading && (
                <div style={{ marginBottom: '10px' }}>Загрузка...</div>
            )}
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