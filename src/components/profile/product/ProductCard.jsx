import { useNavigate } from 'react-router';
import ProductActionsMenu from './ProductActionsMenu';

export default function ProductCard({ 
    item, 
    showActions = true, 
    actions = [], 
    onActionClick,
    showExpiresAt = false,
    showSoldText = false,
    showInactiveText = false 
}) {
    const navigate = useNavigate();
    const handleCardClick = (e) => {
        // Предотвращаем навигацию если клик был по меню действий
        if (e.target.closest('.profile-item__menu')) {
            return;
        }
        navigate(item.url);
    };

    return (
        <div className="profile-item"
            key={item.id}
            onClick={handleCardClick}
        >
            <div className='profile-item__left'>
                <img src={item.product_image[0].url} alt={item.name} loading="lazy" />
                <div className="profile-item__desc">
                    <h3>{item.name}</h3>
                    <h4 className="price">{item.price.toLocaleString('ru-RU')}</h4>
                    <div>Кол-во: {item.amount} шт.</div>
                    <div>{item.location.city}</div>
                </div>
            </div>
            <div className='profile-item__right'>
                {showActions && (
                    <ProductActionsMenu 
                        item={item}
                        actions={actions}
                        onActionClick={onActionClick}
                    />
                )}
                {showExpiresAt && (
                    <div>
                        Осталось дней: {item.expires_at}
                    </div>
                )}
                {showSoldText && (
                    <div className="sold-text">Продано</div>
                )}
                {showInactiveText && (
                    <div className="inactive-text" 
                        title="Объявление было снято с публикации и помещено в архив. Если объявление по-прежнему актуально, обновите в нем информацию и опубликуйте повторно.">
                        Приостановлено</div>
                )}
                <div className='profile-item__group'>
                    <div className='profile-item__views'>
                        <i className="bi bi-eye" title="Просмотры"></i>
                        <span>0</span>
                    </div>
                    <div>
                        <i className="bi bi-heart-fill" title="Избранное"></i>
                        <span>0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
