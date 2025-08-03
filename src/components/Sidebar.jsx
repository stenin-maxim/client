import { Link } from 'react-router'
import { useSelector } from 'react-redux';
import Avatar from './Avatar/Avatar';

export default function Sidebar() {
    const user = useSelector(state => state.auth.user);
    const avatar = useSelector(state => state.auth.avatar);

    return (
        <aside className="sidebar">
            <p className='name'>{user?.name}</p>
            <figure>
                <Avatar src={avatar} name={user?.name} size="sidebar" />
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