import { Link } from 'react-router';
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
    return (
        <div className="profile-item" key={item.id}>
            <div className='profile-item__left'>
                <div>
                    <Link to={`/product/${item.id}`}>
                        <img src={item.product_image[0].url} alt={item.name} />
                    </Link>
                </div>
                <div className="profile-item__desc">
                    <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                    <h4 className="price">{item.price.toLocaleString('ru-RU')}</h4>
                    <div>Кол-во: {item.amount} шт.</div>
                    <div>{item.location}</div>
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
