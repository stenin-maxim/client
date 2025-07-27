import { Link } from 'react-router'
import { useSelector } from 'react-redux';

export default function Sidebar() {
    const user = useSelector(state => state.auth.user);
    const avatar = useSelector(state => state.auth.avatar);

    return (
        <aside className="sidebar">
            <p>{user?.name}</p>
            <figure>
                {avatar ? <img src={avatar} alt="avatar" className="avatar-img" /> : <div className="avatar avatar-sidebar">{user?.name[0]}</div>}
                <figcaption>на Сайте с 22 июля 2021</figcaption>
            </figure>
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