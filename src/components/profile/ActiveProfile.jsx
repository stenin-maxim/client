import { useSelector } from 'react-redux';
import { Link } from 'react-router';

export default function ActiveProfile() {
    const userProducts = useSelector(state => state.userProduct.userProducts);
    let userProductsActive = userProducts?.filter((item) => item.status === 'active');

    return (
        <>
            {userProductsActive?.map((item) => {
                return (
                    <div className="profile-item" key={item.id}>
                        <div className='profile-item__left'>
                            <div>
                                <Link to="">
                                    <img src={item.product_image[0].url} />
                                </Link>
                            </div>
                            <div className="profile-item__desc">
                                <h3>{item.name}</h3>
                                <h4 className="price">{item.price.toLocaleString('ru-RU')}</h4>
                                <div>Кол-во:</div>
                                <div>{item.location}</div>
                            </div>
                        </div>
                        <div className='profile-item__right'>
                            <div className="profile-item__menu">
                                <i className="bi bi-three-dots"></i>
                                <ul>
                                    <li>Продать быстрее</li>
                                    <li>Редактировать</li>
                                    <li>Снять с публикации</li>
                                </ul>
                            </div>
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
                )
            })}
        </>
    )
}