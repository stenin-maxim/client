import { NavLink, Outlet } from 'react-router';

export default function Profile() {
    return (
        <>
            <h2>Мои объявления</h2>
            <div className="profile-buttons">
                <NavLink to="inactive">Неактивные</NavLink>
                <NavLink to="active">Активные</NavLink>
            </div>
            <Outlet />
        </>
    )
}