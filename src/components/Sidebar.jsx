import { Link } from 'react-router'

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <p>Username</p>
            <div className="avatar">Avatar</div>
            <div>на Сайте с 22 июля 2021</div>
            <ul className="menu-sidebar">
                <li><Link to="/profile">Мои объявления</Link></li>
                <li><Link to="/messages">Сообщения</Link></li>
                <li><Link to="/favorites">Избранное</Link></li>
                <li><Link to="/settings">Настройки</Link></li>
                <li><Link to="/support">Обратиться в поддержку</Link></li>
            </ul>
        </aside>
    )
}