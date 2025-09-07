import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

export default function ActiveProfile() {
    const userProducts = useSelector(state => state.userProduct.userProducts);
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных
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
                                <h3><Link to="">{item.name}</Link></h3>
                                <h4 className="price">{item.price.toLocaleString('ru-RU')}</h4>
                                <div>Кол-во: {item.amount} шт.</div>
                                <div>{item.location}</div>
                            </div>
                        </div>
                        <div className='profile-item__right'>
                            <div className="profile-item__menu">
                                <i className="bi bi-three-dots"></i>
                                <ul>
                                    <li><button disabled={loading}>Продать быстрее</button></li>
                                    <li><button disabled={loading}>Редактировать</button></li>
                                    <li><button disabled={loading}>Снять с публикации</button></li>
                                </ul>
                            </div>
                            <div>
                                Осталось дней: {item.expires_at}
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