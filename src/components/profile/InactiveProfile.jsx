import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { deleteUserProduct, publishUserProduct } from '../../api/userApi';
import { updateUserProductValue, removeUserProduct } from '../../features/userProduct/userProductSlice';

export default function InactiveProfile() {
    const dispatch = useDispatch();
    const userProducts = useSelector(state => state.userProduct.userProducts);
    const [loading, setLoading] = useState(false); // отменить многочисленное нажатие кнопки, при отправке данных
    let userProductsNoActive = userProducts?.filter((item) => item.status === 'noactive');

    const publish = (productId) => {
        setLoading(true);
        publishUserProduct(productId).then(data => {
            dispatch(updateUserProductValue({ id: productId, value: data.data.status }))
            alert(data.message);
        }).catch(error => {
            console.log(error);
        }).finally(function() {
            setLoading(false);
        })
    }

    const deleteProduct = (productId) => {
        let result = confirm("Вы действительно хотите удалить объявление?");
        setLoading(true);

        if (result) {
            deleteUserProduct(productId).then(data => {
                dispatch(removeUserProduct(productId));
                alert(data.message);
            }).catch(error => {
                console.log(error);
            }).finally(function() {
                setLoading(false);
            })
        }
    }

    return (
        <>
            {userProductsNoActive?.map((item) => {
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
                                    <li><button onClick={() => publish(item.id)} disabled={loading}>Опубликовать</button></li>
                                    <li><button disabled={loading}>Редактировать</button></li>
                                    <li><button onClick={() => deleteProduct(item.id)} disabled={loading}>Удалить</button></li>
                                    <li><button disabled={loading}>Уже не актульно</button></li>
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