import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProduct } from '../../api/userApi';
import { setUserProducts } from '../../features/userProduct/userProductSlice';

export default function Profile() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.userProduct.userProducts);
    let userProductsActive = userProducts?.filter((item) => item.status === 'active');
    let userProductsNoActive = userProducts?.filter((item) => item.status === 'noactive');
    useEffect(() => {
        getUserProduct()
            .then(data => {
                dispatch(setUserProducts(data.data))
            })
            .catch(error => {
                console.error('Error product user:', error);
            });
    }, []) // dependency array [dispatch, setUserProducts] гарантирует, что эффект сработает только при изменении dispatch или setUserProducts

    return (
        <>
            <h2>Мои объявления</h2>
            <div className="profile-buttons">
                <NavLink to="/profile" end>Неактивные<sup>{userProductsNoActive?.length}</sup></NavLink>
                <NavLink to="/profile/active">Активные<sup>{userProductsActive?.length}</sup></NavLink>
            </div>
            <Outlet />
        </>
    )
}