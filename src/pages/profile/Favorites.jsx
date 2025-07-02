import { NavLink, Outlet } from 'react-router';

export default function Favorites() {
    return (
        <>
            <h2>Избранное</h2>
            <div className="profile-buttons">
                <NavLink to="/favorites" end>Объявления</NavLink>
                <NavLink to="/favorites/sellers">Подписки</NavLink>
            </div>
            <Outlet />
        </>
    )
}