import { NavLink, Outlet } from 'react-router';

export default function Profile() {
    return (
        <>
            <h2>Мои объявления</h2>
            <div className="profile-buttons">
                <NavLink to="/profile" end>Неактивные</NavLink>
                <NavLink to="/profile/active">Активные</NavLink>
            </div>
            <Outlet />
        </>
    )
}