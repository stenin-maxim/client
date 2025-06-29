import { Link } from 'react-router'

export default function Sidebar() {
    return (
        <div className="col-3">
            <div className="sidebar">
                <p>Username</p>
                <div className="avatar">Avatar</div>
                <div>на Сайте с 22 июля 2021</div>
                <ul className="menu-sidebar">
                    <li><Link to="ads">Мои объявления</Link></li>
                    <li><Link to="wallet">Кошелек</Link></li>
                    <li><Link to="orders">Мои заказы</Link></li>
                    <li><Link to="messages">Мои сообщения</Link></li>
                    <li><Link to="favorites">Избранное</Link></li>
                    <li><Link to="settings">Настройки</Link></li>
                    <li><Link to="support">Обратиться в поддержку</Link></li>
                </ul>
            </div>
        </div>
    )
}